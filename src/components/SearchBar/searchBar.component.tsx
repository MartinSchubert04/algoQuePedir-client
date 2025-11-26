import { Box, TextField, InputAdornment, Checkbox } from "@mui/material"
import { useState, useContext, useEffect } from "react"
import SearchIcon from "@mui/icons-material/Search"
import "./searchBar.css"
import type { LocalSearch } from "@domain/Local"
import { searchService } from "@service/Search.service"
import { showError } from "@utils/errorHandling"
import { useOnInit } from "@hooks/hooks"
import { Context } from "@context/UserContext"

type Props = {
  onResults: (locales: LocalSearch[]) => void
  onLoading: (loading: boolean) => void
}

export function SearchBar({ onResults, onLoading }: Props) {
  const [nearby, setNearby] = useState(false)
  const [query, setQuery] = useState("")
  const user = useContext(Context)
  const userID = user?.userId

  useOnInit(() => {
    handleSearch("", false)
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch(query, nearby)
    }, 500)

    return () => clearTimeout(timeout)
  }, [query, nearby])

  const handleSearch = async (newQuery?: string, newNeabyState?: boolean) => {
    const searchQuery = newQuery ?? query //  usa el valor nuevo o el actual
    const isNearby = newNeabyState ?? nearby

    onLoading(true)
    try {
      const locales = isNearby ? await searchService.search(userID!, searchQuery) : await searchService.search(null, searchQuery)

      onResults(locales)
    } catch (err) {
      showError(err)
      onResults([])
    } finally {
      onLoading(false)
    }
  }

  return (
    <div className="search-header-container">
      <header className="page-header-home">
        <p className="page-title">Delivery</p>
      </header>
      <TextField
        id="outlined-search"
        type="search"
        variant="outlined"
        placeholder="Buscá tu local para pedir..."
        onChange={(e) => {
          const value = e.target.value
          setQuery(value)
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            inputProps: {
              "data-testid": "input-search",
            },
            sx: { borderRadius: 3, height: 45 },
          },
        }}
      />

      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <input
          className="checkbox"
          type="checkbox"
          name="checked"
          checked={nearby}
          onChange={(e) => {
            const checked = e.target.checked
            setNearby(checked)
            handleSearch(undefined, checked)
          }}
        />

        <p className="checkbox-label">Buscar locales cercanos</p>
      </Box>
    </div>
  )
}
