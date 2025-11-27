import { useState, useEffect } from "react";
import { TableRow, TableCell, Button, ButtonGroup } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CustomTableCell from "./CustomTableCell";

export default function RowOther({ item, onSubmit, onDelete, isOwner }) {
    const [isEdit, setIsEdit] = useState(false);
    const [row, setRow] = useState(item);

    useEffect(() => setRow(item), [item]);

    const handleChange = (evt) => {
        const { name, value, type, checked } = evt.target;
        setRow(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const validateEdit = () => {
        setIsEdit(false);
        onSubmit(row);
    };

    const cancelEdit = () => {
        setRow(item);
        setIsEdit(false);
    };

    return (
        <TableRow>
            <CustomTableCell onChange={handleChange} name="name" value={row.name} isEdit={isOwner && isEdit} />
            <CustomTableCell onChange={handleChange} name="comment" value={row.comment} isEdit={isOwner && isEdit} />
            {!isOwner && <CustomTableCell onChange={handleChange} name="done" value={row.done} isEdit={isEdit} />}
            {!isOwner && <CustomTableCell onChange={handleChange} name="doneComment" value={row.doneComment} isEdit={isEdit} />}
            <TableCell style={{ width: 120 }}>
                {isEdit ? (
                    <ButtonGroup>
                        <Button variant="contained" color="success" onClick={validateEdit}><CheckIcon /></Button>
                        <Button variant="contained" color="error" onClick={cancelEdit}><ClearIcon /></Button>
                    </ButtonGroup>
                ) : (
                    <ButtonGroup>
                        <Button variant="contained" onClick={() => setIsEdit(true)}><EditIcon /></Button>
                        {isOwner && <Button variant="contained" color="error" onClick={() => onDelete(row.id)}><DeleteIcon /></Button>}
                    </ButtonGroup>
                )}
            </TableCell>
        </TableRow>
    );
}
