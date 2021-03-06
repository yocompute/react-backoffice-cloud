import React, {useState} from "react";

import {
    Avatar,
    TableCell,
    IconButton
} from "@material-ui/core";

import EditIcon from '@material-ui/icons/Edit';

const ListCell = ({ col, row, onEditRow }) => {
    // const [data, setData] = useState(row ? row[col.field] : null);
    const data = row ? row[col.field] : null;

    const handleEdit = () => {
        onEditRow(row);
    }

    if (col.field !== 'actions' && !data) {
        return <TableCell key={col.field} />
    } else {
        if (col.type === 'image') {
            return (
                <TableCell key={col.field}>
                    <Avatar
                        variant="square"
                        alt="user"
                    // src={`${data.length > 0 ? data[0].url : "#"}`}
                    >
                    </Avatar>
                </TableCell>
            )
        } else if (col.type === 'picture') {
            return <TableCell key={col.field}>
                <Avatar
                    variant="square"
                    alt="user"
                    src={data && data.length > 0 ? data[0].url : "/"}
                >
                </Avatar>
            </TableCell>
        } else if (col.field === 'actions') {
            return <TableCell key={col.field} onClick={handleEdit}>
                <IconButton aria-label="edit">
                    <EditIcon />
                </IconButton>
            </TableCell>
        } else if (col.type === 'object') {
            return <TableCell key={col.field}>
                {data[col.property]}
            </TableCell>
        } else {
            return <TableCell key={col.field}>
                {data ? data : ''}
            </TableCell>
        }
    }
}

export default ListCell;