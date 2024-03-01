
interface Customer {
  id_cust: number;
  name: string;
}

const Card: React.FC<{ customer: Customer }> = ({ customer }) => {
  return (
    <>
      {customer.name}
    </>
  );
};

export default Card;
