import { useRouter } from 'next/router'
import { useState } from 'react'
import { gql } from '@apollo/client'
import { useMutation, useApolloClient } from '@apollo/client'
import { getErrorMessage } from '../lib/form'
import Field from '../components/field'

const SignInMutation = gql`
  mutation SignInMutation($username: String!, $password: String!) {
    signIn(input: { username: $username, password: $password }) {
      user {
        id
        username
        Name
      }
    }
  }
`

function SignIn() {
  const client = useApolloClient()
  const [signIn] = useMutation(SignInMutation)
  const [errorMsg, setErrorMsg] = useState()
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()

    const usernameElement = event.currentTarget.elements.username
    const passwordElement = event.currentTarget.elements.password

    try {
      await client.resetStore()
      const { data } = await signIn({
        variables: {
          username: usernameElement.value,
          password: passwordElement.value,
        },
      })
      console.log(data)
      if (data.signIn.user) {
        await router.push('/')
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error))
    }
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <h2 className="text-base">Tugas Ethical Hacking</h2>
      </div>
      <div className="flex w-fit flex-col">
        <form onSubmit={handleSubmit}>
          {errorMsg && (
            <div className=" bg-red-600 px-2 py-3 text-white">
              <p>{errorMsg}</p>
            </div>
          )}

          <Field
            name="username"
            type="username"
            autoComplete="username"
            required
            label="username"
          />
          <Field
            name="password"
            type="password"
            autoComplete="password"
            required
            label="Password"
          />
          <div className="mt-4 flex w-full justify-center">
            <button
              type="submit"
              className="mx-auto mt-4 w-40 rounded-full bg-blue-400 px-5 py-3 font-bold text-white shadow-xl"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
