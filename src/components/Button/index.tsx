import { Button as NextButton } from "@nextui-org/react"
import React from "react"

type Props = {
  children: React.ReactNode;
  icon?: JSX.Element;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidht?: boolean;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
}

const Button = ({
  children,
  className,
  color,
  icon,
  type,
  fullWidht,
}: Props) => {
  return <NextButton 
  startContent={icon} 
  size="lg" 
  color={color}
  variant='light'
  className={className}
  type={type}
  fullWidth={fullWidht}
  
  >{children}</NextButton>
}

export default Button
