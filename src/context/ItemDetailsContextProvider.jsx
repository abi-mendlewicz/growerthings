/* eslint-disable react/prop-types */
import { useItemDetailsForm } from '../hooks/forms'
import { ItemDetailsContext } from './AppContext'

export default function ItemDetailsContextProvider({children}) {
  const itemDetailsFormData = useItemDetailsForm()

  return (
    <ItemDetailsContext.Provider value={{
      itemDetailsFormData,
    }}>
      {children}
    </ItemDetailsContext.Provider>
  )
}