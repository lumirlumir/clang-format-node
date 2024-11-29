// This file should have the same format as '/tests/integration-api-esm/index.test.cjs'.

const { ok } = require('node:assert');
const { describe, it } = require('node:test');

const {
  clangFormatPath,
  clangFormatNodePath,
  getClangFormatPath,
  getClangFormatNodePath,
} = require('clang-format-node');

const {
  getGitClangFormatPath,
  getClangFormatGitPath,
  gitClangFormatPath,
  clangFormatGitPath,
} = require('clang-format-git');

const {
  gitClangFormatPath: gitClangFormatPathPython,
  clangFormatGitPythonPath,
} = require('clang-format-git-python');

describe('integration-api-cjs CJS ok testing', () => {
  describe('clang-format-node', () => {
    it('clangFormatPath should be imported correctly', () => {
      ok(clangFormatPath);
    });
    it('clangFormatNodePath should be imported correctly', () => {
      ok(clangFormatNodePath);
    });
    it('getClangFormatPath should be imported correctly', () => {
      ok(getClangFormatPath);
    });
    it('getClangFormatNodePath should be imported correctly', () => {
      ok(getClangFormatNodePath);
    });
  });

  describe('clang-format-git', () => {
    it('getGitClangFormatPath should be imported correctly', () => {
      ok(getGitClangFormatPath);
    });
    it('getClangFormatGitPath should be imported correctly', () => {
      ok(getClangFormatGitPath);
    });
    it('gitClangFormatPath should be imported correctly', () => {
      ok(gitClangFormatPath);
    });
    it('clangFormatGitPath should be imported correctly', () => {
      ok(clangFormatGitPath);
    });
  });

  describe('clang-format-git-python', () => {
    it('gitClangFormatPath should be imported correctly', () => {
      ok(gitClangFormatPathPython);
    });
    it('clangFormatGitPythonPath should be imported correctly', () => {
      ok(clangFormatGitPythonPath);
    });
  });
});
