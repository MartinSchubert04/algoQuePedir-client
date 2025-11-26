import { test, expect } from "@playwright/test"
import { API_URL } from "../src/service/config" 

const LOGIN_URL = `${API_URL}/user/login` 
const HOME_URL = "http://localhost:5173/Home"
const LOGIN_APP_URL = "http://localhost:5173/Login"

async function fillAuthFields(page, user, pass, confirm = null) { 
    await page.getByTestId("input-usuario").fill(user)
    await page.getByTestId("input-password").fill(pass)
    if (confirm) {
        await page.getByTestId("input-confirmar-password").fill(confirm)
    }

}

test.describe("Auth tests", () => {
  
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear()
    })
    await page.goto(LOGIN_APP_URL)
  })

  test("muestra error de validación de campos vacíos al hacer click", async ({ page }) => {
    await page.getByRole("button", { name: "Iniciar sesión" }).click()
    await expect(page.getByText("Los campos son obligatorios")).toBeVisible()
  })

  test("muestra error de credenciales al fallar la API", async ({ page }) => {

    await page.route(LOGIN_URL, async (route) => {
        await route.fulfill({
            status: 400,
            contentType: "application/json",
            body: JSON.stringify({
                message: "Usuario o contraseña incorrectos"
            })
        })
    })

    await fillAuthFields(page, "usuario_existente", "incorrecta_api");
    const [response] = await Promise.all([
        page.waitForResponse((resp) => resp.url().includes('/login') && resp.status() === 400),
        page.getByRole("button", { name: "Iniciar sesión" }).click()
    ])

    await expect(page.getByText(/Usuario o contraseña incorrectos/i)).toBeVisible()
    await expect(page.getByAltText("warning-img")).toBeVisible()
  })
  
  test("navega a /Home al completar el login con éxito", async ({ page }) => {
    await page.route(LOGIN_URL, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                userId: 100, 
                username: "testuser"
            })
        })
    })
    await fillAuthFields(page, "test", "123");

    const [response] = await Promise.all([
        page.waitForURL(HOME_URL),
        page.getByRole("button", { name: "Iniciar sesión" }).click(),
    ])
    
    await expect(page).toHaveURL(HOME_URL)
  })
})