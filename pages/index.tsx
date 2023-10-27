import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'
import { io } from 'socket.io-client'
import { IoLogOutOutline } from 'react-icons/io5'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      username
    }
  }
`

const Index = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(ViewerQuery)
  const viewer = data?.viewer
  const shouldRedirect = !(loading || error || viewer)

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/signin')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRedirect])

  if (error) {
    return <p>{error.message}</p>
  }

  if (viewer) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="h-12 w-full text-center text-xl">
          You're signed in as <span className="font-bold text-blue-500">{viewer.username}</span>
        </div>
        <button
          key="Logout"
          type="button"
          className=" flex w-[90px] flex-row items-center gap-2 text-red-600 hover:text-red-400"
        >
          <IoLogOutOutline className="h-5 w-5 text-xl" /> Log Out
        </button>
      </div>
    )
  }

  return <p>Loading...</p>
}

export default Index
