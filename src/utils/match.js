const regExp = {
  phone: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
}

const match = (type, value) => regExp[type]?.test?.(value) ?? false

export default match
