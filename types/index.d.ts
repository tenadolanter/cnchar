interface CnChar {
  // 中文汉字
  char: string;
  // 汉字的拼音
  spell: string;
  // 汉字的笔画数
  stroke: number;
  // 偏旁部首
  radical: string;
  // 汉字结构
  struct: string;
  // 五行属性
  five: string;
  // 造字法：'形声' | '会意'
  method: string;
  // 汉字注音
  mark: string;
  // 繁体字
  tradition: string;
  // 文字的性别属性
  sex: string;
}