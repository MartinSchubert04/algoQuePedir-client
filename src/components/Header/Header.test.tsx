import { render, screen } from "@testing-library/react"
import { Header } from "./Header.component"
import { describe, expect, test } from "vitest"
import { MemoryRouter } from "react-router-dom"

describe("Header test", () => {
  test("Header se renderiza", () => {
    render(
      <MemoryRouter>
        <Header title="test" />
      </MemoryRouter>,
    )
    expect(screen.getByTestId("header")).toBeTruthy()
  })
})
