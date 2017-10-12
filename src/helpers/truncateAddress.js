export let truncateAddress = (address, digits) => {
  if (address.length <= digits)
    return address

  return address.substring(0, digits) + '...'
}
