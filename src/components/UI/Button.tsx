import React, { FC } from "react"

const Button: FC = (
  props: React.JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLButtonElement> &
    React.ButtonHTMLAttributes<HTMLButtonElement>
) => <button {...props}>{props.children}</button>

export default Button
