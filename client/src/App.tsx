
import { Route, Routes } from 'react-router-dom'
import Customer from "./pages/Customer"
import AddCustomer from './pages/Customer/AddCustomer'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Customer />} />
        <Route path="/add" element={<AddCustomer act="add"/>} />
        <Route path="/edit" element={<AddCustomer  act="edit"/>} />
      </Routes>

    </>
  )
}

export default App
