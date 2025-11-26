import "./App.css"
import { AppRouter } from "./routes"
import { ToastContainer } from "@components/Toast/ToastContainer"
import { UserProvider } from "@context/UserProvider"
import { PedidoProvider } from "@context/PedidoProvider"

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <PedidoProvider>
          <AppRouter />
          <ToastContainer />
        </PedidoProvider>
      </UserProvider>
    </div>
  )
}

export default App
