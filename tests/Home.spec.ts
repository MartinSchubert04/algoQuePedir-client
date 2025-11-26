import { test, expect } from "@playwright/test"

test.describe("Home", () => {
  test.beforeEach(async ({ page, isMobile }) => {
    await page.addInitScript(() => {
      localStorage.setItem("userId", "123")
    })

    await page.route("http://localhost:9000/search**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: 1,
            nombreLocal: "Pizzas Ya",
            calle: "Av. Cordoba",
            altura: 531,
            imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKtCWoQOzlUBun9VGIO2HG1KSoofc2emPLwg&s",
          },
        ]),
      })
    })
    await page.goto("http://localhost:5173/Home")
  })

  test("Busqueda de local", async ({ page }) => {
    await page.getByTestId("input-search").fill("a")

    await page.waitForResponse(/.*\/search/i)

    await expect(page.getByTestId("local-card").first()).toBeVisible()
  })
})
