import { createFields } from 'libs'

import global from './global'
import user from './user'

const fields = createFields(
  global,
  { user },
  {
    inputComponentMap: {
      string: 'Input',
      password: 'Password',
      number: 'Input',
    },
  },
)

export default fields
