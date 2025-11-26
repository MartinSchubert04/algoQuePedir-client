import { Outlet, useLocation } from 'react-router-dom';
import "../../styles/Main-container.css"
import "../../styles/global.css"

export const AuthLayout = () => {
  
  const location = useLocation();

  return (
    <main className="main-container container-full-vh">
      <Outlet key={location.pathname} />
    </main>
  )
}