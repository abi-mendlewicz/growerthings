/* eslint-disable react/prop-types */
import { CgCloseO } from 'react-icons/cg'

export default function ModalNotification({title, content, Icon = null, color, setShowModal, isUploading}) {
  return (
    <>
      <div
        className='modal-back'
        onClick={() => setShowModal(false)}
      ></div>
      <div className='modal-note-container'>
        <div className='relative transform overflow-hidden text-left shadow-xl transition-all'>
          <div className='relative'>
            <div className={`flex justify-between items-center px-4 bg-${color} text-black`}>
              <h3 className='flex items-center text-2xl font-semibold' id='modal-title'>
                {Icon && <Icon className='inline-block me-4' size={24} />}
                {title}
              </h3>
              {!isUploading &&
              <CgCloseO
                className='ms-4 cursor-pointer'
                size={24}
                onClick={() => setShowModal(false)}
              />}
            </div>
            <div className='py-4 px-6'>
              {content}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}