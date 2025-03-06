import { useState, useEffect, useContext, useRef } from 'react'
import { ItemContext } from '../context/AppContext'
import { getFilesList, getFileUrl, storeImage } from '../data/storage'

export const useUploads = () => {
  const {item, itemUpdatedData, updateItemField} = useContext(ItemContext)
  const [files, setFiles] = useState([])
  const [fileFound, setFileFound] = useState(null)
  const [fileToBeStored, setFileToBeStored] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [fileSelectedUrl, setFileSelectedUrl] = useState(itemUpdatedData?.imgUrl || item?.imgUrl || '')
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdatable, setIsUpdatable] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const fileRef = useRef(null)

  useEffect(() => {
    if (!files.length) {
      getFilesList().then(async files => {
        for (const file of files.items) {
          const fileUrl = await getFileUrl(file)

          setFileFound(fileUrl)
        }
        
        setIsLoading(false)
      }).catch(error => {
        console.log(error)
        setIsLoading(false)
      })
    }

    return () => {
      setFileFound(null)
      setFiles([])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (fileFound) {
      setFiles(prevFiles => [...prevFiles, fileFound])
    }
  }, [fileFound])

  useEffect(() => {
    if (itemUpdatedData?.imgUrl) {
      setIsUpdating(false)
      setShowModal(false)
    }
  }, [itemUpdatedData])

  const isValidImgFile = _file => _file.type.includes('image') && _file.size < 2000000
  
  const handleSelectionChange = (currentTarget, fileUrl) => {
    for (const f of currentTarget.parentNode.children) {
      f.classList.remove('border-4')
    }

    currentTarget.classList.add('border-4')
    setFileSelectedUrl(fileUrl)
    setIsUpdatable(
      (!itemUpdatedData?.imgUrl && !item?.imgUrl) ||
      (itemUpdatedData?.imgUrl && itemUpdatedData.imgUrl !== fileUrl) ||
      (!itemUpdatedData?.imgUrl && item?.imgUrl && item.imgUrl !== fileUrl)
    )
  }
  
  const handleClick = () => {
    fileRef.current?.click()
  }

  const handleChange = e => {
    e.preventDefault()
    setErrorMessage('')
    
    const _file = e.dataTransfer?.files && e.dataTransfer.files[0]
      ? e.dataTransfer.files[0]
      : e.target?.files && e.target.files[0]
        ? e.target.files[0]
        : null

    if (_file && isValidImgFile(_file)) {
      setFileToBeStored(_file)
      setFileSelectedUrl('fileToBeStored')
      setIsUpdatable(true)
    } else {
      setErrorMessage('No fue posible adjuntar el archivo. El archivo debe ser una imagen y no debe pesar más de 2Mb. Por favor, inténtalo nuevamente.')
    }
  }

  const handleDragOver = e => {
    e.preventDefault()
    e.target.classList.add('text-gold')
    e.target.querySelector('svg')?.classList.add('rotate-180')
  }

  const handleDragLeave = e => {
    e.target.classList.remove('text-gold')
    e.target.querySelector('svg')?.classList.remove('rotate-180')
  }

  const handleSubmit = () => {
    if (fileSelectedUrl) {
      setIsUpdating(true)
      if (fileSelectedUrl === 'fileToBeStored') {
        storeImage(fileToBeStored).then(imgUrl => {
          updateItemField('imgUrl', imgUrl)
        })
      } else if (
        (!itemUpdatedData?.imgUrl && !item?.imgUrl) ||
        (!itemUpdatedData?.imgUrl && item?.imgUrl && item.imgUrl !== fileSelectedUrl) ||
        (itemUpdatedData?.imgUrl && itemUpdatedData.imgUrl !== fileSelectedUrl)
      ) {
        updateItemField('imgUrl', fileSelectedUrl)
      }
    }
  }

  return {
    files,
    isLoading,
    fileRef,
    fileToBeStored,
    errorMessage,
    fileSelectedUrl,
    handleSelectionChange,
    handleClick,
    handleChange,
    handleDragOver,
    handleDragLeave,
    handleSubmit,
    isUpdatable,
    isUpdating,
    showModal,
    setShowModal,
  }
}