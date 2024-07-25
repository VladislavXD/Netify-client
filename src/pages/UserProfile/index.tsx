import { Button, Card, Image, useDisclosure } from "@nextui-org/react"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { resetUser, selectCurrent } from "../../features/user/UserSlice"
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi"
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from "../../app/services/followApi"
import GoBack from "../../components/GoBack"
import { BASE_URL } from "../../../constants"
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from "react-icons/md"
import { CiEdit } from "react-icons/ci"
import ProfileInfo from "../../components/ProfileInfo"
import { formatToClientDate } from "../../utils/formatToClientDate"
import CountInfo from "../../components/CountInfo"
import confetti from "canvas-confetti"
import EditProfile from "../../components/EditProfile"

const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useSelector(selectCurrent)
  const { data } = useGetUserByIdQuery(id ?? "")
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnFollowUserMutation()
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  const dispatch = useDispatch()

  useEffect(
    () => () => {
      dispatch(resetUser())
    },
    [],
  )

  if (!data) return null

  const handleclick = () => {}

  console.log(data.isFolow)
  const handleFollow = async () => {
    try {
      if (id) {
        if (data?.isFolow) {
          await unfollowUser(id).unwrap()
        } else {
          await followUser({ followingId: id }).unwrap()
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 0.35, y: 0.8 },
          })
        }


        await triggerGetUserByIdQuery(id)

        await triggerCurrentQuery()
      }
    } catch (err) {}
  }


  const handleClose = async()=> {
    try{
      if(id){
        await triggerGetUserByIdQuery(id);
        await triggerCurrentQuery();
        onClose()
      }
    }catch(err){
      console.error(err);
    }
  }
  return (
    <>
      <GoBack />
      <div className="flex items-center gap-4">
        <Card className="flex flex-col items-center text-center space-y-4 p-5 flex-2">
          <Image
            isBlurred
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.name}
            width={200}
            height={200}
            className="border-4 border-white"
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
          </div>
          {currentUser?.id !== id ? (
            <Button
              color={data.isFolow ? "default" : "primary"}
              variant="flat"
              disableRipple
              className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
              onClick={handleFollow}
              endContent={
                data.isFolow ? (
                  <MdOutlinePersonAddDisabled />
                ) : (
                  <MdOutlinePersonAddAlt1 />
                )
              }
            >
              {data.isFolow ? "Отписаться" : "Подписаться"}
            </Button>
          ) : (
            <Button onClick={()=> onOpen()}endContent={<CiEdit />}>Редактировать</Button>
          )}
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Почта" info={data.email} />
          <ProfileInfo title="Местоположение" info={data.location} />
          <ProfileInfo
            title="Дата Рождения"
            info={formatToClientDate(data.dateOfBirth)}
          />
          <ProfileInfo title="Обо мне" info={data.bio} />

          <div className="flex gap-2">
            <CountInfo count={data?.post?.length} title="Посты" />
            <CountInfo count={data.followers.length} title="Подписчики" />
            <CountInfo count={data.following.length} title="Подписки" />
          </div>
        </Card>
      </div>
      <EditProfile isOpen={isOpen} onClose={handleClose} user={data}/>
    </>
  )
}

export default UserProfile
