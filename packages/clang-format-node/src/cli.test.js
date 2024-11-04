const { doesNotThrow, throws } = require('node:assert');
const { execSync } = require('node:child_process');
const { resolve } = require('node:path');
const { describe, it } = require('node:test');

const cli = resolve(__dirname, 'cli.js');

describe('cli doesNotThrow and throws testing', () => {
  // Correct
  it('node cli.js --help', () => {
    doesNotThrow(() => {
      execSync(`node ${cli} --help`);
    });
  });
  it('node cli.js --version', () => {
    doesNotThrow(() => {
      execSync(`node ${cli} --version`);
    });
  });
  // Wrong
  it('node cli.js --abcdefg', () => {
    throws(() => {
      execSync(`node ${cli} --abcdefg`);
    });
  });
});