import React from 'react';
import {TextField} from "@mui/material";

export default function UserDropdown({ userList, onSelect }) {
    const handleChange = (e) => {
        const userId = e.target.value;
        if (onSelect) onSelect(userId);
    };

    return (
        <TextField
            id="select-user"
            select
            label="Selectionner une valeur"
            onChange={handleChange}
            slotProps={{
                select: {
                    native: true,
                },
            }}
        >
            <option key={0} value={0}></option>
            {userList.map((user) => (
                <option key={user.id} value={user.id}>
                    {user.name}
                </option>
            ))}
        </TextField>
    );
}

