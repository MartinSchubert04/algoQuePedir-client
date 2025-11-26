import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from "react-router-dom"
import { Home } from "./pages/Home/Home.tsx"
import { AuthLayout } from "./components/Layouts/AuthLayout.tsx"
import { AppLayout } from "./components/Layouts/AppLayout.tsx"
import { Checkout } from "./pages/Checkout/Checkout.tsx"
import { ListaPedidos } from "@pages/Pedidos/ListaPedidos.tsx"
import { DetallePedido } from "@pages/Pedidos/DetallePedido.tsx"
import { RestaurantsToRate } from "./pages/Calificar/Calificar.tsx"
import { LocalPage } from "./pages/Local/Local"
import { Perfil } from "./pages/Perfil/Perfil.tsx"
import { Auth } from "./pages/Auth/Auth.tsx"
import { RatingPage } from "./pages/Calificar/CalificarId.tsx"
import { Context } from "@context/UserContext.tsx"
import { useContext } from "react"

export const ProtectedRoute = () => {
  const user = useContext(Context)
  const storedUser = localStorage.getItem("username")

  if (!user?.userId && !storedUser) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/Login" replace />} />

    <Route element={<AuthLayout />}>
      <Route path="/Login" element={<Auth />} />
      <Route path="/Register" element={<Auth />} />
    </Route>

    <Route element={<AppLayout />}>
      <Route element={<ProtectedRoute />}>
        <Route path="/Home" element={<Home />} />
        <Route path="/Calificar" element={<RestaurantsToRate />} />
        <Route path="/Calificar/:id/:nombreLocal" element={<RatingPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/Pedidos" element={<ListaPedidos />} />
        <Route path="/Pedidos/:id/:nombreLocal" element={<DetallePedido />} />
        <Route path="/Local/:id" element={<LocalPage />} />
        <Route path="/Perfil" element={<Perfil />} />
      </Route>
    </Route>
  </Routes>
)

export const AppRouter = () => (
  <Router>
    <AppRoutes />
  </Router>
)
