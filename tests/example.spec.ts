import { test, expect } from "@playwright/test";
import env from "../env.js";

test("has title", async ({ page }) => {
  console.log(env.INPUT_CLASS);
  console.log(process.env);
});
