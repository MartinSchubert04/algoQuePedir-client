import { render, screen, waitFor } from "@testing-library/react"
import { describe, expect, test, vi, beforeEach } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { RestaurantsToRate } from "./Calificar"
import { Context as UserContext } from "@context/UserContext"
import { restaurantService } from "@service/CalificarService"
import type { CalificacionesResponse } from "@domain/Restaurant"
import type { Mock } from "vitest"


//Mock Calificar component
vi.mock("../../components/Calificar/Calificar.tsx", () => ({
  Calificar: ({ local }: { local: CalificacionesResponse }) => (
    <div data-testid={`calificar-${local.id}`}>{local.nombreLocal}</div>
  ),
}))

//Mock restaurantService 
vi.mock("@service/CalificarService", () => ({
  restaurantService: {
    getLocalesCalificar: vi.fn(),
  },
}))

//Mock error 
vi.mock("@utils/errorHandling", () => ({
  showError: vi.fn(),
}))

beforeEach(() => {
  localStorage.clear()
  vi.clearAllMocks()
})

describe("Calificar test", () => {
  test("Renderiza y muestra los restaurantes a calificar", async () => {

    const mockFn = restaurantService.getLocalesCalificar as Mock

    mockFn.mockResolvedValue([
        { id: 1, nombreLocal: "Resto 1"  ,imagen: "asd.png",  distancia: 12, promedio:5 } as CalificacionesResponse,
        { id: 2, nombreLocal: "Resto 2" ,imagen: "asd.png",  distancia: 12, promedio:5} as CalificacionesResponse,
    ])

   const mockUser = { userId: 123,useLogin: vi.fn(),logout: vi.fn() }

    render(
      <UserContext.Provider value={mockUser}>
        <MemoryRouter>
          <RestaurantsToRate />
        </MemoryRouter>
      </UserContext.Provider>
    )

    expect(screen.getByText("...")).toBeTruthy()

    await waitFor(() => {
      expect(screen.getByTestId("calificar-1")).toBeTruthy()
      expect(screen.getByTestId("calificar-2")).toBeTruthy()
    })
  })

  test("Filtra locales que ya están en localStorage", async () => {
    const mockFn = restaurantService.getLocalesCalificar as Mock

    localStorage.setItem("ratedLocals", JSON.stringify([2]))

    mockFn.mockResolvedValue([
        { id: 1, nombreLocal: "Resto 1"  ,imagen: "asd.png",  distancia: 12, promedio:5 } as CalificacionesResponse,
        { id: 2, nombreLocal: "Resto 2" ,imagen: "asd.png",  distancia: 12, promedio:5} as CalificacionesResponse,
    ])

    const mockUser = { userId: 123,useLogin: vi.fn(),logout: vi.fn() }

    render(
      <UserContext.Provider value={mockUser}>
        <MemoryRouter>
          <RestaurantsToRate />
        </MemoryRouter>
      </UserContext.Provider>
    )

    await waitFor(() => {
      expect(screen.getByTestId("calificar-1")).toBeTruthy()
    })

    expect(screen.queryByTestId("calificar-2")).toBeNull()
  })
})
