const joinPath = (prefix, ...paths) => {
  return paths
    .reduce((fullPath, path) => `${fullPath}/${path}`, prefix)
    .replace(/(?<!:)\/\/?\//g, '/')
}

export default joinPath
