import { sleep } from "bun";
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  headless: false,
});
const page = await browser.newPage();

const currentLink = "http://localhost:5500";

await page.goto(currentLink);

await page.setViewport({ width: 1440, height: 715 });

const hrefs = await page.evaluate(async () => {
  const anchors = document.querySelectorAll<HTMLAnchorElement>("a.card");
  return Array.from(anchors).map((a) => a.href);
});

for (let href of hrefs) {
  let link = "";
  if (href.startsWith("./")) {
    link = currentLink + href.slice(1);
  } else {
    link = href;
  }

  console.log("Visiting " + link + " now");
  const page = await browser.newPage();
  await page.goto(link);
  await page.setViewport({ width: 1440, height: 715 });

  await sleep(6000);

  const bytes = await page.screenshot({
    type: "webp",
  });

  const fileName = link
    .match(/^.*\/(.*)\/$/)?.[1]
    .toLowerCase()
    .replaceAll("-", "_") as string;

  await Bun.write("./screenshots/" + fileName + ".webp", bytes);

  // await page.close();
}

await browser.close();
