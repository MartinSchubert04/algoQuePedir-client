import { render, screen } from "@testing-library/react"
import { LocalPage } from "./Local"
import { describe, expect, test, vi } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { PedidoProvider } from "@context/PedidoProvider"

describe("Local test", () => {
  test("La pagina del local se renderiza", () => {
    render(
      <PedidoProvider>
        <MemoryRouter>
          <LocalPage />
        </MemoryRouter>
      </PedidoProvider>,
    )
    expect(screen.getByTestId("local-test")).toBeTruthy()
  })

  // TODO testing end to end
  // test("testeo e2e", () => {})
})
