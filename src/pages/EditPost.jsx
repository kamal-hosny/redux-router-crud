import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import usePostDetails from "../hook/use-post-details";
import { editPost, cleanRecord } from "../state/postSlice";
import withGuard from "../util/withGuard";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postSchema } from "../util/validationSchema";

const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { record, loading, error } = usePostDetails();

  useEffect(() => {
    return () => {
      dispatch(cleanRecord());
    };
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: record?.title || "",
      description: record?.description || "",
    },
    enableReinitialize: true,
    validationSchema: postSchema,
    onSubmit: (values) => {
      dispatch(editPost({
        id: record.id,
        title: values.title,
        description: values.description
      }))
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => console.error("Failed to edit post:", err)); // Handle error
    },
  });

  return (
    <Loading loading={loading} error={error}>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.title && formik.touched.title ? (
            <div style={{ color: "red" }}>{formik.errors.title}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.description && formik.touched.description ? (
            <div style={{ color: "red" }}>{formik.errors.description}</div>
          ) : null}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Loading>
  );
};

export default withGuard(EditPost);
