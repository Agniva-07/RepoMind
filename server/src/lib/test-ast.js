import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Parser from 'tree-sitter';
import JavaScript from 'tree-sitter-javascript';

const __filename = fileURLToPath(import.meta.url);

async function analyzeFile(filePath) {
  // 1. Read a .js file
  const code = await fs.readFile(filePath, 'utf-8');

  // 2. Tree-sitter setup
  const parser = new Parser();
  parser.setLanguage(JavaScript);

  // 3. Parse code
  const tree = parser.parse(code);

  const result = {
    file: path.basename(filePath),
    imports: [],
    exports: [],
    classes: [],
    functions: []
  };

  // 4 & 5. Traverse tree and find items
  function traverse(node) {
    // Imports
    if (node.type === 'import_statement') {
      result.imports.push(node.text);
    }
    
    // Exports
    if (node.type === 'export_statement' || node.type === 'export_clause') {
      // Just grab the first line if it's a huge block
      result.exports.push(node.text.split('\n')[0]);
    }

    // Classes
    if (node.type === 'class_declaration') {
      const nameNode = node.childForFieldName('name');
      result.classes.push(nameNode ? nameNode.text : 'anonymous class');
    }

    // Functions
    if (
      node.type === 'function_declaration' ||
      node.type === 'method_definition' ||
      node.type === 'arrow_function'
    ) {
      const nameNode = node.childForFieldName('name');
      let funcName = nameNode ? nameNode.text : 'anonymous function';
      
      // Attempt to extract variable name for arrow functions
      if (!nameNode && node.type === 'arrow_function' && node.parent?.type === 'variable_declarator') {
         const varNameNode = node.parent.childForFieldName('name');
         if (varNameNode) {
           funcName = varNameNode.text;
         }
      }

      result.functions.push({
        name: funcName,
        type: node.type
      });
    }

    for (let i = 0; i < node.childCount; i++) {
      traverse(node.child(i));
    }
  }

  traverse(tree.rootNode);
  
  return result;
}

// Some dummy code to test the parser on itself
class ExampleClass {
  exampleMethod() {
    return 'hello';
  }
}

const exampleArrowFunction = () => {
  return true;
};

export async function main() {
  // Let's analyze this exact file as a test!
  const result = await analyzeFile(__filename);
  
  // 6. console.log(result)
  console.log("=== AST Analysis Result ===");
  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);
