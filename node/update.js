import chars from "../src/index.js";
// import cnchar  from  "cnchar";
import { utilFileWrite } from "../src/utils/utilFile.js";
import { utilBaidu } from "../src/utils//utilBaidu.js";
import { evalChar } from "../src/config.js";


(async () => {
  let result = [];
  const arrChars = chars;
  for(let i = 0; i < arrChars.length; i++) {
    const item = arrChars[i];
    // 清理掉排除的字
    if(!evalChar.includes(item.char)) {
      result.push(item)
    }
  }
  const filePath = "./src/index.js";
  utilFileWrite(filePath, result);
})();