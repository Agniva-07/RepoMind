import Parser from 'tree-sitter';
import JavaScript from 'tree-sitter-javascript';

export function parseSource(source) {
  const parser = new Parser();
  parser.setLanguage(JavaScript);
  return parser.parse(source);
}
