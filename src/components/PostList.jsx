import {
  Table,
} from "react-bootstrap";
import PostListItem from "./PostListItem";
import { memo } from "react";

const PostList = ({ data, deleteRecord, isLoggedin }) => {

  

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: "70%" }}>Title</th>
          <th style={{ width: "10%" }}></th>
        </tr>
      </thead>
      <tbody>
       <PostListItem data={data} deleteRecord={deleteRecord} isLoggedin={isLoggedin} />
      </tbody>
    </Table>
  )
}

export default memo(PostList)