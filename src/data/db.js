import { firebaseApp } from './firebaseApp'
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore'

export const getCategories = async () => {
  const db = getFirestore(firebaseApp)
  const categoriesRef = collection(db, 'categorias')
  const q = query(categoriesRef, orderBy('name'))

  try {
    const querySnapshot = await getDocs(q)
    const categories = []

    querySnapshot.forEach(doc => {
      categories.push({...doc.data(), id: doc.id})
    })
    
    return categories
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getItems = async (queries = []) => {
  const db = getFirestore(firebaseApp)
  let querySnapshot

  if (!queries.length) {
    querySnapshot = await getDocs(collection(db, 'productos'))
  
    return querySnapshot
  } else {
    const itemsRef = collection(db, 'productos')
    const queryArgs = [itemsRef]
    
    queries.forEach(_query => {
      queryArgs.push(where(..._query))
    })

    const q = query(...queryArgs)
    querySnapshot = await getDocs(q)
  
    return querySnapshot
  }
}

export const getAllItems = async () => {
  const db = getFirestore(firebaseApp)
  const querySnapshot = await getDocs(collection(db, 'productos'))
  
  return querySnapshot
}

export const getItemsByCategory = async category => {
  const db = getFirestore(firebaseApp)
  const itemsRef = collection(db, 'productos')
  const q = query(itemsRef, where('category', '==', category))
  const querySnapshot = await getDocs(q)

  return querySnapshot
}

export const getItemById = async id => {
  const db = getFirestore(firebaseApp)
  const itemRef = doc(db, 'productos', id)
  const snapshot = await getDoc(itemRef)

  return snapshot
}

export const addItem = async item => {
  const db = getFirestore(firebaseApp)

  try {
    const itemRef = await addDoc(collection(db, 'productos'), item)
    
    return itemRef.id
  } catch (error) {
    console.log(error)
  }

  return false
}

export const updateItem = async (id, data) => {
  const db = getFirestore(firebaseApp)

  try {
    await updateDoc(doc(db, 'productos', id), data)
  } catch (error) {
    console.log(error)
  }
}

export const getFormatedDate = date => {
  const dateObject = isNaN(date) ? new Date() : new Date(date)
  const dateIOString = dateObject.toISOString()
  
  return dateIOString.split('T')[0]
}