import { createFields } from 'lib'

import global from './global'
import user from './user'

const fields = createFields(
  global,
  { user },
  {
    inputComponentMap: { string: 'Input', password: 'Password' },
  },
)

export default fields
