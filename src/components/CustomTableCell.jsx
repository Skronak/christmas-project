import { TableCell, TextField, Checkbox, FormControlLabel } from "@mui/material";

export default function CustomTableCell({ onChange, name, value, isEdit }) {
    // Checkbox pour le champ "done"
    if (isEdit && name === "done") {
        return (
            <TableCell>
                <FormControlLabel
                    control={
                        <Checkbox
                            name={name}
                            checked={!!value}
                            onChange={onChange}
                        />
                    }
                    label=""
                />
            </TableCell>
        );
    }

    return isEdit ? (
        <TableCell>
            <TextField
                id="outlined-basic"
                name={name}
                label={name}
                variant="outlined"
                sx={{ width: "100%" }}
                value={value}
                onChange={onChange}
            />
        </TableCell>
    ) : (
        <TableCell>
            {name === "done" ? (value ? "Oui" : "Non") : value}
        </TableCell>
    );
}
