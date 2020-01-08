const fs = require('fs-extra');
const path = require('path');

module.exports = () => {
    return new Promise((resolve, reject) => {
        let localDepencyPath = path.resolve(__dirname, './localDepency.json');
        fs.exists(localDepencyPath).then(isExist => {
            if (isExist) {
                const localDepency = require(localDepencyPath);
                resolve(localDepency);
            } else {
                console.log('本地没有依赖文件，本次构建将构建所有文件');
                resolve({});
            }
        });

    });
}
