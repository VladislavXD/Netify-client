import React from 'react'
import Button from '../Button';
import { Link } from 'react-router-dom';
type Props = {
    children: React.ReactNode;
    icon: JSX.Element;
    href: string
}

const NavButton = ({children, icon, href}:Props) => {
  return (
    <Button className='flex justify-start text-x1' icon={icon}>
        <Link to={ href }>
            {children}
        </Link>
    </Button>
  )
}

export default NavButton