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

  await page
    .locator('[name="name"]')
    .fill("Added Listing" + Math.floor(Math.random() * 90000) + 1000);
  await page.locator('[name="city"]').fill("Added City");
  await page.locator('[name="country"]').fill("Added Country");
  await page.locator('[name="description"]').fill("Added description");

  await page.locator('[name="pricePerNight"]').fill("200");
  await page.selectOption('select[name="starRating"]', "4");
  await page.getByText("Ranch").click();

  await page.getByLabel("WiFi").check();
  await page.getByLabel("Pool").check();

  await page.locator('[name="adultCount"]').fill("4");
  await page.locator('[name="childCount"]').fill("1");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "test-img.jpg"),
  ]);

  await page.getByRole("button", { name: "Save Listing" }).click();

  await expect(page.getByText("Listing Saved")).toBeVisible();
});

test("should allow user to view listings", async ({ page }) => {
  await page.goto(`${UI_URL}my-listings`);
  await page.getByRole("link", { name: "My Listings" }).click();
  await expect(page.getByText("Test Listing")).toBeVisible();
  await expect(page.getByText("Test description")).toBeVisible();
  await expect(page.getByText("Test City, Test Country")).toBeVisible();
  await expect(page.getByText("Castle")).toBeVisible();
  await expect(page.getByText("$100 per night")).toBeVisible();
  await expect(page.getByText("2 adults, 3 children")).toBeVisible();
  await expect(page.getByText("3 Star Rating")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View Details" }).nth(0)
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Listing" })).toBeVisible();
});

test("should allow user to edit listing", async ({ page }) => {
  await page.goto(`${UI_URL}my-listings`);
  await page.getByRole("link", { name: "View Details" }).nth(0).click();
  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue("Test Listing");
  await page.locator('[name="name"]').fill("Test Listing Edited");
  await page.getByRole("button", { name: "Save Listing" }).click();

  page.waitForLoadState();
  await page.getByRole("link", { name: "View Details" }).nth(0).click();

  await expect(page.locator('[name="name"]')).toHaveValue(
    "Test Listing Edited"
  );
  await page.locator('[name="name"]').fill("Test Listing");
  await page.getByRole("button", { name: "Save Listing" }).click();
});
