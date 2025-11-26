import { test, expect } from "@playwright/test"

test.describe("Local", () => {
  test.beforeEach(async ({ page, isMobile }) => {
    await page.addInitScript(() => {
      localStorage.setItem("userId", "123")
    })
    // Mock de /local/:id
    await page.route("http://localhost:9000/local/1", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: 1,
          nombreLocal: "Pizzas Ya",
          imgURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKtCWoQOzlUBun9VGIO2HG1KSoofc2emPLwg&s",
          calle: "Av. Cordoba",
          altura: 531,
          mediosDePago: ["EFECTIVO"],
          menu: [
            {
              id: 3,
              nombrePlato: "Pizza Margarita",
              descripcion: "Pizza estilo italiano, queso de buffala y salsa marinara",
              cantidad: 1,
              costo: 22575.375,
              imagenPlato: "https://wp-cdn.typhur.com/wp-content/uploads/2025/01/homemade-pizza-in-air-fryer.jpg",
            },
            {
              id: 1,
              nombrePlato: "Pancho",
              descripcion: "Carne mixta, con pan artesanal, 2 aderezos a eleccion",
              cantidad: 1,
              costo: 3765.375,
              imagenPlato: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWTsM9_KKdaryNYbqgb0kmKWpRpVr3na-Niw&s",
            },
          ],
          promedioPuntajes: 2.9,
          cantidadPuntajes: 10,
          cantidadPedidos: 3,
          inbox: {
            mensajes: [
              { fecha: "2025-11-21T16:44:02.5217144", asunto: "Buena comida", contenido: "Todo perfecto", usuario: "Juan" },
              { fecha: "2025-11-21T16:44:02.5217144", asunto: "Demora", contenido: "Llegó tarde", usuario: "Maria" },
              { fecha: "2025-11-21T16:44:02.5217144", asunto: "Devolucion", contenido: "No me gustó", usuario: "Pedro" },
              { fecha: "2025-11-21T16:44:02.5217144", asunto: "Un asco", contenido: "Horrible", usuario: "Ana" },
            ],
          },
        }),
      })
    })

    await page.goto("http://localhost:5173/Local/1")
  })

  test("Local muestra platos", async ({ page }) => {
    await expect(page.getByTestId("plato-card").first()).toBeVisible()
  })

  test("Local muestra inbox", async ({ page }) => {
    await page.getByRole("button", { name: "Reseñas" }).click()

    await expect(page.getByTestId("mensaje-card").first()).toBeVisible()
  })
})
