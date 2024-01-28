const puppeteer = require("puppeteer");

const sleep = async (ms = 200) => {
  let timer;
  return new Promise((resolve) => (timer = setTimeout(resolve, ms))).finally(
    () => {
      if (timer) clearTimeout(timer);
    }
  );
};

const utilDafen = async (names) => {
  let result = "";
  const xsText = names?.[0]?.char;
  const mzText = names
    .slice(1)
    .map((item) => item.char)
    .join("");
  const xm = xsText + mzText;
  let browser = await puppeteer.launch({
    headless: "new",
  });
  let page = await browser.pages().then((e) => e[0]);
  const url = `https://xmcs.buyiju.com/`;
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await sleep(1000);
  await page.waitForSelector(".inform");
  const xingshiElement = "input[name='xs']";
  await page.$(xingshiElement);
  await page.click(xingshiElement);
  await page.type(xingshiElement, xsText);

  const mingzhiElement = "input[name='mz']";
  await page.$(mingzhiElement);
  await page.click(mingzhiElement);
  await page.type(mingzhiElement, mzText);

  const submitElement = "input[type='submit']";
  await page.$(submitElement);
  await page.click(submitElement);

  await sleep(1000);

  const scoreElement = ".content p b font[size='5']";
  const elementsWithClass = await page.$$(`${scoreElement}`);
  const contentArray = await Promise.all(
    elementsWithClass.map((element) => {
      return page.evaluate((el) => el.textContent, element);
    })
  );
  contentArray.forEach((content, index) => {
    result += content || "";
  });
  console.log("score", xm, result);
  await browser.close();
  page = null;
  browser = null;
  return Number(result);
};

module.exports = {
  utilDafen,
};
