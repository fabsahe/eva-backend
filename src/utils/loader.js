// Utilidad para animacion de carga en consola

const loading = (
  text = '',
  chars = ['⠙', '⠘', '⠰', '⠴', '⠤', '⠦', '⠆', '⠃', '⠋', '⠉'],
  delay = 100
) => {
  let x = 0

  return setInterval(function () {
    process.stdout.write('\r' + chars[x++])
    x = x % chars.length
  }, delay)
}

const stopLoading = (timerID) => {
  clearInterval(timerID)
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
}

module.exports = { loading, stopLoading }
