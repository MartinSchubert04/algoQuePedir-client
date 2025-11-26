import { olla, ojo, ojotachado, warning } from "@assets/index.ts"
import "@styles/Card.css"
import "@styles/global.css"
import "@styles/Main-container.css"
import { Input } from "@components/Input/Input.tsx"
import { AuthValidation } from "../../utils/auth.ts"
import { useNavigate } from "react-router-dom"

export const Auth = () => {
  const {
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
  } = AuthValidation()

  const navigate = useNavigate()

  return (
    <section className="card auth">
      <header className="card-header">
        <div className="card-header-top">
          <img src={olla} className="card-page-logo" alt="" />
          <span className="main-card-title-auth card-title-login">Algo que pedir</span>
        </div>
        <span className="card-subtitle-auth">{modoRegistro ? "Crea tu cuenta" : "Inicia sesión"}</span>
      </header>

      <form className="input-form">
        <Input testId="input-usuario" inputLabel="Usuario" inputType="text" value={userName} onChange={setUserName} onInputFun={() => borraError()}></Input>

        <Input
          testId="input-password"
          inputLabel="Contraseña"
          inputType="password"
          value={userPass}
          onChange={setUserPass}
          onInputFun={() => borraError()}
          hasIcon={true}
          iconPath={ojo}
          iconPathSlash={ojotachado}
        ></Input>

        {modoRegistro && (
          <Input
            testId="input-confirm-password"
            inputLabel="Confirmar contraseña"
            inputType="password"
            value={userPassConfirm}
            onChange={setUserPassConfirm}
            onInputFun={() => borraError()}
            hasIcon={true}
            iconPath={ojo}
            iconPathSlash={ojotachado}
            isError={confirmPassError}
          ></Input>
        )}

        {enableErrorMsg && (
          <div className="card-alert-container" data-testid="error-msg">
            <img src={warning} className="input-icon-warning" alt="warning-img" />
            <span className="card-message input-alert">{message}</span>
          </div>
        )}

        <button className="card-btn" type="button" onClick={checkAuth} data-testid="btn-submit">
          {modoRegistro ? "Registrarse" : "Iniciar sesión"}
        </button>
      </form>

      <span className="card-message">
        {modoRegistro ? (
          <div>
            ¿Ya tienes una cuenta?{" "}
            <a role="button" data-testid="link-goto-login" onClick={() => navigate("/Login")}>
              Inicia sesión
            </a>
          </div>
        ) : (
          <div>
            ¿No tienes cuenta?{" "}
            <a role="button" data-testid="link-goto-register" onClick={() => navigate("/Register")}>
              Registrate
            </a>
          </div>
        )}
      </span>
    </section>
  )
}
