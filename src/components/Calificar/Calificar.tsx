import type { restaurant } from "@domain/Restaurant";
import { useNavigate } from "react-router-dom";
import "@styles/global.css";
import "@styles/Main-container.css";
import "@styles/Card.css";
import "@styles/Card-element.css";
import "@styles/Button.css";

export const Calificar = ({  local }: { local: restaurant }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/calificar/${local.id}/${local.nombreLocal}`);
  };

  return (
    <article className="card-menu">
      <div className="card-menu-left img">
            <img className="card-menu-left"
              src={local.imagen}
              alt={local.nombreLocal}
            />
            <div className="card-menu-left">
              <div className="card-text">
                <h3 className="card-text">{local.nombreLocal}</h3>
                <p className="text-sub">
                  {local.promedio} ✰ • {local.distancia} min • $$
                </p>
              </div>
            </div>
      </div>
      <button className="card-menu-precio secundary-button" onClick={handleClick}>Calificar</button>
    </article>
  );
};

