import React, { Children } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Redirect } from 'react-router'

// Component to check if the user is authenticated, check his id/token
const IS_LOGGED_IN = gql`
    {
        me {
            id
        }
    }
`

interface Props {
    children?: React.ReactNode
}

export default function IsAuthenticated({children}: Props) {
    const { loading, error, data } = useQuery(IS_LOGGED_IN)
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    if(!data.me) {
        return <Redirect to={{pathname: "/landing"}} />
    }
    return <>{children}</>
}