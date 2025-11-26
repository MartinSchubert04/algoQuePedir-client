import { render, screen } from "@testing-library/react"
import { PlatoModal } from "./PlatoModal.component"
import { describe, expect, test } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { type Plato } from "@domain/Plato"

describe("Plato Modal test", () => {
  test("Modal se renderiza", () => {
    const platoMock: Plato = {
      nombrePlato: "test",
      descripcion: "test",
      costo: 1,
      cantidad: 1,
      imagenPlato: "test",
    }
    render(
      <MemoryRouter>
        <PlatoModal plato={platoMock} onClose={() => {}} />
      </MemoryRouter>,
    )
    expect(screen.getByTestId("modal-test")).toBeTruthy()
  })
})
