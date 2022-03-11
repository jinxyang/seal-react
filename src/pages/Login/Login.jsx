import React from 'react'

import { useGlobalState } from 'contexts'
import { Form, Password, Button, Viewport, Flex } from 'components'
import { useForm, useToast } from 'hooks'

const service = (data = {}) => {
  return {
    method: 'post',
    url: '/login',
    data,
  }
}

const Login = () => {
  const { login } = useGlobalState()[1]
  const setToast = useToast()

  const [formProps, { reset, state }] = useForm(
    service,
    [
      'user',
      [
        ['username', { value: 'admin' }],
        ['password', { component: Password, value: '123456' }],
      ],
    ],
    {
      onSubmitted: ({ code, data, message }) => {
        if (!code) {
          login(data.token)
          setToast(message, 'success')
        }
      },
    },
  )

  return (
    <Viewport>
      <Flex
        cross="center"
        main="center"
        styles={{
          height: '100%',
          padding: 1,
        }}
      >
        <Form
          {...formProps}
          styles={{
            flex: 1,
            maxWidth: { sm: 300 },
          }}
        >
          <Flex
            direction={{ xs: 'column', sm: 'row' }}
            cross={{ sm: 'flex-end' }}
          >
            <Flex.Item flex="2">
              <Button block disabled={state.loading} type="submit">
                提交
              </Button>
            </Flex.Item>
            <Flex.Item flex="1">
              <Button block onClick={reset} type="reset">
                重置
              </Button>
            </Flex.Item>
          </Flex>
        </Form>
      </Flex>
    </Viewport>
  )
}

export default Login
