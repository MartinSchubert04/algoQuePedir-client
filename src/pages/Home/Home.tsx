import { useState } from "react"
import { CircularProgress } from "@mui/material"
import "./Home.css"
import { SearchBar } from "@components/SearchBar/searchBar.component"
import LocalGrid from "@components/Grid/Local/LocalGrid.component"
import type { LocalSearch } from "@domain/Local"
import { LogoutButton } from "@components/Buttons/LogoutButton/LogoutButton"

export const Home = () => {
  const [locales, setLocales] = useState<LocalSearch[]>([])
  const [loading, setLoading] = useState(false) // ahora el estado es mutable

  return (
    <div className="busqueda-body" data-testid="home-test">
      <div className="home-logout-container">
        <LogoutButton />
      </div>
      <SearchBar onResults={setLocales} onLoading={setLoading} />
      {
        <>
          {loading ? (
            <div className="loading-wheel">
              <CircularProgress color="inherit" />
            </div>
          ) : (
            <>{locales.length > 0 ? <LocalGrid locales={locales} /> : <p className="text-not-found">No se encontraron locales para la búsqueda</p>}</>
          )}
        </>
      }
    </div>
  )
}
