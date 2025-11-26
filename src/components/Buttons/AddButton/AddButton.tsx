import {Plus} from "phosphor-react"
import "./addButton.css"

type addButtonType = {
    action?: (e: React.MouseEvent) => void
}

export const AddButton = ({action}: addButtonType) => {
    return(
        <div className="add-button-container">
            <button type="button" onClick={action}><Plus size={32} /></button>
        </div>
    )
}