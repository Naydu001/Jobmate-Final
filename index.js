const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const jobUrl = "https://boards.greenhouse.io/remotecom/jobs/6309578003";
  await page.goto(jobUrl, { waitUntil: "networkidle" });

  await page.fill('input[name="job_application[first_name]"]', "John");
  await page.fill('input[name="job_application[last_name]"]', "Doe");
  await page.fill('input[name="job_application[email]"]', "john@example.com");
  await page.fill('input[name="job_application[phone]"]', "+1234567890");

  const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    page.click('input[name="job_application[resume]"]'),
  ]);
  await fileChooser.setFiles("resume.pdf");

  await page.click('input[type="submit"]');
  await page.waitForTimeout(5000);

  console.log("✅ Job application submitted!");
  await browser.close();
})();
