import { render, screen } from "@testing-library/react"
import { MenuGrid } from "./MenuGrid.component"
import { describe, expect, test } from "vitest"
import type { Plato } from "@domain/Plato"

describe("Plato Card test", () => {
  test("Plato card se renderiza", () => {
    const platoMock: Plato = {
      nombrePlato: "test",
      descripcion: "test",
      costo: 1,
      cantidad: 1,
      imagenPlato: "test",
    }
    render(<MenuGrid menu={[platoMock]} />)
    expect(screen.getByTestId("menu-grid")).toBeTruthy()
  })
})
