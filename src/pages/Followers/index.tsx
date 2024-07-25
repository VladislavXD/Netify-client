import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrent } from '../../features/user/UserSlice'
import { Link } from 'react-router-dom';
import { Card, CardBody } from '@nextui-org/react';
import User from '../../components/User';

const Followers = () => {
  const currentUser = useSelector(selectCurrent);

  if(!currentUser) return null



  return currentUser.followers.length > 0 ?  (
    <div className="gap-5 flex flex-col">
      {
        currentUser.followers.map(user=> (
          <Link to={`/user/${user.follower.id}`} key={user.follower.id}>
              <Card>
                <CardBody className='block'>
                  <User
                    name={user.follower.name ?? ''}
                    avatarUrl={user.follower.avatarUrl ?? ''}
                    description={user.follower.email ?? ''}
                  />
                </CardBody>
              </Card>
          </Link>
        ))
      }
    </div>
  ) : (
      <h2>У вас нет подпичсиков</h2>
  )
}

export default Followers