export const getUrlListStatus = (list, url) => {
  // console.log('list:', list)
  // console.log('url:', url)
  if (list === []) {
    return false
  }
  return !!list.filter((v) => url.includes(v)).length
}

export const getUrlActiveStatus = (activeSites, url) => {
  // console.log('activeSites:', activeSites)
  // console.log('url:', url)
  if (activeSites === []) {
    return false
  }
  return !!activeSites.map(v => v.url).filter((v) => v === url).length
}
