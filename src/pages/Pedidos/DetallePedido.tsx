import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Article } from "../../components/Article/Article";
import { Restaurant } from "../../components/Restaurant/Restaurant";
import { Header } from "../../components/Header/Header.component";
import { Resumen } from "@components/Resumen/Resumen";
import { detalleService } from "../../service/detalleService";
import type { PedidoDTO } from "@domain/Pedido";
import "./detallePedido.css";

export const DetallePedido = () => {
  const { id, nombreLocal } = useParams<{ id: string, nombreLocal: string }>(); 
  const [pedido, setPedido] = useState<PedidoDTO | null>(null);

  const username = localStorage.getItem("username") ?? "";

  useEffect(() => {
    if (!username || !id) return;

    detalleService.getPedidoById(username, Number(id), nombreLocal!!)
      .then(setPedido)
      .catch(console.error);
  }, [username, id, nombreLocal]);

  if (!pedido) return <p>Cargando pedido...</p>;
  const subtotal = pedido.platos.reduce((acc, p) => acc + p.costo * p.cantidad, 0);

  return (
    <div className="detalle-pedido-container">
      <div className="pedido-title-button-pedido">
        <Header title="Detalle del pedido" />
      </div>

      <div className="page-content-body">
        <div className="page-content-wrapper">
          <div className="pedido-container">
            <h3>Restaurante</h3>
            <Restaurant
              imgPath={pedido.fotoLocal}
              name={pedido.nombreLocal}
              puntuacion={pedido.valoracion}
              distance={pedido.distanciaALocal}
              deliveryType="Pago"
            />

            <div className="detalle-divider"></div>

            <section className="articles-container">
              <h3>Artículos</h3>
              {pedido.platos.map((article, index) => (
                <Article
                  key={`${article.id}-${index}`}
                  name={article.nombrePlato}
                  ammount={article.cantidad}
                  unit_price={article.costo}
                  hasDelete={false}
                />
              ))}
            </section>

            <div className="detalle-divider"></div>
            <div className="resumen-container">
              <Resumen
                subtotal={subtotal}
                recargo={pedido.adicionalPorMedio}
                tarifa={pedido.costeEnvio}
                metodoPago={pedido.metodoPago}
                total={pedido.total}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
