export const themedProperty = (object: any, keyOrValue: string | number) => {
  if (Object.prototype.hasOwnProperty.call(object, keyOrValue)) {
    return object[keyOrValue]
  }

  return keyOrValue
}
