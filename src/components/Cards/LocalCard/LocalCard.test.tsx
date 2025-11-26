import { render, screen } from "@testing-library/react"
import { LocalCard } from "./LocalCard.component"
import { describe, expect, test } from "vitest"
import { type LocalSearch } from "@domain/Local"
import { MemoryRouter } from "react-router-dom"

describe("Local Card test", () => {
  test("Local card se renderiza", () => {
    const localMock: LocalSearch = {
      nombreLocal: "test",
      imgURL: "test",
      calle: "test123",
      altura: "1",
    }
    render(
      <MemoryRouter>
        <LocalCard {...localMock} />
      </MemoryRouter>,
    )
    expect(screen.getByTestId("local-card")).toBeTruthy()
  })
})
