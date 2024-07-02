import React, { useEffect } from 'react'
import usePostDetails from '../hook/use-post-details'
import Loading from '../components/Loading' 
import { useDispatch } from 'react-redux'


const Details = () => {
  const dispatch = useDispatch()
  const { record, loading, error } = usePostDetails()
  
  useEffect(()=>{
    return () => {
      dispatch({
        type: "posts/cleanRecord",
      })
    }
  },[dispatch])

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