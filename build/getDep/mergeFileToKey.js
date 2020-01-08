// 合并当前文件修改影响的所有入口
module.exports = (fileToKey) => {
    let allEntry = [];
    Object.keys(fileToKey).forEach(key => {
        allEntry = allEntry.concat(fileToKey[key]);
    });

    function unique(array) {
        return Array.from(new Set(array));
    }
    allEntry = unique(allEntry);
    allEntry = allEntry.filter(key => !!key);

    return allEntry;
}
