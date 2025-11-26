import "./Ingredient.css"
import "../../styles/cancel-button.css"
import {X} from "phosphor-react"

type IngredientType = {
    name: string,
    onDelete: (e: React.MouseEvent, word?: string) => void
}

export const Ingredient = ({name, onDelete}: IngredientType) => {
    return(
        <div className="ingredient-container" data-testid={`ingredient-${name}`}>
            <p className="ing-name">{name}</p>
            <button className="cancel-button" onClick={onDelete}><X size={32} /></button>
        </div>
    )
}