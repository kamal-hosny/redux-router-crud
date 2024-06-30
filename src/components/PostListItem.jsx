import React from 'react'

import {
    Button,
    ButtonGroup,
} from "react-bootstrap";

const PostListItem = ({ data}) => {

    const records = data.map((el, index) =>
        <tr key={el.id}>
            <td>#{++index}</td>
            <td>{el.title}</td>
            {/* <td>{el.description}</td> */}
            <td>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="success">Edit</Button>
                    <Button variant="danger">Delete</Button>
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