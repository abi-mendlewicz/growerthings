import { useState, useEffect } from 'react'
import { getCategories, getItems, getItemById } from '../data/db'

export const useFetchCategories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories().then(dbCategories => {
      setCategories(dbCategories || [])
    }).catch(error => {
      console.log(error)
    })
  }, [])

  return [categories, setCategories]
}

export const useFetchItems = (filterBy, value, user) => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (filterBy == 'category') {
      const queryFilters = []
      
      if (value) {
        queryFilters.push(['category', '==', value])
      }

      if (!user) {
        queryFilters.push(['status', '==', 'público'])
      }

      const getQuery = getItems(queryFilters)
  
      getQuery.then(querySnapshot => {
        setData(querySnapshot.docs.map(item => {
          const data = item.data()
          
          return {id: item.id, ...data}
        }))
        setIsLoading(false)
      }).catch(error => {
        console.log(error)
        setIsLoading(false)
      })
    } else if (filterBy == 'id') {
      getItemById(value).then(snapshot => {
        const data = snapshot.data()
        setData({id: snapshot.id, ...data})
        setIsLoading(false)
      }).catch(error => {
        console.log(error)
        setIsLoading(false)
      })
    }

    return () => {
      setIsLoading(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, user])

  return {data, isLoading}
}