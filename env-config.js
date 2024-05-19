// env-config.js
const dotenv = require('dotenv');
const fs = require('fs');
const targetPath = './src/environments/environment.ts';
const targetProdPath = './src/environments/environment.prod.ts';

// Carregar variáveis de ambiente
dotenv.config();

const environmentFileContent = `
export const environment = {
  production: false,
  API_KEY: '${process.env.API_KEY}'
};
`;

const environmentProdFileContent = `
export const environment = {
  production: true,
  API_KEY: '${process.env.API_KEY}'
};
`;

// Escrever conteúdo nos arquivos de ambiente
fs.writeFile(targetPath, environmentFileContent, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Wrote variables to ${targetPath}`);
  }
});

fs.writeFile(targetProdPath, environmentProdFileContent, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Wrote variables to ${targetProdPath}`);
  }
});
