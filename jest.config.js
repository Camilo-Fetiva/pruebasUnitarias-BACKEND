export default {
    testEnvironment: 'node', // Indica que Jest debe usar el entorno de Node.js
    transform: {
      '^.+\\.js$': 'babel-jest', // Usa babel-jest para transformar archivos .js
    },
  };