import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPost } from "../state/postSlice";

const usePostDetails = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const {record, loading, error} = useSelector((state) => state.posts)
      useEffect(()=> {
        dispatch(fetchPost(id))
      }, [dispatch])

      return {record, loading, error}

};

export default usePostDetails