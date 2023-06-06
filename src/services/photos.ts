import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage'
import { Photo } from '../types/Photo'
import { storage } from '../lib/firebase'
import { v4 as createId } from 'uuid'

export async function getAll() {
  const list: Photo[] = []

  const imagesFolder = ref(storage, 'images')
  const photoList = await listAll(imagesFolder)

  for (const i in photoList.items) {
    const photoUrl = await getDownloadURL(photoList.items[i])

    list.push({
      name: photoList.items[i].name,
      url: photoUrl,
    })
  }

  return list
}

export async function insert(file: File) {
  if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
    const randomName = createId()
    const newFile = ref(storage, `images/${randomName}`)
    const upload = await uploadBytes(newFile, file)

    const photoUrl = await getDownloadURL(upload.ref)

    return {
      name: upload.ref.name,
      url: photoUrl,
    } as Photo
  } else {
    return new Error('Tipo de arquivo não permitido.')
  }
}

export async function deletePhoto(name: string) {
  const photoRef = ref(storage, `images/${name}`)
  await deleteObject(photoRef)
}
