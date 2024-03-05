import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Autocomplete, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import CustomersProps from "@typings/interface/CustomersProps";

interface Column {
    id: 'name' | 'phone' | 'email' | 'address' | 'action';
    label: string;
    width?: number;
    align?: 'left' | 'right' | 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', width: 170 },
    { id: 'phone', label: 'Phone Number', width: 100 },
    {
        id: 'email',
        label: 'Email Address',
        width: 170,
        align: 'left',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'address',
        label: 'Address',
        width: 170,
        align: 'left',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'action',
        label: 'Action',
        width: 170,
        align: 'center',
        format: (value: number) => value.toFixed(2),
    },
];

const options = ['Edit', 'Delete'];

const TableCustomer = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState<Array<CustomersProps>>([]);
    const [filteredRows, setFilteredRows] = useState<Array<any>>([]);
    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const [searchValue, setSearchValue] = useState<string>("");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [clickedRowId, setClickedRowId] = useState<number | null>(null); 
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/customer')
            .then(response => {
                setRows(response.data);
                setFilteredRows(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDeleteCustomer = () => {
        if (clickedRowId !== null) {
            axios.delete(`http://localhost:3000/customer/${clickedRowId}`)
                .then(response => {
                    setRows(rows.filter(customer => customer.custId !== clickedRowId));
                })
                .catch(error => {
                    console.error('Error deleting todo:', error);
                });
        }
        setAnchorEl(null);
    };

    useEffect(() => {
        const results = rows.filter(row =>
            row.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredRows(results);
    }, [searchValue, rows]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>, custId: number) => {
        setClickedRowId(custId);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditCustomer = (custId: number) => () => {
        navigate(`/edit/${custId}`);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Autocomplete
                freeSolo
                disableClearable
                options={rows}
                sx={{ width: 200, m: 1 }}
                onChange={(event, value) => setSelectedRow(value)}
                onInputChange={(event, newInputValue) => {
                    setSearchValue(newInputValue);
                }}
                value={selectedRow}
                getOptionLabel={(row) => row.name || ""}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Name"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
            <TableContainer sx={{ maxHeight: 375 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ width: column.width }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.id === 'action' ? (
                                                    <div>
                                                        <IconButton
                                                            aria-label="more"
                                                            id="long-button"
                                                            aria-controls={open ? 'long-menu' : undefined}
                                                            aria-expanded={open ? 'true' : undefined}
                                                            aria-haspopup="true"
                                                            onClick={(event) => handleClick(event, row.custId)}
                                                        >
                                                            <MoreVertIcon />
                                                        </IconButton>
                                                        <Menu
                                                            id="long-menu"
                                                            MenuListProps={{
                                                                'aria-labelledby': 'long-button',
                                                            }}
                                                            anchorEl={anchorEl}
                                                            open={open && clickedRowId === row.custId}
                                                            onClose={handleClose}
                                                            PaperProps={{
                                                                style: {
                                                                    maxHeight: 36 * 4.5,
                                                                    width: '20ch',
                                                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                                                                },
                                                            }}
                                                        >
                                                            {options.map((option) => (
                                                                <MenuItem
                                                                    key={option}
                                                                    selected={option === 'Pyxis'}
                                                                    onClick={
                                                                        option === 'Delete'
                                                                            ? handleDeleteCustomer
                                                                            : option === 'Edit'
                                                                                ? handleEditCustomer(row.custId)
                                                                                : handleClose
                                                                    }
                                                                >
                                                                    {option}
                                                                </MenuItem>
                                                            ))}
                                                        </Menu>
                                                    </div>
                                                ) : (
                                                    column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default TableCustomer;

