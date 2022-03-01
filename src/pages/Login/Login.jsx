import React from 'react'

import { useGlobalState } from 'contexts'
import { Form, Password, Button, Window, Flex } from 'components'
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
    ['user', ['username', ['password', { component: Password }]]],
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
    <Window>
      <Flex
        justify="center"
        align="center"
        height="100%"
        padding={{ xs: 1, sm: 0 }}
      >
        <Flex.Item flex="1" maxWidth={{ xs: 300, sm: 250 }}>
          <Form {...formProps}>
            <Flex gap={0.5} flex={1} direction={{ xs: 'column', sm: 'row' }}>
              <Flex.Item flex={2}>
                <Button type="submit" block disabled={state.loading}>
                  提交
                </Button>
              </Flex.Item>
              <Flex.Item>
                <Button type="reset" block onClick={reset}>
                  重置
                </Button>
              </Flex.Item>
            </Flex>
          </Form>
        </Flex.Item>
      </Flex>
    </Window>
  )
}

export default Login
