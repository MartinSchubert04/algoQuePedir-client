import { describe, expect, test, it, afterEach, vi, beforeEach } from "vitest"
import { render, screen, cleanup, waitFor, fireEvent } from "@testing-library/react"
import { ListaPedidos } from "./ListaPedidos.tsx"
import userEvent from '@testing-library/user-event'
import { detalleService } from "../../service/detalleService.ts"
import type { PedidoDTO } from "../../domain/Pedido.ts"
import type { ReactNode } from "react";
import { Context } from "@context/UserContext";

type Props = {
  children: ReactNode;
};

const MockUserContextProvider = ({ children }: Props) => (
  <Context.Provider
    value={{
      userId: 1,
      username: "usuarioTest",
      useLogin: vi.fn(),
      logout: vi.fn(),
    }}
  >
    {children}
  </Context.Provider>
);

export default MockUserContextProvider;


vi.stubGlobal("localStorage", {
  getItem: vi.fn(() => "usuarioTest")
})

const mockNavigate = vi.fn()
vi.mock("react-router-dom", () => ({
  ...(vi.importActual("react-router-dom") as any),
  useNavigate: () => mockNavigate
}))

vi.mock("../../service/detalleService.ts", () => ({
  detalleService: {
    getAllPedidos: vi.fn(),
    getPedidoById: vi.fn(),
    cancelarPedido: vi.fn()
  }
}));


const listaMock = [
    {
        "id": -2,
        "estado": "PENDIENTE",
        "nombreLocal": "Pizzas Ya",
        "valoracion": 2.9,
        "distanciaALocal": 11.23,
        "fecha": "24 de noviembre",
        "fotoLocal": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKtCWoQOzlUBun9VGIO2HG1KSoofc2emPLwg&s",
        "items": 1,
        "total": 4267.43,
        "metodoPago": "EFECTIVO",
        "platos": [
            {
                "id": 1,
                "nombrePlato": "Pancho",
                "cantidad": 1,
                "costo": 3765.375,
                "imagenPlato": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWTsM9_KKdaryNYbqgb0kmKWpRpVr3na-Niw&s"
            }
        ],
        "costeEnvio": 502.05,
        "adicionalPorMedio": 1.0
    }
]

describe("lista de pedidos test", () => {

    beforeEach(() => {
        (detalleService.getAllPedidos as any).mockResolvedValue(listaMock)
    })

    afterEach(() => {
        cleanup()
        vi.resetAllMocks()
    })

    test("se carga correctamente la página de pedidos", async () => {
  render(
  <MockUserContextProvider>
  <ListaPedidos />
  </MockUserContextProvider>
  )


      expect(screen.getByText("Cargando pedidos...")).toBeDefined()

      const local = await screen.findByText("Pizzas Ya")
      expect(local).toBeDefined()
    })

    test("1. lista los pedidos correctamente", async () => {
      (detalleService.getAllPedidos as any).mockResolvedValue(listaMock)

  render(
  <MockUserContextProvider>
  <ListaPedidos />
  </MockUserContextProvider>
  )


      expect(screen.getByText("Cargando pedidos...")).toBeDefined()

      const pedido = await screen.findByText("Pizzas Ya")
      expect(pedido).toBeDefined()
    })


    test("2. cancela un pedido", async () => {
      (detalleService.getAllPedidos as any).mockResolvedValue(listaMock)

      ;(detalleService.cancelarPedido as any).mockResolvedValue({})

      const listaDespues: never[] = []
      ;(detalleService.getAllPedidos as any).mockResolvedValueOnce(listaMock)
      ;(detalleService.getAllPedidos as any).mockResolvedValueOnce(listaDespues)

  render(
  <MockUserContextProvider>
  <ListaPedidos />
  </MockUserContextProvider>
  )


      await screen.findByText("Pizzas Ya")

      const botonCancelar = screen.getByRole("button", { name: /cancelar pedido/i })
      expect(botonCancelar).toBeDefined()

      await userEvent.click(botonCancelar)

      await waitFor(() => {
        expect(detalleService.cancelarPedido).toHaveBeenCalledTimes(1)
      })

      //se recarga la lista (mock de lista vacía)
      await screen.findByText("No hay pedidos en esta categoría")
    })

    test("3. navegar al detalle al hacer click en un pedido", async () => {
    render(
    <MockUserContextProvider>
      <ListaPedidos />
    </MockUserContextProvider>
    )
    const pedido = await screen.findByText("Pizzas Ya")

    await userEvent.click(pedido)

    expect(mockNavigate).toHaveBeenCalledWith("/Pedidos/-2/Pizzas Ya")
  })

})

