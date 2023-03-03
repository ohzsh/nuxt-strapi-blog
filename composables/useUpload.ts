/**
 * 预览上传的临时文件
 * @param newObject
 * @returns
 */
export const useShowImgUrl = (newObject: Blob | MediaSource) => URL?.createObjectURL(newObject)

/**
 * strapi 上传
 * @param files FileList
 * @returns
 */
export const upload = async (files: FileList | null) => {
  try {
    const url = useStrapiUrl()
    const token = useStrapiToken()
    const formData = new FormData()
    Array.from(files as FileList).forEach((file: any) => {
      formData.append('files', file, file.name)
    })
    const res = await fetch(`${url}/upload`, {
      method: 'post',
      body: formData,
      headers: {
        authorization: `Bearer ${token?.value}`,
      },
    })
    return res.json()
  }
  catch (error) {
    return error
  }
}
