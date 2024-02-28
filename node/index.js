import { utilGenChar } from "../src/utils/utilChar.js";
import { utilFileWrite } from "../src/utils/utilFile.js";

(async () => {
  const content = await utilGenChar();
  const filePath = "./src/index.js";
  utilFileWrite(filePath, content);
})();
