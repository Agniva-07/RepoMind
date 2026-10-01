import test from 'node:test';
import assert from 'node:assert';
import { parseSource } from '../../src/lib/ast/parser.js';
import { extractEntities } from '../../src/lib/ast/extractor.js';

test('AST Extractor - Functions', () => {
  const code = `
    function add(a, b) { return a + b; }
    const sub = (a, b) => a - b;
    const mul = function(a, b) { return a * b; };
    async function fetchUsers() {}
    items.map(function(item) { return item; });
    function outer() { function inner() {} }
  `;
  const tree = parseSource(code);
  const entities = extractEntities(tree, code, 'test.js');

  const functions = entities.filter(e => e.type === 'function');
  assert.equal(functions.length, 7);

  assert.equal(functions[0].name, 'add');
  assert.equal(functions[0].metadata.kind, 'declaration');

  assert.equal(functions[1].name, 'sub');
  assert.equal(functions[1].metadata.kind, 'arrow');

  assert.equal(functions[2].name, 'mul');
  assert.equal(functions[2].metadata.kind, 'expression');

  assert.equal(functions[3].name, 'fetchUsers');
  assert.equal(functions[3].metadata.async, true);

  assert.equal(functions[4].name, null); // anonymous

  assert.equal(functions[5].name, 'outer');
  assert.equal(functions[6].name, 'inner');
});

test('AST Extractor - Classes', () => {
  const code = `
    class UserService {
      constructor(name) { this.name = name; }
      login() {}
    }
  `;
  const tree = parseSource(code);
  const entities = extractEntities(tree, code, 'test.js');

  const classes = entities.filter(e => e.type === 'class');
  assert.equal(classes.length, 1);
  assert.equal(classes[0].name, 'UserService');

  const methods = entities.filter(e => e.type === 'method');
  assert.equal(methods.length, 2);
  assert.equal(methods[0].name, 'constructor');
  assert.equal(methods[0].metadata.parentClass, 'UserService');
  assert.equal(methods[1].name, 'login');
});

test('AST Extractor - JSX Components', () => {
  const code = `
    function UserCard({ user }) {
      return <div>{user.name}</div>;
    }
    const Button = () => <button>Click</button>;
  `;
  const tree = parseSource(code);
  const entities = extractEntities(tree, code, 'test.jsx');

  const components = entities.filter(e => e.type === 'component');
  assert.equal(components.length, 2);
  assert.equal(components[0].name, 'UserCard');
  assert.equal(components[1].name, 'Button');
});

test('AST Extractor - Imports & Exports', () => {
  const code = `
    import React from 'react';
    import { useState, useEffect as effect } from 'react';
    import * as Utils from './utils';
    import './styles.css';

    export const TAX = 0.18;
    export function sum() {}
    export default function App() {}
    export { useState };
    export { effect as ReactEffect } from 'react';
  `;
  const tree = parseSource(code);
  const entities = extractEntities(tree, code, 'test.js');

  const imports = entities.filter(e => e.type === 'import');
  assert.equal(imports.length, 5);
  
  const exports = entities.filter(e => e.type === 'export');
  assert.equal(exports.length, 5); // TAX, sum, App, useState, ReactEffect
});

test('AST Extractor - Variables', () => {
  const code = `
    const PORT = 5000;
    let count = 0;
    var name = "Agniva";
  `;
  const tree = parseSource(code);
  const entities = extractEntities(tree, code, 'test.js');

  const variables = entities.filter(e => e.type === 'variable');
  assert.equal(variables.length, 3);
  assert.equal(variables[0].name, 'PORT');
  assert.equal(variables[1].name, 'count');
  assert.equal(variables[2].name, 'name');
});
