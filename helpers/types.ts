export type GalleryViewMode = 'grid' | 'stream'

export type Photo = {
  filename: string
  title?: string
  description?: string
  year?: string
}

export type Gallery = {
  description: string
  photos: Photo[]
}

export type GalleryData = {
  [key: string]: Gallery
}
