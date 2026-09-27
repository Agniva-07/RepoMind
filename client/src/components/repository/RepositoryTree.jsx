import { useState } from 'react';
import './RepositoryTree.css';

const FILE_ICONS = {
  jsx: '⚛',
  js:  '𝐉',
  ts:  '𝐓',
  tsx: '⚛',
  css: '🎨',
  json: '{}',
  md:  '📝',
  text: '📄',
};

function TreeNode({ node, depth = 0, onSelectFile, selectedFile }) {
  const [open, setOpen] = useState(depth < 2);
  const isDir = node.type === 'dir';
  const isSelected = !isDir && selectedFile === node.name;

  return (
    <li className="tree-node">
      <button
        className={`tree-node__label${isSelected ? ' tree-node__label--selected' : ''}`}
        style={{ paddingLeft: `${8 + depth * 14}px` }}
        onClick={() => {
          if (isDir) setOpen((o) => !o);
          else onSelectFile && onSelectFile(node);
        }}
        aria-expanded={isDir ? open : undefined}
      >
        <span className="tree-node__icon" aria-hidden="true">
          {isDir ? (open ? '▾' : '▸') : (FILE_ICONS[node.language] || '·')}
        </span>
        <span className="tree-node__name">{node.name}</span>
      </button>
      {isDir && open && node.children?.length > 0 && (
        <ul className="tree-node__children" role="list">
          {node.children.map((child) => (
            <TreeNode
              key={child.name}
              node={child}
              depth={depth + 1}
              onSelectFile={onSelectFile}
              selectedFile={selectedFile}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * RepositoryTree — recursive file explorer
 * @param {Array} tree - nested file tree data
 * @param {function} onSelectFile - called with the file node when selected
 */
export default function RepositoryTree({ tree = [], onSelectFile }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSelect = (node) => {
    setSelectedFile(node.name);
    onSelectFile && onSelectFile(node);
  };

  if (!tree.length) {
    return (
      <div className="repo-tree repo-tree--empty">
        <span className="text-muted text-sm">No files to display</span>
      </div>
    );
  }

  return (
    <div className="repo-tree" aria-label="Repository file tree">
      <ul className="repo-tree__list" role="tree">
        {tree.map((node) => (
          <TreeNode
            key={node.name}
            node={node}
            depth={0}
            onSelectFile={handleSelect}
            selectedFile={selectedFile}
          />
        ))}
      </ul>
    </div>
  );
}
