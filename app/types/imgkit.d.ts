export {}
declare global {
  export interface ImageKit {
    aiTags: null
    createdAt: Date
    customCoordinates: null
    customMetadata: CustomMetadata
    embeddedMetadata: EmbeddedMetadata
    fileID: string
    filePath: string
    fileType: FileType
    hasAlpha: boolean
    height: number
    isPrivateFile: boolean
    mime: MIME
    name: string
    size: number
    tags: Tag[] | null
    thumbnail: string
    type: Type
    updatedAt: Date
    url: string
    versionInfo: VersionInfo
    width: number
  }

  export interface CustomMetadata {}

  export interface EmbeddedMetadata {
    imageHeight?: number
    imageSize?: ImageSize
    imageWidth?: number
    megapixels?: number
    colorSpace?: string
    dateCreated?: Date
    dateTimeCreated?: Date
    exifVersion?: string
    resolutionUnit?: string
    xResolution?: number
    yResolution?: number
  }

  export enum ImageSize {
    The1036X1554 = '1036x1554',
    The1273X849 = '1273x849',
    The1500X1500 = '1500x1500',
    The1554X1036 = '1554x1036',
    The600X750 = '600x750',
    The910X1365 = '910x1365',
  }

  export enum FileType {
    Image = 'image',
  }

  export enum MIME {
    ImageJPEG = 'image/jpeg',
    ImageWebp = 'image/webp',
  }

  export enum Tag {
    Architecture = 'architecture',
    Astrophotographie = 'astrophotographie',
    Empty = '*',
    Mariage = 'mariage',
    Nature = 'nature',
    Paysage = 'paysage',
    Portrait = 'portrait',
  }

  export enum Type {
    File = 'file',
  }

  export interface VersionInfo {
    id: string
    name: Name
  }

  export enum Name {
    Version1 = 'Version 1',
  }
}
