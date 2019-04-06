export const secondToClock = (seconds) => {
  let date = new Date(null)
  date.setSeconds(seconds)
  const timeString = date.toISOString().substr(11, 8)
  return timeString
}