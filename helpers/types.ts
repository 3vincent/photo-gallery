export type GalleryViewMode = 'grid' | 'stream'

export type Photo = {
  filename: string
  title?: string
  description?: string
  year?: string
}

export type Gallery = {
  [key: string]: {
    description: string
    images: Photo[]
  }
}
