'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'

export const runtime = 'edge' // 'nodejs' (default) | 'edge'

function getBaseURL() {
  if (typeof window !== 'undefined') {
    return ''
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}
const baseUrl = getBaseURL()
function useWaitQuery(props: { wait: number }) {
  const query = useSuspenseQuery({
    queryKey: ['wait', props.wait],
    queryFn: async () => {
      const path = `/api/wait?wait=${props.wait}`
      const url = baseUrl + path

      const res: string = await (
        await fetch(url, {
          cache: 'no-store',
        })
      ).json()
      return res
    },
  })

  return [query.data as string, query] as const
}

function MyComponent(props: { wait: number }) {
  const [data] = useWaitQuery(props)

  return <div>result: {data}</div>
}

export default function MyPage() {
  return (
    <>
      <Suspense fallback={<div>waiting 1000....</div>}>
        <MyComponent wait={1000} />
      </Suspense>
      <Suspense fallback={<div>waiting 2000....</div>}>
        <MyComponent wait={2000} />
      </Suspense>
      <Suspense fallback={<div>waiting 3000....</div>}>
        <MyComponent wait={3000} />
      </Suspense>
      <Suspense fallback={<div>waiting 4000....</div>}>
        <MyComponent wait={4000} />
      </Suspense>
      <Suspense fallback={<div>waiting 5000....</div>}>
        <MyComponent wait={5000} />
      </Suspense>
      <Suspense fallback={<div>waiting 6000....</div>}>
        <MyComponent wait={6000} />
      </Suspense>
      <Suspense fallback={<div>waiting 7000....</div>}>
        <MyComponent wait={7000} />
      </Suspense>

      <fieldset>
        <legend>
          combined <code>Suspense</code>-container
        </legend>
        <Suspense
          fallback={
            <>
              <div>waiting 8000....</div>
              <div>waiting 9000....</div>
              <div>waiting 10000....</div>
            </>
          }
        >
          <MyComponent wait={8000} />
          <MyComponent wait={9000} />
          <MyComponent wait={10000} />
        </Suspense>
      </fieldset>
    </>
  )
}
