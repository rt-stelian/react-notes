import React, { FC } from "react"
import { ButtonProps } from "../../interfaces/PropsInterfaces"

const Button: FC<ButtonProps> = (props) => (
  <button {...props}>{props.children}</button>
)

export default Button
