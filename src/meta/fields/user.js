const model = {
  username: {
    type: 'string',
    label: '用户名',
  },
  password: {
    type: 'password',
    label: '密码',
  },
  avatar: {
    type: 'string',
    label: '头像',
  },
  age: {
    type: 'number',
    label: '年龄',
  },
  phone: {
    type: 'string',
    label: '手机',
  },
}

const inputs = {
  username: {
    placeholder: '2至8个字',
    rules: [
      { type: 'string', required: true, message: '请输入用户名' },
      { length: [2, 8], message: '2至8个字' },
    ],
  },
  password: {
    placeholder: '至少6个字',
    rules: [
      { type: 'string', required: true, message: '请输入密码' },
      { length: 6, message: '至少6个字' },
    ],
  },
}

export default {
  model,
  inputs,
}
