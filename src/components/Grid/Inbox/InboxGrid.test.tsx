import { render, screen } from "@testing-library/react"
import { InboxGrid } from "./InboxGrid.component"
import { describe, expect, test } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { Inbox, Mensaje } from "@domain/Inbox"

describe("Inbox test", () => {
  test("InboxGrid se renderiza", () => {
    const mensajeMock: Mensaje = {
      fecha: "test",
      asunto: "",
      contenido: "",
      leido: true,
    }
    const inboxMock: Inbox = new Inbox([mensajeMock])
    render(
      <MemoryRouter>
        <InboxGrid inbox={inboxMock} />
      </MemoryRouter>,
    )
    expect(screen.getByTestId("inbox-grid")).toBeTruthy()
  })
})
