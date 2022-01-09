import chromium from "chrome-aws-lambda";
import playwright from "playwright-core";

export default async function handler(req, res) {
  const browser = await playwright.chromium.launch(
    process.env.AWS_EXECUTION_ENV
      ? {
          args: [
            ...chromium.args,
            "--hide-scrollbars",
            "--disable-web-security",
          ],
          executablePath: await chrome.executablePath,
          headless: true,
        }
      : {
          args: [],
          executablePath:
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        }
  );
  const page = await browser.newPage({
    viewport: {
      width: 1200,
      height: 720,
    },
  });
  const url = req.query.path;
  const selector = req.query.selector;
  await page.goto(url);
  let data;
  if (selector) {
    data = await page.locator(selector).screenshot({
      type: "png",
    });
  } else {
    data = await page.screenshot({
      type: "png",
    });
  }
  await browser.close();
  res.setHeader(
    "Cache-Control",
    "s-maxage=31536000, max-age=31536000, stale-while-revalidate"
  );
  res.setHeader("Content-Type", "image/png");
  res.end(data);
}
