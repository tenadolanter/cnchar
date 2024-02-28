import cnchar  from  "cnchar";
import radical  from  "cnchar-radical";
import cnInfo  from  "cnchar-info";

import { utilSex }  from  "./utilSex.js";
import { utilTone }  from "./utilTone.js";
import { utilBaidu } from "./utilBaidu.js";
import { commonChar } from "../config.js";

cnchar.use(radical);
cnchar.use(cnInfo);

export const utilGenChar = async () => {
  let result = [];
  for (let i = 0x4e00; i <= 0x9fd0; i++) {
    const char = String.fromCharCode(i);
    if(!commonChar.includes(char)) continue;
    const spell = cnchar.spell(char, "low", "tone");
    const stroke = cnchar.stroke(char);
    const { radical, struct } = cnchar.radical(char)?.[0] ?? {};
    const { fiveElement, method, markSpell } = cnchar.info(char)?.[0] ?? {};
    const tradition = cnchar.convert.simpleToTrad(char);
    const sex = utilSex(char);
    const tone = utilTone(char);
    const baidu = await utilBaidu(char) ?? {};
    const charItem = {
      char: char,
      spell: spell,
      stroke: stroke,
      radical,
      struct,
      five: fiveElement,
      method: method,
      mark: markSpell,
      tradition,
      sex,
      tone,
      ...baidu
    }
    result.push(charItem);
  }
  return result;
}