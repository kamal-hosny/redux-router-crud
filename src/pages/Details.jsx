import React from 'react'
import usePostDetails from '../hook/use-post-details'
import Loading from '../components/Loading' 

const Details = () => {
  const { record, loading, error } = usePostDetails()
  console.log(record);
  return (
    <div>
      <Loading loading={loading} error={error}>
        <p>Title: {record?.title}</p>
        <p>Description: {record?.description}</p>
      </Loading>
    </div>
  )
}

export default Details