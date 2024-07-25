import React from "react"

type Props = {
  title: string
  info?: string
}

const ProfileInfo = ({ title, info }: Props) => {
  if (!info) {
    return null
  }
  return (
    <p className="font-semibold">
      <span className="text-gray-500 mr-2">{title}</span>
      {info}
    </p>
  )
}

export default ProfileInfo
