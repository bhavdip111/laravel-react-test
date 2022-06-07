export const display = (seconds) => {
  const format = (val) => `0${Math.floor(val)}`.slice(-2)
  const minutes = seconds / 60

  return [minutes, seconds % 60].map(format).join(':')
}
