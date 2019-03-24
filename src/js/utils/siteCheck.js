export const getUrlListStatus = (list, url) => {
  console.log('list:', list)
  console.log('url:', url)
  if (list.trim() === '') {
    return false
  }
  return !!list.trim().split('\n').filter((v) => url.includes(v)).length
}

export const getUrlActiveStatus = (activeSites, url) => {
  console.log('activeSites:', activeSites)
  console.log('url:', url)
  return !!activeSites.map(v => v.url).filter((v) => v === url).length
}
