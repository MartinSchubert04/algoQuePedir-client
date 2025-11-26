import { API_URL } from "./config"
import axios from "axios"
import { type LocalSearch } from "@domain/Local"

class SearchService {
  async search(id: number | null, nombreLocal: string) {
    const res = await axios.get<LocalSearch[]>(`${API_URL}/search`, {
      params: {
        id: id ?? undefined, // si es null, no se manda
        nombreLocal,
      },
    })
    return res.data // .map((localJson: any) => Local.fromJson(localJson))
  }
}

export const searchService = new SearchService()
