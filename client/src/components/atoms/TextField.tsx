import { TextField } from "@mui/material";

interface TextFieldProps {
    id: string,
    label: string,
    value: string,
    error: boolean,
    helperText: string,
    onChange: React.ChangeEventHandler<Element>,
    type: string
}

const TextFieldAtom = ({ id, label, value, error, helperText, onChange, type }: TextFieldProps) => {
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
