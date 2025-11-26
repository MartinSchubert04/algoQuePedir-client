import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from "@components/Header/Header.component"
import { Rating } from 'primereact/rating';
import { restaurantService } from "@service/CalificarService.ts";
import "@styles/global.css";
import "@styles/Button.css";
import "./Calificar.css"; 
import type { CalificacionDTO } from '@domain/Restaurant'
import { showSuccess, showError } from "@utils/errorHandling"


export const RatingPage = () => {
  const { nombreLocal,id } = useParams();
  const navigate = useNavigate();

  const [rating,setValue] =useState<number | null | undefined>(0); // 1-5

  const localName = `${nombreLocal}`; 
 

  const handleSubmit = (e:any) => {
    e.preventDefault();
    
    const rated = JSON.parse(localStorage.getItem("ratedLocals") || "[]");
    rated.push(Number(id));
    localStorage.setItem("ratedLocals", JSON.stringify(rated));
    if (rating === 0) {
      alert('Por favor, selecciona una calificación con estrellas.');
      return;
    }
    const calificacion: CalificacionDTO = {
    localId: Number(id),
    puntaje: rating,
    };


    try {
        restaurantService.calificarLocal(calificacion);
        showSuccess("Restaurante calificado!")
    } catch (error) {
        showError(error)
    }    navigate('/Home');
  };


  return (
    <div className='main-card-title '>
      <Header title="Calificar" />
        <main className="rating-content">
          <form onSubmit={handleSubmit}>
            <h1 className="main-question">
              ¿Cómo fue tu experiencia con {localName}?
            </h1>
            <Rating
                    className="custom-rating"
                    value={rating ?? 0}
                    onChange={(e) => setValue(e.value)}
                    cancel={false}
                  />
            <button
              type="submit"
              className="fixed-submit-button primary-button"
              disabled={rating === 0}
            >
              Enviar ({rating})
            </button>
          </form>
        </main>   
    </div>
  );
};