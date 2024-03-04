import { TextField } from "@mui/material";

const TextFieldAtom = (props: any) => {
    const { id, label, value, error, helperText, onChange, type } = props
    return (
        <TextField
            id={id}
            label={label}
            value={value}
            error={!!error}
            helperText={helperText}
            onChange={onChange}
            type={type}
        />
    );
};

export default TextFieldAtom;
