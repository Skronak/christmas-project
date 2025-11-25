import React from 'react'
import {useState} from 'react'

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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid #ccc'
        }}>
            {isEdit ? (
                    <p>
                        <input value={name} onChange={(evt)=>setName(evt.target.value)}></input>
                        <input value={comment} onChange={(evt)=>setComment(evt.target.value)}></input>
                    </p>
                ) :
                <p>
                    <span>{todo.name}</span>
                    <span>{todo.comment}</span>
                </p>

            }
            <div>
                {isEdit ? <p>
                    <button onClick={validerEdit}>valider</button>
                    <button onClick={annulerEdit}>annuler</button>
                </p> :
                    <button onClick={toggleEdit} style={{marginRight: 6}}>Modifier</button>
                }
                <button onClick={() => onDelete(todo.id)}>Supprimer</button>
            </div>
        </div>
    );
}