describe("Filtros de ListaPedidos", () => {
  const pedidosMock: PedidoDTO[] = [
    {
      id: 1,
      estado: "PENDIENTE",
      nombreLocal: "Pizzeria Don Antonio",
      valoracion: 4.5,
      distanciaALocal: 1.2,
      fecha: "2024-10-01",
      fotoLocal: "foto1.jpg",
      items: 2,
      total: 200,
      metodoPago: "EFECTIVO",
      platos: [],
      costeEnvio: 50,
      adicionalPorMedio: 0,
    },
    {
      id: 2,
      estado: "ENTREGADO",
      nombreLocal: "Sushi Master",
      valoracion: 4.8,
      distanciaALocal: 3.4,
      fecha: "2024-10-02",
      fotoLocal: "foto2.jpg",
      items: 3,
      total: 500,
      metodoPago: "TRANSFERENCIA",
      platos: [],
      costeEnvio: 60,
      adicionalPorMedio: 40,
    },
    {
      id: 3,
      estado: "CANCELADO",
      nombreLocal: "Hamburguesas King",
      valoracion: 4.1,
      distanciaALocal: 2.1,
      fecha: "2024-10-03",
      fotoLocal: "foto3.jpg",
      items: 1,
      total: 300,
      metodoPago: "QR",
      platos: [],
      costeEnvio: 45,
      adicionalPorMedio: 20,
    }
  ];

  beforeEach(() => {
    (detalleService.getAllPedidos as any).mockResolvedValue([pedidosMock[0]]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("muestra solo pedidos pendientes al inicio", async () => {
  render(
  <MockUserContextProvider>
  <ListaPedidos />
  </MockUserContextProvider>
  )

    await waitFor(() => {
      expect(screen.getByText("Pizzeria Don Antonio")).to.exist;
    });

      expect(screen.queryByText("Sushi Master")).to.equal(null);
      expect(screen.queryByText("Hamburguesas King")).to.equal(null);
  });

  it("filtra pedidos entregados al presionar 'Completados'", async () => {

    (detalleService.getAllPedidos as any).mockResolvedValue(pedidosMock);

  render(
  <MockUserContextProvider>
  <ListaPedidos />
  </MockUserContextProvider>
  )


    fireEvent.click(screen.getByText("Completados"));
    await waitFor(() => {
      expect(screen.getByText("Sushi Master")).to.exist;
    });

    expect(screen.queryByText("Pizzeria Don Antonio")).to.equal(null);
    expect(screen.queryByText("Hamburguesas King")).to.equal(null);
  });

  it("filtra pedidos cancelados al presionar 'Cancelados'", async () => {
    (detalleService.getAllPedidos as any).mockResolvedValue([pedidosMock[2]]);

  render(
  <MockUserContextProvider>
  <ListaPedidos />
  </MockUserContextProvider>
  )
  

    fireEvent.click(screen.getByText("Cancelados"));

    await waitFor(() => {
      expect(screen.getByText("Hamburguesas King")).to.exist;
    });

    expect(screen.queryByText("Pizzeria Don Antonio")).to.equal(null);
    expect(screen.queryByText("Sushi Master")).to.equal(null);
  });
});


