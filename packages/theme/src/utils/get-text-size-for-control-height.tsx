export const getTextSizeForControlHeight = (height: number) => {
  if (height <= 24) return 300
  if (height <= 28) return 300
  if (height <= 32) return 300
  if (height <= 36) return 400
  if (height <= 40) return 400

  return 500
}

export const getBorderRadiusForControlHeight = (height: number) => {
  if (height <= 40) return 3

  return 4
}
