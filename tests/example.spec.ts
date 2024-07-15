import { test, expect } from "@playwright/test";
import env from "../env.js";

function numberToDayString(dayNumber: number) {
  switch (dayNumber) {
    case 0:
      return "Dimanche";
    case 1:
      return "Lundi";
    case 2:
      return "Mardi";
    case 3:
      return "Mercredi";
    case 4:
      return "Jeudi";
    case 5:
      return "Vendredi";
    case 6:
      return "Samedi";
  }
  throw new Error("Invalid day of week " + dayNumber);
}

test("has title", async ({ page }) => {
  // Step 1: find the class
  const today = new Date().getDay();
  await page.goto("https://www.swedishfit.fr/cours/list/");
  await page.getByTitle(numberToDayString(today)).click();
  await page.getByRole("treeitem", { name: env.INPUT_DAY }).click();
  await page.getByTitle("Toutes les activités").click();
  await page.getByRole("treeitem", { name: env.INPUT_CLASS }).first().click();
  await page.getByTitle("Toutes les salles").click();
  await page.getByRole("treeitem", { name: env.INPUT_LOCATION }).click();
  const row = await page
    .locator("tr:has-text('" + env.INPUT_TIME + "')")
    .first();
  const class_url = await row
    .locator("td.details>a")
    .first()
    .getAttribute("href");
  expect(class_url, "Did not find the class").not.toBeNull();

  // Step 2: login
  const login = env["USER_" + env.INPUT_USER.toUpperCase() + "_LOGIN"];
  const password = env["USER_" + env.INPUT_USER.toUpperCase() + "_PASSWORD"];

  await page.getByRole("link", { name: "Mon Compte" }).click();
  await page.getByLabel("Adresse email").click();
  await page.getByLabel("Adresse email").fill(login);
  await page.getByLabel("Mot de passe").fill(password);
  await page.getByRole("button", { name: "S'identifier" }).click();

  // Step 3: register
  await page.goto(class_url as string);
  await page.getByRole("link", { name: "RÉSERVER" }).click();
  await page.getByRole("button", { name: "Réserver" }).click();

  // Step 4: confirm via backlink
  // TODO
});
