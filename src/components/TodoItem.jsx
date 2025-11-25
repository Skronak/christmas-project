import React from 'react'
import {useState} from 'react'
import {Button, TextField} from "@mui/material";

export default function TodoItem({todo, onDelete, onEdit}) {
    const [isEdit, setIsEdit] = useState(false);
    const [name, setName] = useState(todo.name);
    const [comment, setComment] = useState(todo.comment);

    const validerEdit = () => {
        toggleEdit();
        onEdit(todo.id, name ? name.trim() : '', comment ? comment.trim() : '');
    }

    const annulerEdit = () => {
        setName(todo.name);
        setComment(todo.comment);
        toggleEdit();
    }

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 0.5fr 0.5fr',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid #ccc'
        }}>
            {isEdit ? (
                <>
                    <TextField id="outlined-basic" label="nom" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField id="outlined-basic" label="commentaire" variant="outlined" value={comment} onChange={(e) => setComment(e.target.value)} />
                    <div style={{ height: '100%' }}>
                        <Button variant="contained" style={{ height: '100%' }} color="success" onClick={validerEdit}>
                            valider
                        </Button>
                        <Button variant="contained" color="error" style={{ height: '100%' }} onClick={annulerEdit}>
                            Annuler
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div>{todo.name}</div>
                    <div>{todo.comment}</div>
                    <Button variant="contained" onClick={toggleEdit}>
                        Modifier
                    </Button>
                </>
            )
            }
            <Button variant="contained" color="error" onClick={() => onDelete(todo.id)}>
                Supprimer
            </Button>
        </div>
    );
}
