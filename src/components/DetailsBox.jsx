/* eslint-disable react/prop-types */
import { IoInformationCircleOutline } from 'react-icons/io5'

export default function DetailsBox({bgColor = 'green', color = 'black', Icon = IoInformationCircleOutline, children}) {
  return (
    <div className='mx-2 max-w-[40%] bg-black/30 border'>
      <div className={`flex justify-end pe-1 bg-${bgColor}`}>
        <Icon color={color} />
      </div>
      <div className='py-1 sm:py-4 px-2 sm:px-4 h-[calc(100%_-_1rem)] overflow-scroll'>
        {children}
      </div>
    </div>
  )
}