import puppeteer from "puppeteer";

const sleep = async (ms = 200) => {
  let timer;
  return new Promise((resolve) => (timer = setTimeout(resolve, ms))).finally(
    () => {
      if (timer) clearTimeout(timer);
    }
  );
};

export const utilBaidu = async (char) => {
  let result = void 0;
  try {
    let browser = await puppeteer.launch({
      headless: "new",
    });
    let page = await browser.pages().then((e) => e[0]);
    const url = `https://hanyu.baidu.com/zici/s?from=aladdin&query=${char}&srcid=51368&wd=${char}`;
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await sleep(1000);
    await page.waitForSelector("#word-header");
    const pinyinElement = await page.$("#pinyin b");
    const pinyin = pinyinElement
      ? await page.evaluate((element) => element.textContent, pinyinElement)
      : "";
    const radicalElement = await page.$("#radical span");
    const radical = radicalElement
      ? await page.evaluate((element) => element.textContent, radicalElement)
      : "";
    const wuxingElement = await page.$("#wuxing span");
    const wuxing = wuxingElement
      ? await page.evaluate((element) => element.textContent, wuxingElement)
      : "";
    const strokeElement = await page.$("#stroke_count span");
    const stroke = strokeElement
      ? await page.evaluate((element) => element.textContent, strokeElement)
      : "";
    const traditionalElement = await page.$("#traditional span");
    const traditional = traditionalElement
      ? await page.evaluate(
          (element) => element.textContent,
          traditionalElement
        )
      : "";
    const explainElement = await page.$("#basicmean-wrapper .tab-content dl dd");
    let explain = explainElement
      ? await page.evaluate(
          (element) => element.textContent,
          explainElement
        )
      : "";
    explain = explain.replaceAll(" ", "")
    explain = explain.replaceAll("\n", "")
    result = {
      spell: pinyin,
      radical: radical,
      stroke: stroke,
      five: wuxing,
      tradition: traditional,
      explain,
    };
    console.log(result);
    await sleep(3000);
    await browser.close();
    page = null;
    browser = null;
  } catch (error) {}
  return result;
};
