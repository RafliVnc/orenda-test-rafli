import { Button } from "@mui/material";

interface ButtonProps {
    variant: "outlined" | "contained",
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined,
    children: string,
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
}


const ButtonCustomer = ({ variant, onClick, children, color }: ButtonProps) => {
    return (
        <Button variant={variant} onClick={onClick} color={color}>
            {children}
        </Button>
    );
};

export default ButtonCustomer;
