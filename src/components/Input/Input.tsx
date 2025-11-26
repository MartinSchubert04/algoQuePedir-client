import './Input.css'
import { useState } from 'react'
import { warning } from "@assets/index.ts"


type InputProps = {
  inputLabel : string, 
  inputType: string, 
  value: string, 
  onChange : (newValue: string) => void, 
  isEnabled? : boolean, 
  isRequired? : boolean,
  testId? :  string,
  onInputFun? : () => void,
  inputClass? : string,
  inputContainerClass? : string,
  step? : string,
  hasIcon? : boolean,
  iconPath? : string,
  iconPathSlash? : string,
  enableErrorMsg? : boolean,
  message? : string,
  isError?: boolean
}

export const Input = ({
  inputLabel,
  inputType,
  value, 
  onChange, 
  isEnabled = true,
  isRequired = false,
  testId = "input-comp",
  onInputFun = () => {},
  inputClass = "",
  inputContainerClass = "",
  step,
  hasIcon = false,
  iconPath = "",
  iconPathSlash = "",
  enableErrorMsg = false,
  message = "",
  isError = false
}: InputProps) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const inputId = inputLabel.toLowerCase().replace(/\s+/g, "-");
  const togglePassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className={`input-container ${inputContainerClass}`}>
      <input
        id={inputId}
        className={`input ${inputClass} ${isError ? 'input-error' : ''}`}
        type={showPassword ? "text" : inputType}
        autoComplete="off"
        placeholder=" "
        data-testid={testId}
        name="input"
        disabled={!isEnabled}
        required={isRequired}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onInput={onInputFun}
        step={inputType === "number" ? step : undefined}
      />
    <label className="input-label" htmlFor={inputId}>
      {inputLabel}
    </label>

    {hasIcon && (
      <img src={showPassword ? iconPathSlash : iconPath} className="input-icon-eye" alt="input-icon" onClick={togglePassword} />
      )
    }

    {enableErrorMsg && (
      <div className="card-alert-container">
        <img src={warning} className="input-icon-warning" alt="warning-img" />
        <span className="card-message input-alert">{message}</span>
      </div>
      )  
    }
    </div>
  )
}