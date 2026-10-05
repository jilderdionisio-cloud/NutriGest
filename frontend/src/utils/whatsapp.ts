export const DEFAULT_WHATSAPP_NUMBER = '51928975091'

export const openWhatsApp = (message, number = DEFAULT_WHATSAPP_NUMBER) => {
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
