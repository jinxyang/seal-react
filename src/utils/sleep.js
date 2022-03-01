const sleep = (delay = 0) =>
  delay
    ? new Promise((resolve) => setTimeout(resolve, delay))
    : Promise.resolve()

export default sleep
