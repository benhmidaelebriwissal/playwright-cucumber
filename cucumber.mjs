import fs from 'fs';

const getWorldParams = () => {
  return {
    appurl: 'https://demowebshop.tricentis.com/login',
  };
};

const reportsFolder = './tests/reports';

const config = {
  requireModule: ['ts-node/register'],
  require: ['tests/**/*.ts'],
  paths: ['tests/**/*.feature'],
  format: [
    'json:tests/reports/report.json',
    'html:tests/reports/report.html',
  ],
  formatOptions: { snippetInterface: 'async-await' },
  worldParameters: getWorldParams(),
};

if (!fs.existsSync(reportsFolder)) {
  fs.mkdirSync(reportsFolder);
}

export default config;