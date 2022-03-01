const model = {
  name: {
    type: 'string',
    label: '名称',
  },
}

const inputs = {
  name: {
    placeholder: '2至8个字',
    rules: [
      { type: 'string', required: true, message: '请输入名称' },
      { length: [2, 8], message: '2至8个字' },
    ],
  },
}

export default {
  model,
  inputs,
}
