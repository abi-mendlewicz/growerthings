/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { ItemContext } from './AppContext'
import { RiTailwindCssFill } from 'react-icons/ri'
import { BsDroplet } from 'react-icons/bs'
import { CiSun } from 'react-icons/ci'
import { LiaCannabisSolid } from 'react-icons/lia'
import { LuHandMetal } from 'react-icons/lu'

export default function ItemContextProvider({item, children}) {
  const [itemUpdatedData, setItemUpdatedData] = useState({})
  const [updateEnabled, setUpdateEnabled] = useState(false)

  useEffect(() => {
    setUpdateEnabled(Object.keys(itemUpdatedData).length > 0)
  }, [itemUpdatedData])

  const updateItemField = (field, value) => {
    setItemUpdatedData(prevData => ({...prevData, [field]: value}))
  }

  const removeItemField = field => {
    setItemUpdatedData(prevData => {
      // eslint-disable-next-line no-unused-vars
      const {[field]: omited, ...cleanData} = prevData
       
      return cleanData
    })
  }

  const abailableIcons = [RiTailwindCssFill, BsDroplet, CiSun, LiaCannabisSolid, LuHandMetal]
  const abailableIconsRef = ['RiTailwindCssFill', 'BsDroplet', 'CiSun', 'LiaCannabisSolid', 'LuHandMetal']

  const printIcon = (iconRef, size=24) => {
    const Icon = abailableIcons[abailableIconsRef.findIndex(_iconRef => _iconRef === iconRef)]
    
    return <Icon size={size} />
  }

  return (
    <ItemContext.Provider value={{
      item,
      itemUpdatedData,
      setItemUpdatedData,
      updateEnabled,
      updateItemField,
      removeItemField,
      abailableIcons,
      printIcon,
    }}>
      {children}
    </ItemContext.Provider>
  )
}