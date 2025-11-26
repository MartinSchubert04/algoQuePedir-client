import { useState } from "react";
import { Calificar } from "../../components/Calificar/Calificar.tsx";
import type { CalificacionesResponse } from "@domain/Restaurant.tsx";
import { restaurantService } from "@service/CalificarService.ts";
import "./Calificar.css";
import { Context as UserContext } from "@context/UserContext"
import { showError } from "@utils/errorHandling"
import { useContext  } from "react"


export const RestaurantsToRate = () => {
  const [restaurantes, setRestaurantes] = useState<CalificacionesResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userContext = useContext(UserContext)
  if (!userContext) {
      showError("No se encontro el usuario, inicie sesion")
      throw new Error("No se encontro el usuario")
  }
  if (restaurantes.length === 0 && !loading && !error) {
    //Number(userContext)
    setLoading(true);
    restaurantService
      .getLocalesCalificar(userContext.userId!!)
      .then((data) => {
        const rated = JSON.parse(localStorage.getItem("ratedLocals") || "[]");
        const filtrados = data.filter((loc) => !rated.includes(loc.id));
        setRestaurantes(filtrados);
      })
      .catch((err) => {
        console.error(err);
        setError("Error al cargar los restaurantes");
      })
      .finally(() => setLoading(false));
  }


  return (
    <div>
      <h2 className="main-card-title ">Restaurantes a calificar</h2>
      {loading && <p>...</p>}
      {error && <p>{error}</p>}
      <div >
        {restaurantes.map((r) => (
          <Calificar key={r.id} local={r} />
        ))}
      </div>
    </div>
  );
};
