import { Button } from "@mui/material";

const ButtonAtom = (props : any) => {
    const { variant, onClick, children } = props
    return (
        <Button variant={variant} onClick={onClick}>
            {children}
        </Button>
    );
};

export default ButtonAtom;
