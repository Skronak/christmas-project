import React, {useRef} from 'react'
import {useState} from 'react'
import {Button, TextField, Checkbox} from "@mui/material";

export default function TodoItemOther({item, onEdit}) {
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

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setOtherItem({
                ...otherItem,
                [name]: value
            }
        )
    }

    const handleChangeCheckbox = (event) => {
        setOtherItem({
                ...otherItem,
                done: +event.target.checked
            }
        )
    };

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
                    <Checkbox
                        name="name"
                        checked={!!otherItem.done}
                        onChange={handleChangeCheckbox}
                        slotProps={{
                            input: { 'aria-label': 'controlled' },
                        }}
                    />
                    <TextField id="outlined-basic" label="Commentaire" variant="outlined" value={otherItem.doneComment}
                               name="doneComment"
                               onChange={handleChange}/>

                        <Button variant="contained" style={{height: '100%'}} color="success" onClick={validerEdit}>
                            valider
                        </Button>
                        <Button variant="contained" color="error" style={{height: '100%'}} onClick={annulerEdit}>
                            Annuler
                        </Button>
                </>
            ) : null}
        </div>
    );
}
