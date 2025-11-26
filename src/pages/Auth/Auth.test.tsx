import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom'
import { Auth } from "./Auth"
import { describe, expect, test, vi, afterEach } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { Context as UserContext } from "@context/UserContext"

const {
  mockedNavigate,
  mockLogin,
  mockRegister,
  mockUseLogin,
  mockUseLocation
} = vi.hoisted(() => ({
  mockedNavigate: vi.fn(),
  mockLogin: vi.fn(),
  mockRegister: vi.fn(),
  mockUseLogin: vi.fn(),
  mockUseLocation: vi.fn(),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useLocation: () => mockUseLocation(),
  }
})

vi.mock("../../service/authService", () => ({
  authService: {
    login: mockLogin,
    register: mockRegister,
  },
}))

vi.mock("../../utils/errorHandling", () => ({
  showSuccess: vi.fn(),
  getErrorMessage: (e: any) => e?.message || "Error desconocido"
}))

describe("auth tests", () => {

  const mockUserContext = {
    userId: null,
    username: null,
    useLogin: mockUseLogin,
    logout: vi.fn(),
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  const renderAuth = (initialPath: string) => {
    mockUseLocation.mockReturnValue({ pathname: initialPath })

    render(
      <UserContext.Provider value={mockUserContext as any}>
        <MemoryRouter initialEntries={[initialPath]}>
          <Auth />
        </MemoryRouter>
      </UserContext.Provider>
    )
  }

  test("muestra error si los campos están vacios", () => {
    renderAuth("/Login")

    fireEvent.click(screen.getByTestId("btn-submit"))

    expect(screen.getByTestId("error-msg")).toHaveTextContent("Los campos son obligatorios")
    expect(mockLogin).not.toHaveBeenCalled()
  })

  test("guarda el ID en el contexto y navega al Home", async () => {
    const username = "usuario"
    const password = "password"
    const fakeUserId = 100

    mockLogin.mockResolvedValueOnce({ userId: fakeUserId , username: username })

    renderAuth("/Login")

    fireEvent.change(screen.getByTestId("input-usuario"), {
      target: { value: username }
    })

    fireEvent.change(screen.getByTestId("input-password"), {
      target: { value: password }
    })

    fireEvent.click(screen.getByTestId("btn-submit"))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(username, password)
      expect(mockUseLogin).toHaveBeenCalledWith(fakeUserId, username)
      expect(mockedNavigate).toHaveBeenCalledWith("/Home")
    })
  })

  test("muestra error si las contraseñas no coinciden", async () => {
    renderAuth("/Register")

    fireEvent.change(screen.getByTestId("input-usuario"), {
      target: { value: "testuser" }
    })
    fireEvent.change(screen.getByTestId("input-password"), {
      target: { value: "abc1234" }
    })
    fireEvent.change(screen.getByTestId("input-confirm-password"), {
      target: { value: "abc1235" }
    })

    fireEvent.click(screen.getByTestId("btn-submit"))

    await waitFor(() => {
      expect(screen.getByTestId("error-msg")).toHaveTextContent(
        "Las contraseñas no coinciden"
      )
    })

    expect(mockRegister).not.toHaveBeenCalled()
  })

  test("muestra error si el nombre de usuario es invalido", async () => {
    renderAuth("/Register")

    fireEvent.change(screen.getByTestId("input-usuario"), {
      target: { value: "_" }
    })
    fireEvent.change(screen.getByTestId("input-password"), {
      target: { value: "12345" }
    })
    fireEvent.change(screen.getByTestId("input-confirm-password"), {
      target: { value: "12345" }
    })

    fireEvent.click(screen.getByTestId("btn-submit"))

    await waitFor(() => {
      expect(screen.getByTestId("error-msg")).toHaveTextContent(
        "El usuario debe contar con almenos 3 caracteres, sin espacios ni simbolos"
      )
    })

    expect(mockRegister).not.toHaveBeenCalled()
  })
})
