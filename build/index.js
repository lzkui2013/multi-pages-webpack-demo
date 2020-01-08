const getDep = require('./getDep');
let typeStr = process.argv[2];
let typeArr = typeStr && typeStr.split('=') || [];

getDep(typeArr[1]);
