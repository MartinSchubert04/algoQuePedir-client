import { Outlet } from 'react-router-dom';
import { NavBar } from '@components/NavBar/NavBar'

export const AppLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}