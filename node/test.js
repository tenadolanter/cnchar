const { utilFileRead } = require("../src/utils/utilFile.js");
const { utilRandom } = require("../src/utils/utilRandom.js");
const { utilDafen } = require("../src/utils/utilDafen.js");

// 生成属性为
const surname = "张";
const sex = "男";
const fiveName = "火";
const secondFive = "金";
const length = 50;
const score = 90;

(async () => {
  const genName = (sex, surname, fiveName, secondFive) => {
    const filePath = "./src/data.json";
    const nameArray = utilFileRead(filePath);
    const surnObj = nameArray.find((item) => item.char === surname);
    // 符合第一个条件的
    const firstNames = nameArray.filter(
      (item) =>
        (item.five === fiveName || !item.five) &&
        (!item.sex || item.sex === sex) &&
        item.stroke < 10
    );
    const firstObj = utilRandom(firstNames);

    const totalStroke = surnObj?.stroke + firstObj?.stroke;
    const firstTone = firstObj?.tone || 0;
    // 符合条件且总笔画数是偶数
    const secondNames = nameArray.filter(
      (item) =>
        (item.five === secondFive || !!item.five) &&
        (!item.sex || item.sex === sex) &&
        (!item.tone || item.tone >= firstTone) &&
        item.stroke < 10 &&
        (totalStroke + item.stroke) % 2 === 0
    );
    const secondObj = utilRandom(secondNames);
    return [surnObj, firstObj, secondObj];
  };

  let result = [];
  const genNames = (sex, surname, fiveName, secondFive, length) => {
    let result = [];
    for (let i = 0; i < length; i++) {
      let names = genName(sex, surname, fiveName, secondFive);
      result.push(names);
    }
    return result;
  };

  while (result.length < length) {
    const rs = genNames(sex, surname, fiveName, secondFive, length);
    for (let i = 0; i < rs.length; i++) {
      const item = rs[i];
      const _score = await utilDafen(item);
      if (_score >= score) {
        result.push({
          score: _score,
          data: item,
        });
      }
    }
  }

  let names = [];
  result.forEach((item) => {
    let name = item.data.map((ele) => ele.char).join("");
    names.push(name + item.score + "分\n");
  });

  console.log(names.join(""));
})();
