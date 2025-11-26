import { X } from "phosphor-react";
import "./Article.css"
import "../../styles/cancel-button.css"
import { useContext } from "react";
import { Context } from "@context/PedidoContext";

type ArticleProps = {
    id?: number,
    name: string,
    ammount: number,
    unit_price: number,
    hasDelete: Boolean,
    onDelete?: () => void
}

export const Article = ({ id, name, ammount, unit_price, hasDelete = false, onDelete }: ArticleProps) => {
     const pedido = useContext(Context)
        const handleDelete = () => {
        if (id != null) {
            pedido?.removePlato(id);     
        }
        onDelete?.();                   
    };
    return (
        <article className="article-container">
            <div className="art-data">
                <h3>{name}</h3>
                <p>Cantidad: {ammount}</p>
                <p>Precio unitario: ${unit_price}</p>
            </div>
            <div className="art-total">
                <p className= "art-total art-pos">${(unit_price * ammount).toFixed(2)}</p>
                {hasDelete && <button className="cancel-button" onClick={handleDelete}><X size={32} /></button>}
            </div>
        </article>
    )
}