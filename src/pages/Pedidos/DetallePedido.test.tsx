import { render, screen, waitFor, fireEvent, within } from "@testing-library/react";
import { describe, expect, it, afterEach, vi, beforeEach } from "vitest"
import { DetallePedido } from "./DetallePedido.tsx"
import { detalleService } from "../../service/detalleService.ts"

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom")
  return {
    ...actual,
    useParams: () => ({ id: "-3", nombreLocal: "Pizzas Ya" }),
    useNavigate: () => vi.fn()
  };
});

vi.mock("../../service/detalleService.ts", () => ({
  detalleService: {
    getPedidoById: vi.fn()
  }
}));


describe("DetallePedido", () => {

  const detalleMock = {
    id: -3,
    estado: "PENDIENTE",
    nombreLocal: "Pizzas Ya",
    valoracion: 2.9,
    distanciaALocal: 2.01,
    fecha: "24 de noviembre",
    fotoLocal: "img.png",
    items: 2,
    total: 18493.49,
    metodoPago: "TRANSFERENCIA",
    platos: [
      { id: 1, nombrePlato: "Pancho", cantidad: 1, costo: 3765.375, imagenPlato: "" },
      { id: 2, nombrePlato: "Hamburguesa", cantidad: 1, costo: 11775.375, imagenPlato: "" }
    ],
    costeEnvio: 2072.1,
    adicionalPorMedio: 1.05
  };

  beforeEach(() => {
    localStorage.setItem("username", "mariano");
    (detalleService.getPedidoById as any) = vi.fn().mockResolvedValue(detalleMock)
  });

  afterEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  });

  it("muestra el mensaje de cargando antes de obtener datos", () => {
    render(<DetallePedido />)
    expect(screen.getByText("Cargando pedido...")).to.exist;
  });

  it("llama correctamente al servicio con los parámetros", async () => {
    render(<DetallePedido />)

    await waitFor(() => {
      expect(detalleService.getPedidoById).toHaveBeenCalledWith(
        "mariano",
        -3,
        "Pizzas Ya"
      );
    });
  });

  it("carga los datos del pedido correctamente en pantalla", async () => {
    render(<DetallePedido />);

    await waitFor(() => {
      expect(screen.getByText("Pizzas Ya")).to.exist
    });

    expect(screen.getByText("2.9")).to.exist
    expect(screen.getByText("2.01 km")).to.exist

    expect(screen.getByText("Pancho")).to.exist
    expect(screen.getByText("Hamburguesa")).to.exist

    const subtotal = (3765.375 + 11775.375).toFixed(2)
    expect(screen.getByText(`$${subtotal}`)).to.exist

    const incremento = ((3765.375 + 11775.375 + 2072.1) * 0.05).toFixed(2)
    expect(screen.getByText(`$${incremento}`)).to.exist

    expect(screen.getByText("TRANSFERENCIA")).to.exist
    expect(screen.getByText(`$${detalleMock.total}`)).to.exist
  });

  it("navega hacia atrás al presionar el botón del header", async () => {
  const mockNavigate = vi.fn();

  vi.resetModules();

  vi.doMock("react-router-dom", async () => {
    const actual = await vi.importActual<any>("react-router-dom");
    return {
      ...actual,
      useParams: () => ({ id: "-3", nombreLocal: "Pizzas Ya" }),
      useNavigate: () => mockNavigate,
    }
  })

  const { DetallePedido: DetallePedidoWithMock } = await import(
    "./DetallePedido.tsx"
  )

  render(<DetallePedidoWithMock />)

  await waitFor(() => {
    expect(screen.getByText("Pizzas Ya")).toBeDefined()
  })

  const header = screen.getByTestId("header");
  const backButton = within(header).getByRole("button");

  fireEvent.click(backButton)

  expect(mockNavigate).toHaveBeenCalledWith(-1);
});

});
