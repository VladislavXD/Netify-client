import { User as NextUser } from '@nextui-org/react';
import React from 'react'
import { BASE_URL } from '../../../constants';

type Props = {
    name: string;
    avatarUrl: string;
    description?: string;
    className?: string;

}

const User = ({
    name= '',
    avatarUrl = '',
    description = '',
    className = ''

}: Props) => {
  return (
    <NextUser
        name={name}
        className={className}
        description={description}
        avatarProps={{
            src: `${BASE_URL}${avatarUrl}`
        }}
    />

  )
}

export default User