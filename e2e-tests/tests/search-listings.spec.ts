import { test, expect } from "@playwright/test";
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

test("should show listing search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Test City");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Listings found in Test City")).toBeVisible();
  await expect(page.getByText("Castle")).toBeVisible();
  await expect(page.getByText("Test Listing")).toBeVisible();
  await expect(page.getByText("Test description")).toBeVisible();
});

test("should show listing detail", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where are you going?").fill("Test City");
  await page.getByRole("button", { name: "Search" }).click();
  await expect(page.getByText("Listings found in Test City")).toBeVisible();
  await expect(page.getByText("Test Listing")).toBeVisible();
  await expect(page.getByText("Test description")).toBeVisible();
  await page.getByRole("link", { name: "View Details" }).nth(0).click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
});

test("should book listing", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where are you going?").fill("Test City");

  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Test Listing").click();
  await page.getByRole("button", { name: "Book Now" }).click();

  await expect(page.getByText("Total Cost: $200.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").nth(0);

  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/35");
  await stripeFrame.locator('[placeholder="CVC"]').fill("123");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("48574");

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByText("Thank you, admin!")).toBeVisible();
});
