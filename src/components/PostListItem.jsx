import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {
    Button,
    ButtonGroup,
} from "react-bootstrap";

const PostListItem = ({ data, deleteRecord }) => {

    const navigate = useNavigate()

    const deleteHandler = (item) => {
        if (window.confirm(`Do you really want to Delete ${item.title} ?`)) {
            deleteRecord(item.id)
        }
    }

    const records = data.map((el, index) =>
        <tr key={el.id}>
            <td>#{++index}</td>
            <td>
                <Link to={`post/${el.id}`}>
                    {el.title}
                </Link>
            </td>
            {/* <td>{el.description}</td> */}
            <td>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="success" onClick={() => navigate(`post/${el.id}/edit`)}>Edit</Button>
                    <Button variant="danger" onClick={() => { deleteHandler(el) }}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    )

    return (
        <>
            {records}
        </>
    )
}

export default PostListItem