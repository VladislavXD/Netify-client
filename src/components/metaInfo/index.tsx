import React from 'react'
import { IconType } from 'react-icons';

type Props = {
    count: number;
    Icon: IconType
}

const MetaInfo = ({
    count,
    Icon,
}: Props) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      {count > 0 && (
        <p className="font-semibold text-default-400 text-l ">{count}</p>
      )}
      <p className="text-default-400 text-xl hover:text-2xl ease-in duration-100">
        <Icon />
      </p>
    </div>
  )
}

export default MetaInfo