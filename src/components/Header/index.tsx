import React, { useContext } from "react"
import { ThemeContext } from "../theme-provider"
import {
  NavbarBrand,
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectIsAuthenticated } from "../../features/user/UserSlice"
import { useNavigate } from "react-router-dom"
import { CiLogout } from "react-icons/ci"

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = ()=>{
    dispatch(logout())
    localStorage.removeItem('token');
    navigate('/auth')
  }
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Network Social</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem 
        className="lg:flex text-3xl cursor-pointer"
        onClick={()=> toggleTheme()}>
          {theme === "light" ? <FaRegMoon /> : <LuSunMedium />}
        </NavbarItem>
        <NavbarItem>
          {
            isAuthenticated && (
              <Button
                color="default"
                variant="flat"
                className="gap-2"
                onClick={handleLogout}
              >
              <CiLogout/><p>Выйти</p>
              </Button>
            )
          }
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
