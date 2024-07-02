import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import usePostDetails from "../hook/use-post-details";
import { editPost, cleanRecord } from "../state/postSlice";
import withGuard from "../util/withGuard";

const EditPost = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { record, loading, error } = usePostDetails();

  const [title, setTitle ] = useState("")
  const [description, setDescription ] = useState("")

  useEffect(()=>{
    if(record){
      setTitle(record?.title)
      setDescription(record?.description)
    }
  },[record])

  useEffect(() =>{
    return () => {
      dispatch({
        type: "posts/cleanRecord",
      })
    }
  }, [dispatch])

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(editPost({
      id: record.id,
      title: title,
      description: description
    }))
    .unwrap()
    .then(() => navigate("/"))
  }

  return (
    // <Loading loading={loading} error={error}>
      <Form onSubmit={formHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Loading loading={loading} error={error}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Loading>
      </Form>
    // </Loading>
  );
};

export default withGuard(EditPost);
