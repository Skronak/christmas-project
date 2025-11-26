import React from 'react'
import {useState} from 'react'
import {Button, ButtonGroup, IconButton, TableCell, TableRow, TextField} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

export default function Row({item, onDelete, onEdit}) {
    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState(item.name);
    const [comment, setComment] = useState(item.comment);

    const handleChange = (name, value) => {
        setItem({
                ...item,
                [name]: value
            }
        )
    }

    const validerEdit = () => {
        toggleEdit();
        onEdit(item.id, name ? name.trim() : '', comment ? comment.trim() : '');
    }

    const annulerEdit = () => {
        setName(item.name);
        setComment(item.comment);
        toggleEdit();
    }

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    }

    return (
        <TableRow>
            {isEdit ? (
                <>
                    <TableCell>
                        <TextField id="outlined-basic" label="nom" variant="outlined"
                                   sx={{ width:"100%"}}
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                    </TableCell>
                    <TableCell>
                        <TextField id="outlined-basic" label="commentaire" variant="outlined"
                                   sx={{ width:"100%"}}
                                   value={comment}
                                   onChange={(e) => setComment(e.target.value)}/>
                    </TableCell>
                    <TableCell style={{width: 100}}>
                        <ButtonGroup>
                            <Button variant="contained" color="success" onClick={validerEdit}>
                                <CheckIcon/>
                            </Button>
                            <Button variant="contained" color="error" onClick={annulerEdit}>
                                <ClearIcon/>
                            </Button>
                        </ButtonGroup>
                    </TableCell>
                </>
            ) : (
                <>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.comment}</TableCell>
                    <TableCell>
                        <ButtonGroup variant="contained" aria-label="Basic button group">
                            <Button variant="contained" onClick={toggleEdit}>
                                <EditIcon/>
                            </Button>
                            <Button variant="contained" color="error" onClick={() => onDelete(item.id)}>
                                <DeleteIcon/>
                            </Button>
                        </ButtonGroup>
                    </TableCell>
                </>
            )
            }
        </TableRow>
    );
}
