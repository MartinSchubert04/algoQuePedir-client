import { render, screen } from "@testing-library/react"
import { Home } from "./Home"
import { describe, expect, test } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { UserProvider } from "@context/UserProvider" 

describe("Home test", () => {
  test("La pagina Home se renderiza", () => {
    render(
      <UserProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </UserProvider>,
    )
    expect(screen.getByTestId("home-test")).toBeTruthy()
  })

  // TODO testing end to end
  // test("testeo e2e", () => {})
})
