function createPlaceholderImage(
  width: number,
  height: number,
  label: string,
  background = '#141414',
) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none"><rect width="${width}" height="${height}" fill="${background}"/><text x="50%" y="50%" fill="#9A9A9A" font-family="Space Grotesk, Arial, sans-serif" font-size="20" letter-spacing="6" text-anchor="middle" dominant-baseline="middle">[ ${label} ]</text></svg>`

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export default createPlaceholderImage
