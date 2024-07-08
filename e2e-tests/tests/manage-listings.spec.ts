import { test, expect } from "@playwright/test";
import path from "path";
const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("admin@gmail.com");
  await page.locator("[name=password]").fill("password");

  await page.getByRole("button", { name: "Sign In" }).click();

  await expect(page.getByText("Sign in Successful")).toBeVisible();
});

test("should allow user to add a listing", async ({ page }) => {
  await page.goto(`${UI_URL}add-listing`);

  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page.locator('[name="description"]').fill("Test description");

  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");

  await page.getByText("Castle").click();

  await page.getByLabel("WiFi").check();
  await page.getByLabel("Pool").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("3");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "test-img.jpg"),
  ]);

  await page.getByRole("button", { name: "Save Listing" }).click();

  await expect(page.getByText("Listing Saved")).toBeVisible();
});
