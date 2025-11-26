import { ArrowFatLineRight } from "phosphor-react"
import "./preference.css"

type PreferenceType = {
    name: string,
    onClick: (e: React.MouseEvent) => void
}

export const Preference = ({name, onClick}: PreferenceType) => {
    return (
        <div className="preference-container">
            <p className="pref-text"><b>{name}</b></p>
            <button onClick={onClick} className="goto-preference-button"><ArrowFatLineRight size={32} /></button>
        </div>
    )
}