// import { test, expect, Page } from "@playwright/test";

// export async function loginUser(page: Page) {
//     await page.goto("http://localhost:5173/Login");
//     await page.getByLabel("Usuario").fill("123");
//     await page.getByLabel("Contraseña").fill("123");
//     await page.getByRole("button", { name: "Iniciar sesión" }).click();

//     await page.waitForURL("**/Home");
// }

// test.describe("Perfil", () => {
//     test.beforeEach(async ({ page }) => {
//         await loginUser(page);
//         await page.route("**/userProfile/123", async (route) => {
//             await route.fulfill({
//                 status: 200,
//                 contentType: "application/json",
//                 body: JSON.stringify({
//                     nombre: "Agustin",
//                     apellido: "Gutierrez",
//                     direccion: "Cabildo",
//                     altura: 3,
//                     latitud: 1.0,
//                     longitud: 2.0,
//                     condicion: { tipo: "Sencillo" },
//                     ingredientesEvitar: ["PASTO"],
//                     ingredientesPreferidos: ["CARNE"],
//                     restosFavoritos: [
//                         {
//                             nombreLocal: "McDonald's",
//                             imgPath: "https://cdn-club.lavoz.com.ar/marcas/O93260847.webp",
//                             distancia: 3431.64925,
//                             promedio: 2.875,
//                             tipoDelivery: "Gratis"
//                         }
//                     ],
//                     palabrasMarketing: ["nutritivo", "bajo en sodio", "sin azúcar"],
//                     distanciaMax: 5.0
//                 }),
//             });
//         });

//         await page.route("**/ingrediente", async (route) => {
//             await route.fulfill({
//                 status: 200,
//                 contentType: "application/json",
//                 body: JSON.stringify([
//                     { nombre: "CARNE" },
//                     { nombre: "PASTO" },
//                     { nombre: "LECHUGA" }
//                 ])
//             });
//         });

//         const perfilButton = page.getByRole("link", { name: /perfil/i });
//         await expect(perfilButton).toBeVisible();
//         await perfilButton.click();

//         await page.waitForURL("**/Perfil");
//     });

//     test("Carga y muestra correctamente los datos del usuario", async ({ page }) => {
//         await expect(page.getByTestId("input-nombre")).toHaveValue("Agustin");

//         const exquisiteCheckbox = page.getByLabel("Exquisitos");
//         await expect(exquisiteCheckbox).not.toBeChecked();

//         await page.locator('.preference-container .goto-preference-button').nth(1).click();
//         await expect(page.getByTestId('ingredient-CARNE')).toBeVisible();
//     });
// });
