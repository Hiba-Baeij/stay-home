import React, { useEffect } from 'react'
import DialogCustomer from "@/components/pages/Customer"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Checkbox, Chip, IconButton, Pagination, Stack, TextField, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomerApi } from "@/api/customer/endpoints"
import { Address, Customer as TypeCustomer } from "@/api/customer/dto"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store';
import { customerActions } from '@/store/customer';
import CustomerPage from '@/components/pages/Customer'
import { IMAGE_URL } from '@/../app.config';
import moment from 'moment';
import { Add } from '@mui/icons-material';
import { NavLink, Route, useNavigate } from 'react-router-dom';
const DEFAULT_ROWS_PER_PAGE = 5;

export default function Customer() {
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const dispatch = useDispatch<AppDispatch>()
    const navigation = useNavigate()
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
    const [page, setPage] = React.useState(0);
    const customerDto = useSelector<RootState>(state => state.customer.customerDto) as TypeCustomer;
    const customers = useSelector<RootState>(state => state.customer.customers) as TypeCustomer[];

    useEffect(() => {
        getCustomers();
    }, [])

    function getCustomers() {
        CustomerApi.fetchCustomer().then((data: { response: TypeCustomer[]; }) => {
            console.log(data);
            dispatch(customerActions.setCustomer(data.response))

        })
    }

    function getDetails(item: TypeCustomer) {
        dispatch(customerActions.setCustomerDialog(true))
        CustomerApi.getCustomerDetails(item.id as string).then((data: { response: TypeCustomer }) => {
            console.log(data);
            dispatch(customerActions.setCustomerFormDto({
                ...data.response, birthDate: moment(data.response.birthDate).format('YYYY-MM-DD'),
                email: '',
                fullName: '',
                password: '',
                address: new Address()
            }))
        })
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = customers.map((n: any) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleClick = (id: string) => {
        // setSelected();
        console.log(id);

        // setSelected(prevVal => [...prevVal, id]);
        // console.log(selected);

        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];
        console.log(selectedIndex);

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
            console.log(newSelected);

        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
        console.log(selected);
    };
    const deleteCustomer = () => {

    }
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                {JSON.stringify(customers)}
                <TableContainer component={Paper} sx={{
                    width: '100%'
                }}>
                    <div className='flex justify-between items-center w-full gap-5 p-5 pb-3 '>
                        <TextField label='ابحث عن زبون' title='customer' name='customerSearch'></TextField>
                        <Button variant="contained" onClick={() => navigation('/customer/0')}>
                            إضافة زبون
                            <Add></Add>
                        </Button>

                    </div>
                    {
                        selected.length > 0 ?

                            (
                                <div className='flex justify-end items-center w-full px-2'>

                                    <Tooltip title="Delete">
                                        <IconButton onClick={deleteCustomer}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                            ) : null

                    }
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        onChange={handleSelectAllClick}
                                        inputProps={{
                                            'aria-label': 'select all desserts',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>الاسم</TableCell>
                                <TableCell align="center"> المدينة</TableCell>
                                <TableCell align="center">رقم الموبايل</TableCell>
                                <TableCell align="center">تاريخ الميلاد</TableCell>
                                <TableCell align="center">عدد الطلبات </TableCell>
                                <TableCell align="center">تفاصيل</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers ? customers.map((row: TypeCustomer, index: number) => {


                                // onClick={(event) => handleClick(event, row.id ? row.id : '')}
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}

                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onChange={() => handleClick(row.id ? row.id : '')}

                                                color="primary"
                                            />
                                        </TableCell>

                                        <TableCell component="th" scope="row" align="left">
                                            {row.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="left">
                                            {row.cityId}
                                        </TableCell>
                                        <TableCell align="center">{row.phoneNumber}</TableCell>
                                        <TableCell align="center">{new Date(row.birthDate).toLocaleDateString()}</TableCell>
                                        <TableCell align="center">{row.orderCount} </TableCell>
                                        <TableCell align="center">
                                            <NavLink to={`/customer/${row.id}`}> <MoreVertIcon /></NavLink>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                            ) : null
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={2} sx={{ padding: "20px", display: 'flex ', justifyContent: 'center', alignItems: 'center' }}>
                    <Pagination count={10} />
                </Stack>
            </Paper>

        </Box>

    )
}


