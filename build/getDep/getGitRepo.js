const path = require('path');
const nodegit = require('nodegit');

module.exports = () => {
  const rootDir = path.resolve(__dirname, '../../');
  return new Promise((resolve) => {
    nodegit.Repository.open(rootDir).then((repo) => {
      resolve(repo);
    });
  });
};
