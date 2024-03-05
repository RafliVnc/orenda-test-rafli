import CustomersProps from "./CustomersProps"

export default interface CustomerFormProps {
    customers: CustomersProps,
    error: CustomersProps,
    setCustomers: React.Dispatch<React.SetStateAction<CustomersProps>>
}