export const getUrlListStatus = (list, url) => {
  if (list === [] || list[0] === '') {
    return false
  }
  return !!list.filter((v) => url.includes(v)).length
}

export const getUrlActiveStatus = (activeSites, url) => {
  if (activeSites === []) {
    return false
  }
  return !!activeSites.map(v => v.url).filter((v) => v === url).length
}
