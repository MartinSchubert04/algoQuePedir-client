import "./Restaurant.css"
import { MapPin, Star, Motorcycle } from "@phosphor-icons/react"
import { X } from "phosphor-react"
import "../../styles/cancel-button.css"
import type { RestaurantProfileDTO } from "@domain/Restaurant"

type RestaurantType = {
    imgPath: string,
    name: string,
    puntuacion: number,
    distance: number,
    deliveryType: string,
    hasDelete?: boolean,
    onDelete?: (e: React.MouseEvent, restaurant: RestaurantProfileDTO) => void
}

export const Restaurant = ({ imgPath, name, puntuacion, distance, deliveryType, hasDelete = false, onDelete }: RestaurantType) => {
    const restData: RestaurantProfileDTO = {
        nombreLocal: name,
        imgPath: imgPath,
        distancia: distance,
        promedio: puntuacion,
        tipoDelivery: deliveryType
    }

    return (
        <div className="restaurant-container">
            <div className="img-container">
                <img src={imgPath} alt="restaurant-img" />
            </div>

            <div className="restaurant-data">
                <h3 className="restaurant-name">{name}</h3>

                <div className="pedido-detalle">
                    <span className="pedido-icono">
                        <Star size={16} weight="fill" />
                        {puntuacion.toFixed(1)}
                    </span>
                    <span className="pedido-icono">
                        <MapPin size={16} weight="bold" />
                        {distance} km
                    </span>
                    <span className="pedido-icono">
                        <Motorcycle size={18} weight="bold" />
                        Envío {deliveryType}
                    </span>
                </div>
            </div>
            {hasDelete && onDelete && (
                <button className="cancel-button" onClick={(e: React.MouseEvent) => onDelete(e, restData)}>
                    <X size={32} />
                </button>
            )}
        </div>
    )
}
