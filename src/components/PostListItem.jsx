import React from 'react'

import {
    Button,
    ButtonGroup,
} from "react-bootstrap";

const PostListItem = ({ data  , deleteRecord}) => {

    const deleteHandler = (item) => {
        if(window.confirm(`Do you really want to Delete ${item.title} ?`)){
            deleteRecord(item.id)
        }
    }

    const records = data.map((el, index) =>
        <tr key={el.id}>
            <td>#{++index}</td>
            <td>{el.title}</td>
            {/* <td>{el.description}</td> */}
            <td>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="success">Edit</Button>
                    <Button variant="danger" onClick={()=>{deleteHandler(el)}}>Delete</Button>
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