import { describe, expect, test, vi, beforeEach } from "vitest"
import { ToastContainer } from "./ToastContainer"
import { toasts } from "./toastStore"
import { render, screen } from "@testing-library/react"

describe("toast tests", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  test("should render toast", () => {
    render(<ToastContainer />)

    toasts.push("test")

    vi.runAllTimers()

    expect(screen.getByTestId("toast")).not.toBeNull()
  })
})
