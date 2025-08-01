/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',        // Utilise ts-jest pour transpiler le TypeScript
  testEnvironment: 'node',  // Environnement Node
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Transforme les fichiers .ts et .tsx avec ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
