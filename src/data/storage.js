import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage'

export const getFileUrl = async file => {
  const fileUrl = await getDownloadURL(file)
  
  return fileUrl
}

export const getFilesList = async () => {
  const storage = getStorage()
  const list = await listAll(ref(storage))
  
  return list
}

export const storeFile = async file => {
  const storage = getStorage()
  const storageRef = ref(storage, file.name)

  uploadBytes(storageRef, file).then(() => {
    return true
  }).catch(() => {
    return false
  })
}

export const storeImage = async image => {
  const storage = getStorage()
  const storageRef = ref(storage, image.name)
  const snapshot = await uploadBytes(storageRef, image)
  const imgUrl = await getDownloadURL(snapshot.ref)

  return imgUrl || false
}