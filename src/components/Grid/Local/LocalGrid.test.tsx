import { render, screen } from "@testing-library/react"
import LocalGrid from "./LocalGrid.component"
import { describe, expect, test } from "vitest"
import { type LocalSearch } from "@domain/Local"
import { MemoryRouter } from "react-router-dom"

describe("Local Grid test", () => {
  test("LocalGrid se renderiza", () => {
    const localMock: LocalSearch = {
      nombreLocal: "test",
      imgURL: "test",
      calle: "test123",
      altura: "1",
    }
    render(
      <MemoryRouter>
        <LocalGrid locales={[localMock]} />
      </MemoryRouter>,
    )
    expect(screen.getByTestId("local-grid")).toBeTruthy()
  })
})
