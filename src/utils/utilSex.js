const { charSex } = require("../config.js");
const utilSex = (char) => {
  if (charSex.boy.includes(char)) {
    return "男";
  } else if (charSex.girl.includes(char)) {
    return "女";
  }
  return "";
};

module.exports = {
  utilSex,
};
