import React from 'react'
import { useCurrentQuery } from '../../app/services/userApi'
import { Spinner } from '@nextui-org/react'

// Пока идет запрос отображать прелоад

const AuthGuard = ({children}: {children: JSX.Element}) => {
    const {isLoading} = useCurrentQuery()


    if(isLoading){
        return <Spinner className='w-[100%] h-[100%] flex align'/>
    }
  return children
}

export default AuthGuard