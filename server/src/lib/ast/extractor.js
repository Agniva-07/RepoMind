export function extractEntities(tree, source, filePath) {
  const entities = [];

  function addEntity(type, name, node, metadata = {}) {
    entities.push({
      type,
      name: name || null, // Ensure anonymous is strictly null
      file: filePath,
      startLine: node.startPosition.row + 1,
      startColumn: node.startPosition.column,
      endLine: node.endPosition.row + 1,
      endColumn: node.endPosition.column,
      metadata,
    });
  }

  // Helper to check if a node or its children contain JSX
  function containsJSX(node) {
    if (node.type === 'jsx_element' || node.type === 'jsx_fragment') return true;
    for (let i = 0; i < node.childCount; i++) {
      if (containsJSX(node.child(i))) return true;
    }
    return false;
  }

  function traverse(node, currentClass = null) {
    // === CLASSES ===
    if (node.type === 'class_declaration' || node.type === 'class_expression') {
      const nameNode = node.childForFieldName('name');
      const className = nameNode ? nameNode.text : null;
      addEntity('class', className, node);
      
      // Traverse children with class context for methods
      for (let i = 0; i < node.childCount; i++) {
        traverse(node.child(i), className);
      }
      return; // Handled children
    }

    if (node.type === 'method_definition') {
      const nameNode = node.childForFieldName('name');
      addEntity('method', nameNode ? nameNode.text : null, node, {
        parentClass: currentClass
      });
    }

    // === FUNCTIONS ===
    if (
      node.type === 'function_declaration' ||
      node.type === 'function_expression' ||
      node.type === 'generator_function_declaration' ||
      node.type === 'generator_function_expression' ||
      node.type === 'arrow_function'
    ) {
      let funcName = null;
      let kind = 'declaration';

      if (node.type === 'function_expression' || node.type === 'generator_function_expression') kind = 'expression';
      if (node.type === 'arrow_function') kind = 'arrow';

      const nameNode = node.childForFieldName('name');
      if (nameNode) {
        funcName = nameNode.text;
      } else if (node.parent && node.parent.type === 'variable_declarator') {
        const varNameNode = node.parent.childForFieldName('name');
        if (varNameNode && varNameNode.type === 'identifier') {
          funcName = varNameNode.text;
        }
      } else if (node.parent && node.parent.type === 'pair') { // Object property
        const keyNode = node.parent.childForFieldName('key');
        if (keyNode) funcName = keyNode.text;
      }

      // Check for async
      let isAsync = false;
      for (let i = 0; i < node.childCount; i++) {
        if (node.child(i).type === 'async') isAsync = true;
      }

      // Check for React component (starts with Capital, contains JSX)
      let componentLike = false;
      let type = 'function';
      if (funcName && /^[A-Z]/.test(funcName) && containsJSX(node)) {
        componentLike = true;
        type = 'component'; // The user said use type: "component" if fitting
      }

      addEntity(type, funcName, node, {
        kind,
        async: isAsync,
        componentLike: componentLike || undefined
      });

      // Still traverse children to find nested functions
      for (let i = 0; i < node.childCount; i++) {
        traverse(node.child(i), currentClass);
      }
      return; // Handled children
    }

    // === VARIABLES ===
    if (node.type === 'variable_declarator') {
      const valueNode = node.childForFieldName('value');
      
      // If value is a function, we already extracted it as a function. Skip variable extraction.
      if (!valueNode || (valueNode.type !== 'arrow_function' && valueNode.type !== 'function_expression' && valueNode.type !== 'generator_function_expression')) {
        const nameNode = node.childForFieldName('name');
        if (nameNode && nameNode.type === 'identifier') {
           // We'll ignore complex destructuring for now to avoid false entities
           const parentKind = node.parent ? node.parent.type : null; // lexical_declaration or variable_declaration
           let kind = 'const';
           if (node.parent && node.parent.text.startsWith('let')) kind = 'let';
           if (node.parent && node.parent.text.startsWith('var')) kind = 'var';

           addEntity('variable', nameNode.text, node, { kind });
        }
      }
    }

    // === IMPORTS ===
    if (node.type === 'import_statement') {
      const sourceNode = node.childForFieldName('source');
      const source = sourceNode ? sourceNode.text.replace(/['"]/g, '') : null;
      
      // Try to find import clause
      let importClause = null;
      for (let i = 0; i < node.childCount; i++) {
         if (node.child(i).type === 'import_clause') {
            importClause = node.child(i);
            break;
         }
      }

      if (importClause) {
        // Look for default import, named imports, namespace
        for (let i = 0; i < importClause.childCount; i++) {
          const child = importClause.child(i);
          
          if (child.type === 'identifier') {
            // Default import
            addEntity('import', child.text, node, {
               importedName: 'default',
               localName: child.text,
               source,
               importKind: 'default'
            });
          } else if (child.type === 'named_imports') {
            for (let j = 0; j < child.childCount; j++) {
              const specifier = child.child(j);
              if (specifier.type === 'import_specifier') {
                 const nameNode = specifier.childForFieldName('name');
                 const aliasNode = specifier.childForFieldName('alias');
                 
                 const importedName = nameNode ? nameNode.text : null;
                 const localName = aliasNode ? aliasNode.text : importedName;
                 
                 if (importedName) {
                    addEntity('import', localName, specifier, {
                      importedName,
                      localName,
                      source,
                      importKind: 'named'
                    });
                 }
              }
            }
          } else if (child.type === 'namespace_import') {
             const identifier = child.child(child.childCount - 1);
             addEntity('import', identifier.text, node, {
                importedName: '*',
                localName: identifier.text,
                source,
                importKind: 'namespace'
             });
          }
        }
      } else if (source) {
        // Side-effect import (no clause)
        addEntity('import', null, node, {
           importedName: null,
           localName: null,
           source,
           importKind: 'side-effect'
        });
      }
    }

    // === EXPORTS ===
    if (node.type === 'export_statement') {
      let isDefault = false;
      let declaration = null;

      for (let i = 0; i < node.childCount; i++) {
        if (node.child(i).type === 'default') isDefault = true;
        else if (
           node.child(i).type === 'function_declaration' ||
           node.child(i).type === 'class_declaration' ||
           node.child(i).type === 'lexical_declaration' ||
           node.child(i).type === 'variable_declaration' ||
           node.child(i).type === 'export_clause'
        ) {
           declaration = node.child(i);
        } else if (node.child(i).type === 'arrow_function' || node.child(i).type === 'identifier') {
           declaration = node.child(i); // For `export default () => {}` or `export default x`
        }
      }

      if (declaration) {
         if (declaration.type === 'export_clause') {
            const sourceNode = node.childForFieldName('source');
            const source = sourceNode ? sourceNode.text.replace(/['"]/g, '') : null;

            for (let j = 0; j < declaration.childCount; j++) {
              const spec = declaration.child(j);
              if (spec.type === 'export_specifier') {
                 const nameNode = spec.childForFieldName('name');
                 const aliasNode = spec.childForFieldName('alias');
                 
                 const localName = nameNode ? nameNode.text : null;
                 const exportedName = aliasNode ? aliasNode.text : localName;

                 if (localName) {
                    addEntity('export', exportedName, spec, {
                       exportType: source ? 're-export' : 'named',
                       localName,
                       source
                    });
                 }
              }
            }
         } else if (
           declaration.type === 'function_declaration' || 
           declaration.type === 'class_declaration'
         ) {
           const nameNode = declaration.childForFieldName('name');
           const name = nameNode ? nameNode.text : null;
           addEntity('export', name, node, {
              exportType: isDefault ? 'default' : 'named'
           });
         } else if (
           declaration.type === 'lexical_declaration' || 
           declaration.type === 'variable_declaration'
         ) {
           // extract exported variable names
           for (let j = 0; j < declaration.childCount; j++) {
              const declChild = declaration.child(j);
              if (declChild.type === 'variable_declarator') {
                 const nameNode = declChild.childForFieldName('name');
                 if (nameNode && nameNode.type === 'identifier') {
                    addEntity('export', nameNode.text, declChild, {
                       exportType: 'named'
                    });
                 }
              }
           }
         } else {
           // Fallback for default exports of expressions or identifiers
           addEntity('export', declaration.text, node, {
              exportType: 'default'
           });
         }
      }
    }

    // Traverse all children recursively
    for (let i = 0; i < node.childCount; i++) {
      traverse(node.child(i), currentClass);
    }
  }

  if (tree && tree.rootNode) {
    traverse(tree.rootNode);
  }

  return entities;
}
