import React from 'react'

const Loading = ({loading, error, children}) => {
  return (
    <>
       {loading ? (
                    <p> "loading..."</p>
            ) :error ? (
                    <p> "error form a server"</p>
            ) : children}
    </>
  )
}

export default Loading