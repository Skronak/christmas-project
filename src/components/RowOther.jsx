import React, {useRef} from 'react'
import {useState} from 'react'
import {Button, TextField} from "@mui/material";

export default function RowOther({item, onEdit}) {
    const [isEdit, setIsEdit] = useState(false);
    const [otherItem, setOtherItem] = useState();

    React.useEffect(() => {
        setOtherItem(item);
    }, [])

    const validerEdit = () => {
        toggleEdit();
        // onEdit(todo.id, name ? name.trim() : '', comment ? comment.trim() : '');
    }

    const annulerEdit = () => {
        setOtherItem(item);
        toggleEdit();
    }

    const toggleEdit = () => {
        setIsEdit(!isEdit);
    }

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setOtherItem({
                ...otherItem,
                [name]: value
            }
        )
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 0.5fr 0.5fr',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid #ccc'
        }}>
            {otherItem ? (
                <>
                    <div>{item.name}</div>
                    <div>{item.comment}</div>
                    <TextField id="outlined-basic" label="Fait" variant="outlined" value={otherItem.done} name="done"
                               onChange={handleChange}/>
                    <TextField id="outlined-basic" label="Commentaire" variant="outlined" value={otherItem.doneComment}
                               name="doneComment"
                               onChange={handleChange}/>

                    {isEdit ? (<>
                        <Button variant="contained" style={{height: '100%'}} color="success" onClick={validerEdit}>
                            valider
                        </Button>
                        <Button variant="contained" color="error" style={{height: '100%'}} onClick={annulerEdit}>
                            Annuler
                        </Button>
                    </>) : (
                        <Button variant="contained" onClick={toggleEdit}>
                            Modifier
                        </Button>)
                    }
                </>
            ) : null}
        </div>
    );
}
