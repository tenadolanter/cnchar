import { charSex } from "../config.js";
export const utilSex = (char) => {
  if (charSex.boy.includes(char)) {
    return "男";
  } else if (charSex.girl.includes(char)) {
    return "女";
  }
  return "";
};

