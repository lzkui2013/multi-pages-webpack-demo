const path = require('path');
const { resolve } = path;
const aliasObj = {
  '@': resolve(__dirname, '../src'),
  src: resolve(__dirname, '../src'),
  components: resolve(__dirname, '../src/public/components'),
  methods: resolve(__dirname, '../src/public/methods'),
  lib: resolve(__dirname, '../src/public/lib'),
  utils: resolve(__dirname, '../src/public/utils'),
};

module.exports = aliasObj;
