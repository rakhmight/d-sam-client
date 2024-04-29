export function downloadAsFile(data:Blob, fileName:string){
    const url = window.URL || window.webkitURL
    const blobData = url.createObjectURL(data)
    const link = document.createElement('a')
    link.setAttribute("href", blobData)
    link.setAttribute("download", fileName)

    document.body.appendChild(link)
    link.click()
    link.remove()
  }