import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const WithGuard = ({children}) => {
    //  const navigate =  useNavigate()
    const { isLoggedin } = useSelector((state) => state.auth)
    const newComponent = React.createElement(children, {title: "sad"})

    //  useEffect(()=>{
    //     if(!isLoggedin){
    //         navigate("/")
    //     }
    //  }, [isLoggedin, navigate])
  return isLoggedin ? children : <div>please log in first:</div>

}

export default WithGuard