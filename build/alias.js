const path = require('path');
const aliasObj = {
    '@': path.resolve(__dirname, '../src'),
    'src': path.resolve(__dirname, '../src'),
    'components': path.resolve(__dirname, '../src/public/components'),
    'methods': path.resolve(__dirname, '../src/public/methods'),
    'lib': path.resolve(__dirname, '../src/public/lib'),
    'utils': path.resolve(__dirname, '../src/public/utils')
};

module.exports = aliasObj;
