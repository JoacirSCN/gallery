import { FormEvent, useEffect, useState } from 'react'
import * as C from './styles'
import { deletePhoto, getAll, insert } from '../../services/photos'
import { Photo } from '../../types/Photo'
import { PhotoItem } from '../../components/PhotoItem'

export function Home() {
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    getPhotos()
  }, [])

  async function getPhotos() {
    setLoading(true)
    setPhotos(await getAll())
    setLoading(false)
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const file = formData.get('image') as File
    if (file && file.size > 0) {
      setUploading(true)
      const result = await insert(file)
      setUploading(false)

      if (result instanceof Error) {
        alert(`${result.name} - ${result.message}`)
      } else {
        const newPhotoList = [...photos]
        newPhotoList.push(result)
        setPhotos(newPhotoList)
      }
    }
  }

  async function handleDeleteClick(name: string) {
    await deletePhoto(name)
    getPhotos()
  }

  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de Fotos</C.Header>

        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Enviar" />
          {uploading && 'Enviando...'}
        </C.UploadForm>

        {loading && (
          <C.ScreenWarning>
            <div className="emoji">✋</div>
            <div>Loading</div>
          </C.ScreenWarning>
        )}

        {!loading && photos.length > 0 && (
          <C.PhotoList>
            {photos.map((item, index) => (
              <PhotoItem
                key={index}
                url={item.url}
                name={item.name}
                onDelete={handleDeleteClick}
              />
            ))}
          </C.PhotoList>
        )}

        {!loading && photos.length === 0 && (
          <C.ScreenWarning>
            <div className="emoji">✋</div>
            <div>Não há fotos cadastradas</div>
          </C.ScreenWarning>
        )}
      </C.Area>
    </C.Container>
  )
}
