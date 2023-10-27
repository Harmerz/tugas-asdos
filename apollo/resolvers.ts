import { createUser, findUser, validatePassword } from '../lib/user'
import { setLoginSession, getLoginSession } from '../lib/auth'
import { removeTokenCookie } from '../lib/auth-cookies'
import { GraphQLError } from 'graphql'

export const resolvers = {
  Query: {
    async viewer(_root, _args, context, _info) {
      try {
        const session = await getLoginSession(context.req)

        if (session) {
          return findUser({ username: session.username })
        }
      } catch (error) {
        throw new GraphQLError('Authentication token is invalid, please log in', {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        })
      }
    },
  },
  Mutation: {
    async signUp(_parent, args, _context, _info) {
      const user = await createUser(args.input)
      return { user }
    },
    async signIn(_parent, args, context, _info) {
      const user = await findUser({ username: args.input.username })
      console.log(user)
      if (user && (await validatePassword(user, args.input.password))) {
        const session = {
          id: user.id,
          username: user.username,
        }

        await setLoginSession(context.res, session)

        return { user }
      }

      throw new GraphQLError('Invalid username and password combination')
    },
    async signOut(_parent, _args, context, _info) {
      removeTokenCookie(context.res)
      return true
    },
  },
}
