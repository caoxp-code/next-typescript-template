import React from 'react'
import { NextApiResponse } from 'next'

function Error({ statusCode }: { statusCode: number }): React.ReactNode {
  return <p>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</p>
}

Error.getInitialProps = ({ res, err }: { res: NextApiResponse; err: { statusCode: number } }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
