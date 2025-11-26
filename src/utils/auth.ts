import { authService } from "@service/authService"
import { useState, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getErrorMessage, showSuccess } from "./errorHandling"
import { Context } from "@context/UserContext"

export const AuthValidation = () => {
  const [userName, setUserName] = useState("")
  const [userPass, setUserPass] = useState("")
  const [userPassConfirm, setUserPassConfirm] = useState("")
  const [message, setMessage] = useState("")
  const [enableErrorMsg, setEnableErrorMsg] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const user = useContext(Context)!

  const modoRegistro = location.pathname === "/Register"

  const confirmPassError = modoRegistro && enableErrorMsg && message === "Las contraseñas no coinciden"

  const conditionsRegister = () => {
    return userPass.length > 0 && userPassConfirm.length > 0 && userName.length > 0
  }

  const conditionsLogin = () => {
    return userPass.length > 0 && userName.length > 0
  }

  const equalPass = () => {
    return userPass == userPassConfirm
  }

  const isValidUsername = () => {
    const regex = /^[a-zA-Z0-9]{3,}$/
    return regex.test(userName)
  }

  const checkRegister = () => {
    if (!conditionsRegister()) {
      setEnableErrorMsg(true)
      setMessage("No puede haber campos vacios")
      return false
    }
    if (!isValidUsername()) {
      setEnableErrorMsg(true)
      setMessage("El usuario debe contar con almenos 3 caracteres, sin espacios ni simbolos")
      return false
    }
    if (!equalPass()) {
      setEnableErrorMsg(true)
      setMessage("Las contraseñas no coinciden")
      return false
    }

    setEnableErrorMsg(false)
    return true
  }

  const checkLogin = () => {
    if (!conditionsLogin()) {
      setEnableErrorMsg(true)
      setMessage("Los campos son obligatorios")
      return false
    }

    setEnableErrorMsg(false)
    return true
  }

  const checkAuth = async () => {
    if (modoRegistro) {
      if (checkRegister()) {
        await register()
      }
    } else {
      if (checkLogin()) {
        await login()
      }
    }
  }

  const borraError = () => {
    setEnableErrorMsg(false)
    setMessage("")
  }

  const register = async () => {
    try {
      await authService.register(userName, userPass, userPassConfirm)
      navigate("/Login")
      showSuccess("Registro exitoso!")
    } catch (error: unknown) {
      setEnableErrorMsg(true)
      setMessage(getErrorMessage(error))
    }
  }

  const login = async () => {
    try {
      localStorage.setItem("username", userName) //agrego localstorage
      const data = await authService.login(userName, userPass)
      user.useLogin(data.userId, data.username)
      navigate("/Home")
      showSuccess("Sesión iniciada correctamente")
    } catch (error: unknown) {
      setEnableErrorMsg(true)
      setMessage(getErrorMessage(error))
    }
  }

  return {
    userName,
    userPass,
    userPassConfirm,
    message,
    enableErrorMsg,
    modoRegistro,
    confirmPassError,
    setUserName,
    setUserPass,
    setUserPassConfirm,
    checkAuth,
    borraError,
  }
}
