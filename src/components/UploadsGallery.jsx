/* eslint-disable react/prop-types */
export default function UploadsGallery({context}) {
  const {
    files,
    isLoading,
    fileToBeStored,
    fileSelectedUrl,
    handleSelectionChange,
  } = context
  
  if (isLoading) return <p>Cargando...</p>
  if (!files || !files.length) return <p className="py-4 px-6">No se encontraron archivos.</p>

  return (
    <div className='flex flex-wrap mb-4'>
      {files &&
      <ul className='flex flex-wrap'>
        {fileToBeStored &&
        <li
          className={`h-fit basis-1/4 ${'fileToBeStored' === fileSelectedUrl && 'border-4'}`}
          key='fileToBeStored'
          onClick={e => handleSelectionChange(e.currentTarget, 'fileToBeStored')}
        >
          <img src={URL.createObjectURL(fileToBeStored)} alt='Archivo recientemente seleccionado' />
        </li>}
        {files.map((fileUrl, k) => (
        <li
          className={`h-fit basis-1/4 ${fileUrl === fileSelectedUrl && 'border-4'}`}
          key={k}
          onClick={e => handleSelectionChange(e.currentTarget, fileUrl)}
        >
          <img src={fileUrl} alt='Archivo' />
        </li>))}
      </ul>}
    </div>
  )
}