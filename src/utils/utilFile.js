const path = require("path");
const fs = require("fs");
const cwd = process.cwd();

/**
 * 向某个路径下的文件里面写入内容
 * @param { String } - filePath 文件的路径
 * @param { String } - content 文件内容
*/
const utilFileWrite = (filePath, content) => {
  const contentPath = path.join(cwd, filePath);
  // 如果文件不存在，则创建文件
  if (!fs.existsSync(contentPath)) {
    fs.writeFileSync(contentPath, JSON.stringify({}), (err) => {
      if (err) {
        console.log(err);
        process.exit(2);
      }
    });
  }
  fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), (err) => {
    if (err) {
      console.log(err);
      process.exit(2);
    }
  });
}

/**
 * 读取某个路径下的文件里面的内容
 * @param { String } - filePath 文件的路径
*/
const utilFileRead = (filePath) => {
  const result = fs.readFileSync(path.join(cwd, filePath), { encoding: "utf8"});
  return JSON.parse(result, null, 2);
}

module.exports = {
  utilFileWrite,
  utilFileRead,
}

