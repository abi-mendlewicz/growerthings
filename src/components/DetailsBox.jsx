/* eslint-disable react/prop-types */
import { IoInformationCircleOutline } from 'react-icons/io5'

export default function DetailsBox({bgColor = 'green', color = 'black', Icon = IoInformationCircleOutline, children}) {
  return (
    <div className='mx-2 bg-black/30 border'>
      <div className={`flex justify-end pe-1 bg-${bgColor}`}>
        <Icon color={color} />
      </div>
      <div className='py-4 px-4'>
        {children}
      </div>
    </div>
  )
}