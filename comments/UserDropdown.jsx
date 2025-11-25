import React from 'react';

/**
 * Composant UserDropdown
 * Props:
 * - users: liste de noms (ex: ['Alice', 'Bob', 'Charlie'])
 * - onSelect: fonction à appeler lors de la sélection d'un utilisateur
 */
export default function UserDropdown({ userList, onSelect }) {
    const handleChange = (e) => {
        const selectedUser = e.target.value;
        if (onSelect) onSelect(selectedUser);
    };

    return (
        <select onChange={handleChange} style={{ padding: '6px', fontSize: '14px' }}>
            <option value=""></option>
            {userList.map((user, index) => (
                <option key={index} value={user}>{user}</option>
            ))}
        </select>
    );
}

