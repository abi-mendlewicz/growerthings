import { useState, useContext, useEffect, useRef } from 'react'
import { ItemContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useFetchCategories } from './items'
import { addItem, updateItem } from '../data/db'

export const useAddItemForm = () => {
  const [title, setTitle] = useState('')
  const [newItem, setNewItem] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()
  const titleRef = useRef(null)
  const isValidTitle = title.trim() && title.length < 65

  useEffect(() => {
    if (showModal) {
      titleRef.current.focus()
    } else {
      setTitle('')
    }
  }, [showModal])
  
  useEffect(() => {
    if (newItem) {
      addItem({
        ...newItem,
        date: Date.now(),
        status: 'borrador',
      }).then(itemId => {
        setIsUploading(false)
        setNewItem(null)
        
        if (itemId) {
          setShowModal(false)
          navigate(`/producto/${itemId}`)
        } else {
          setErrorMessage('Algo salió mal. No se pudo agregar el producto. Por favor, inténtalo nuevamente.')
        }
      }).catch(error => {
        console.log(error)
        setIsUploading(false)
        setErrorMessage('Algo salió mal. No se pudo agregar el producto. Por favor, inténtalo nuevamente.')
        setNewItem(null)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newItem])

  const handleSubmit = e => {
    e.preventDefault()

    if (isValidTitle) {
      setIsUploading(true)
      setNewItem({
        title: title.trim(),
      })
    }
  }

  return {
    title,
    setTitle,
    titleRef,
    isValidTitle,
    handleSubmit,
    isUploading,
    errorMessage,
    showModal,
    setShowModal,
  }
}

export const useUpdateItemStatus = () => {
  const {item, itemUpdatedData, updateItemField, removeItemField} = useContext(ItemContext)
  const [status, setStatus] = useState(itemUpdatedData?.status || item?.status || 'borrador')
  const [wasModifiedStatus, setWasModifiedStatus] = useState(false)

  const isValidStatus = () => (status === 'borrador' || status === 'público')

  useEffect(() => {
    if (wasModifiedStatus) {
      if (isValidStatus()) {
        if (
          (!itemUpdatedData?.status && !item?.status) ||
          ((itemUpdatedData?.status && itemUpdatedData.status !== status) && (!item?.status || item.status !== status)) ||
          (item?.status && item.status !== status)
        ) {
          updateItemField('status', status)
        } else if ('status' in itemUpdatedData) {
          removeItemField('status')
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const handleStatusSwitch = () => {
    setWasModifiedStatus(true)
    setStatus(prevStatus => prevStatus === 'borrador' ? 'público' : 'borrador')
  }

  return [status, handleStatusSwitch]
}

export const useUpdateItemForm = () => {
  const {item, itemUpdatedData, updateEnabled, updateItemField, removeItemField} = useContext(ItemContext)
  const [sku, setSku] = useState(itemUpdatedData?.sku || item?.sku || '')
  const [wasModifiedSku, setWasModifiedSku] = useState(false)
  const [title, setTitle] = useState(itemUpdatedData?.title || item.title || '')
  const [wasModifiedTitle, setWasModifiedTitle] = useState(false)
  const [date, setDate] = useState(itemUpdatedData?.date || item.date || Date.now())
  const [wasModifiedDate, setWasModifiedDate] = useState(false)
  const [industrialUse, setIndustrialUse] = useState(itemUpdatedData?.industrialUse || item?.industrialUse || false)
  const [highlight, setHighlight] = useState(itemUpdatedData?.highlight || item?.highlight || '')
  const [wasModifiedHighlight, setWasModifiedHighlight] = useState(false)
  const [brand, setBrand] = useState(itemUpdatedData?.brand || item?.brand || '')
  const [wasModifiedBrand, setWasModifiedBrand] = useState(false)
  const [imgUrl, setImgUrl] = useState(itemUpdatedData?.imgUrl || item?.imgUrl || '')
  const [description, setDescription] = useState(itemUpdatedData?.description || item?.description || '')
  const [wasModifiedDescription, setWasModifiedDescription] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [updateItemMessage, setUpdateItemMessage] = useState(null)

  const isValidSku = () => sku.length < 65
  const isValidTitle = () => title.trim() && title.length < 65
  const isValidDate = () => date.toString() !== 'Invalid Date' && date < Date.parse(new Date())
  const isValidIndustrialUse = () => typeof industrialUse === 'boolean'
  const isValidHighlight = () => highlight.length < 65
  const isValidBrand = () => brand.length < 65
  const isValidDescription = () => description.length < 641

  useEffect(() => {
    if (wasModifiedSku) {
      if (isValidSku()) {
        if (
          sku && (
          (!itemUpdatedData?.sku && !item?.sku) ||
          ((itemUpdatedData?.sku && itemUpdatedData.sku !== sku) && (!item?.sku || item.sku !== sku)) ||
          (item?.sku && item.sku !== sku))
        ) {
          updateItemField('sku', sku)
        } else if ('sku' in itemUpdatedData) {
          removeItemField('sku')
        }
      }
    } else {
      setWasModifiedSku(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sku])

  useEffect(() => {
    if (wasModifiedTitle) {
      if (isValidTitle()) {
        if (
          (!itemUpdatedData?.title && !item?.title) ||
          ((itemUpdatedData?.title && itemUpdatedData.title !== title) && (!item?.title || item.title !== title)) ||
          (item?.title && item.title !== title)
        ) {
          updateItemField('title', title)
        } else if ('title' in itemUpdatedData) {
          removeItemField('title')
        }
      }
    } else {
      setWasModifiedTitle(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title])

  useEffect(() => {
    if (wasModifiedDate) {
      if (isValidDate()) {
        if (
          (!itemUpdatedData?.date && !item?.date) ||
          ((itemUpdatedData?.date && itemUpdatedData.date !== date) && (!item?.date || item.date !== date)) ||
          (item?.date && item.date !== date)
        ) {
          updateItemField('date', date)
        } else if ('date' in itemUpdatedData) {
          removeItemField('date')
        }
      }
    } else {
      setWasModifiedDate(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  useEffect(() => {
    if (isValidIndustrialUse()) {
      if (
        (!itemUpdatedData?.industrialUse && !item?.industrialUse && industrialUse) ||
        ((itemUpdatedData?.industrialUse && itemUpdatedData.industrialUse !== industrialUse) && (!item?.industrialUse || item.industrialUse !== industrialUse)) ||
        (item?.industrialUse && item.industrialUse !== industrialUse)
      ) {
        updateItemField('industrialUse', industrialUse)
      } else if ('industrialUse' in itemUpdatedData) {
        removeItemField('industrialUse')
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [industrialUse])

  useEffect(() => {
    if (wasModifiedHighlight) {
      if (isValidHighlight()) {
        if (
          highlight && (
          (!itemUpdatedData?.highlight && !item?.highlight) ||
          ((itemUpdatedData?.highlight && itemUpdatedData.highlight !== highlight) && (!item?.highlight || item.highlight !== highlight)) ||
          (item?.highlight && item.highlight !== highlight))
        ) {
          updateItemField('highlight', highlight)
        } else if ('highlight' in itemUpdatedData) {
          removeItemField('highlight')
        }
      }
    } else {
      setWasModifiedHighlight(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlight])

  useEffect(() => {
    if (wasModifiedBrand) {
      if (isValidBrand()) {
        if (
          brand && (
          (!itemUpdatedData?.brand && !item?.brand) ||
          ((itemUpdatedData?.brand && itemUpdatedData.brand !== brand) && (!item?.brand || item.brand !== brand)) ||
          (item?.brand && item.brand !== brand))
        ) {
          updateItemField('brand', brand)
        } else if ('brand' in itemUpdatedData) {
          removeItemField('brand')
        }
      }
    } else {
      setWasModifiedBrand(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand])

  useEffect(() => {
    if (itemUpdatedData?.imgUrl) {
      setImgUrl(itemUpdatedData.imgUrl)
    }
  }, [itemUpdatedData])
  
  useEffect(() => {
    if (wasModifiedDescription) {
      if (isValidDescription()) {
        if (
          description && (
          (!itemUpdatedData?.description && !item?.description) ||
          ((itemUpdatedData?.description && itemUpdatedData.description !== description) && (!item?.description || item.description !== description)) ||
          (item?.description && item.description !== description))
        ) {
          updateItemField('description', description)
        } else if ('description' in itemUpdatedData) {
          removeItemField('description')
        }
      }
    } else {
      setWasModifiedDescription(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description])

  useEffect(() => {
    if (updateItemMessage) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    }
  }, [updateItemMessage])

  const isValidForm = () => {
    return (
      isValidSku() &&
      isValidTitle() &&
      isValidDate() &&
      isValidIndustrialUse() &&
      isValidHighlight() &&
      isValidBrand() &&
      isValidDescription()
    )
  }

  const submitData = () => {
    updateItem(
      item.id,
      itemUpdatedData
    ).then(() => {
      setIsUploading(false)
      setUpdateItemMessage({
        type: 'success',
        text: 'El producto se actualizó correctamente.',
      })
    }).catch(() => {
      setIsUploading(false)
      setUpdateItemMessage({
        type: 'fail',
        text: 'No fue posible guardar los cambios. Por favor, inténtalo nuevamente.',
      })
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (updateEnabled && isValidForm()) {
      setIsUploading(true)
      submitData(itemUpdatedData)
    }
  }

  return {
    skuInput: [sku, setSku, isValidSku],
    titleInput: [title, setTitle, isValidTitle],
    dateInput: [date, setDate, isValidDate],
    industrialUseInput: [industrialUse, setIndustrialUse, isValidIndustrialUse],
    highlightInput: [highlight, setHighlight, isValidHighlight],
    brandInput: [brand, setBrand, isValidBrand],
    imgUrl,
    descriptionInput: [description, setDescription, isValidDescription],
    updateEnabled,
    isValidForm,
    handleSubmit,
    isUploading,
    updateItemMessage,
    setUpdateItemMessage,
  }
}

export const useItemCategoryForm = () => {
  const {item, itemUpdatedData, updateItemField, removeItemField} = useContext(ItemContext)
  const [categories] = useFetchCategories()
  const [category, setCategory] = useState(itemUpdatedData?.category || item?.category || '')
  const [wasModifiedCategory, setWasModifiedCategory] = useState(false)

  const isValidCategory = () => {
    const _category = categories.find(c => c.slug === category)

    return _category ? true : false
  }

  useEffect(() => {
    if (!category && categories.length) {
      const _categoryObj = categories.find(c => c?.default) || categories[0]

      if (_categoryObj) {
        setWasModifiedCategory(true)
        setCategory(_categoryObj.name)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories])

  useEffect(() => {
    if (wasModifiedCategory) {
      if (isValidCategory()) {
        if (
          (!itemUpdatedData?.category && !item?.category) ||
          ((itemUpdatedData?.category && itemUpdatedData.category !== category) && (!item?.category || item.category !== category)) ||
          (item?.category && item.category !== category)
        ) {
          updateItemField('category', category)
        } else if ('category' in itemUpdatedData) {
          removeItemField('category')
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  return {
    category,
    setCategory,
    categories,
    wasModifiedCategory,
    setWasModifiedCategory,
    isValidCategory,
  }
}

export const useItemDetailsForm = () => {
  const {item, itemUpdatedData, updateItemField} = useContext(ItemContext)
  const [details, setDetails] = useState(itemUpdatedData?.details || item?.details || [])
  const [detailTitle, setDetailTitle] = useState('')
  const [detailDescription, setDetailDescription] = useState('')
  const [formWasValidated, setFormWasValidated] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const isValidDetailTitle = detailTitle.trim().length < 65
  const isValidDetailDescription = detailDescription.trim().length < 241
  const isValidForm = () => (detailTitle && isValidDetailTitle) || (detailDescription && isValidDetailDescription)

  useEffect(() => {
    if (details.length || formWasValidated) {
      const detailsStr = JSON.stringify(details)

      if (
        (!('details' in itemUpdatedData) && !('details' in item)) ||
        ('details' in itemUpdatedData && JSON.stringify(itemUpdatedData.details !== detailsStr)) ||
        'details' in item && JSON.stringify(item.details) !== detailsStr
      ) {
        updateItemField('details', details)
        setDetailTitle('')
        setDetailDescription('')
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details])

  const handleSubmit = e => {
    e.preventDefault()

    if (isValidForm) {
      setDetails([
        ...details,
        {
          title: detailTitle,
          description: detailDescription,
        }
      ])
      setShowModal(false)
    } else if (!formWasValidated) {
      setFormWasValidated(true)
    }
  }

  return {
    details,
    setDetails,
    detailTitle,
    setDetailTitle,
    isValidDetailTitle,
    detailDescription,
    setDetailDescription,
    isValidDetailDescription,
    isValidForm,
    formWasValidated,
    handleSubmit,
    showModal,
    setShowModal,
  }
}

export const useItemSideDescriptionForm = () => {
  const {item, itemUpdatedData, updateItemField} = useContext(ItemContext)
  const [sideDescription, setSideDescription] = useState(itemUpdatedData?.sideDescription || item?.sideDescription || {})
  const [variations, setVariations] = useState(sideDescription?.variations?.options || [])
  const [variationSelected, setVariationSelected] = useState(sideDescription?.variations?.selected || 0)
  const [icons, setIcons] = useState(sideDescription?.icons || [])
  const [description, setDescription] = useState(sideDescription?.description || '')
  const [formWasValidated, setFormWasValidated] = useState(false)
  const [showItemInputSideDescriptionModal, setShowItemInputSideDescriptionModal] = useState(false)

  useEffect(() => {
    if (Object.keys(sideDescription).length) {
      const sideDescriptionStr = JSON.stringify(sideDescription)

      if (
        (!('sideDescription' in itemUpdatedData) && !('sideDescription' in item)) ||
        ('sideDescription' in itemUpdatedData && JSON.stringify(itemUpdatedData.sideDescription !== sideDescriptionStr)) ||
        ('sideDescription' in item && JSON.stringify(item.sideDescription) !== sideDescriptionStr)
      ) {
        updateItemField('sideDescription', sideDescription)
      }

      setShowItemInputSideDescriptionModal(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sideDescription])

  const handleSubmit = e => {
    e.preventDefault()
    const sideDescriptionUpdated = {}

    if (variations.length) {
      sideDescriptionUpdated.variations = {
        options: variations,
        selected: variationSelected
      }
    }

    if (icons.length) {
      sideDescriptionUpdated.icons = icons
    }

    if (description) {
      sideDescriptionUpdated.description = description
    }

    if (Object.keys(sideDescriptionUpdated).length) {
      setSideDescription(sideDescriptionUpdated)
    } else if (!formWasValidated) {
      setFormWasValidated(true)
    }
  }

  return {
    sideDescription,
    setSideDescription,
    showItemInputSideDescriptionModal,
    setShowItemInputSideDescriptionModal,
    variations,
    setVariations,
    variationSelected,
    setVariationSelected,
    icons,
    setIcons,
    description,
    setDescription,
    formWasValidated,
    handleSubmit,
  }
}