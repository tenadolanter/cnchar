import path from "path";
import fs from "fs";
const cwd = process.cwd();

/**
 * 向某个路径下的文件里面写入内容
 * @param { String } - filePath 文件的路径
 * @param { String } - content 文件内容
*/
export const utilFileWrite = (filePath, content) => {
  const contentPath = path.join(cwd, filePath);
  // 如果文件不存在，则创建文件
  if (!fs.existsSync(contentPath)) {
    fs.writeFileSync(contentPath, 'export default ' + JSON.stringify({}), (err) => {
      if (err) {
        console.log(err);
        process.exit(2);
      }
    });
  }
  fs.writeFileSync(contentPath, 'export default ' + JSON.stringify(content, null, 2), (err) => {
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
export const utilFileRead = (filePath) => {
  const result = fs.readFileSync(path.join(cwd, filePath), { encoding: "utf8"});
  return JSON.parse(result, null, 2);
}

