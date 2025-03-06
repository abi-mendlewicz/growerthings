import { useUpdateItemStatus } from '../hooks/forms'

export default function ItemInputStatus() {
  const [status, handleStatusSwitch] = useUpdateItemStatus()
  const containerClass = 'flex items-center w-8 h-4 border rounded-full cursor-pointer'

  return (
    <div className='flex justify-end items-center mb-4'>
      <div className='mb-0 me-4'><strong>Estado: </strong>{status}</div>
      <div
        className={status === 'borrador' ? containerClass : `${containerClass} justify-end`}
        onClick={handleStatusSwitch}
      >
        <span className='inline-block bg-green border w-4 h-4 rounded-full' />
        <input
          type='hidden'
          value={status}
        />
      </div>
    </div>
  )
}