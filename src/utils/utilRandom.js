/**
 * 从数组中获取随机的index的对象
 * @param { Array } - arrData 数组数据
*/
const utilRandom = (arrData) => {
  const length = arrData.length;
  const randomIndex = Math.floor(Math.random() * length);
  return arrData[randomIndex];
}

module.exports  = {
  utilRandom,
}