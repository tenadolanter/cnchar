const { utilGenChar } = require("../src/utils/utilChar.js");
const { utilFileWrite } = require("../src/utils/utilFile.js");

(async () => {
  const content = await utilGenChar();
  const filePath = "./src/data.json";
  utilFileWrite(filePath, content);
})()