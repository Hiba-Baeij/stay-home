import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

interface EnhancedTableToolbarProps {
    numSelected: number;
    tableName: string;
}
interface Col {
    field: string,
    label: string,
    numeric: boolean,
    disablePadding: boolean,

}


interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
    isSelected: boolean
    // cols: Col[]
}
const rows = [
    {
        name: "mohammad",
        age: 21,
        job: "programming",
        favorite: "play and programming",
        food: "noddiles",
    },
    {
        name: "hibe",
        age: 21,
        job: "programming",
        favorite: "shopping and programming",
        food: "falafel",
    },
    {
        name: "aisha",
        age: 21,
        job: "programming",
        favorite: "shopping and programming",
        food: "falafel",
    },
    {
        name: "ahmad",
        age: 21,
        job: "programming",
        favorite: "shopping and programming",
        food: "falafel",
    },
    {
        name: "hussein",
        age: 21,
        job: "programming",
        favorite: "shopping and programming",
        food: "falafel",
    },
    {
        name: "abdallah",
        age: 21,
        job: "programming",
        favorite: "shopping and programming",
        food: "falafel",
    },
    {
        name: "roaa",
        age: 21,
        job: "programming",
        favorite: "shopping and programming",
        food: "falafel",
    },
    {
        name: "leen",
        age: 21,
        job: "programming",
        favorite: "shopping and programming",
        food: "falafel",
    },
    {
        name: "joudy",
        age: 21,
        job: "programming",
        favorite: "shopping and programming",
        food: "falafel",
    },
    {
        name: "raghad",
        age: 21,
        job: "programming",
        favorite: "shopping and programming",
        food: "falafel",
    },
]

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {props.tableName}
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : null}
        </Toolbar>
    );
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, numSelected, rowCount } = props;
    const headCells = [
        {
            id: 'name',
            numeric: false,
            disablePadding: props.isSelected,
            label: 'Dessert (100g serving)',
        },
        {
            id: 'calories',
            numeric: true,
            disablePadding: false,
            label: 'Calories',
        },
        {
            id: 'fat',
            numeric: true,
            disablePadding: false,
            label: 'Fat (g)',
        },
        {
            id: 'carbs',
            numeric: true,
            disablePadding: false,
            label: 'Carbs (g)',
        },
        {
            id: 'protein',
            numeric: true,
            disablePadding: false,
            label: 'Protein (g)',
        },
    ];
    return (
        <TableHead>
            <TableRow>
                {
                    props.isSelected ? (

                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={rowCount > 0 && numSelected === rowCount}
                                onChange={onSelectAllClick}
                                inputProps={{
                                    'aria-label': 'select all desserts',
                                }}
                            />
                        </TableCell>
                    ) : null
                }
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
const DEFAULT_ROWS_PER_PAGE = 5;

export default function TableData(props: { className?: string, tableName: string, deleteData?: () => void, isSelected: boolean }) {
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [paddingHeight, setPaddingHeight] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
    const [visibleRows, setVisibleRows] = React.useState<any[] | null>(null);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const isSelected = (name: string) => selected.indexOf(name) !== -1;


    React.useEffect(() => {
        let rowsOnMount = rows.slice(
            0 * DEFAULT_ROWS_PER_PAGE,
            0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
        );

        setVisibleRows(rowsOnMount);
    }, []);

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleChangePage =
        (event: React.MouseEvent<HTMLButtonElement> | null,
            newPage: number) => {
            const updatedRows = rows.slice(
                newPage * rowsPerPage,
                newPage * rowsPerPage + rowsPerPage,
            );
            setVisibleRows(updatedRows);
            const numEmptyRows =
                newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;

            const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
            setPaddingHeight(newPaddingHeight);
        }



    const handleChangeRowsPerPage =
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const updatedRowsPerPage = parseInt(event.target.value, 10);
            setRowsPerPage(updatedRowsPerPage);
            setPage(0);
            const updatedRows = rows.slice(
                0 * updatedRowsPerPage,
                0 * updatedRowsPerPage + updatedRowsPerPage,
            );
            setVisibleRows(updatedRows);

            // There is no layout jump to handle on the first page.
            setPaddingHeight(0);
        }

    return (
        <Box sx={{ width: '100%' }} className={props.className}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar tableName={props.tableName} numSelected={selected.length} />
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={rows.length}
                            isSelected={props.isSelected}
                        />
                        <TableBody>
                            {visibleRows
                                ? visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            {
                                                props.isSelected ? (

                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId,
                                                            }}
                                                        />
                                                    </TableCell>
                                                ) : null
                                            }
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding={props.isSelected ? 'none' : 'normal'}
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.age}</TableCell>
                                            <TableCell align="right">{row.favorite}</TableCell>
                                            <TableCell align="right">{row.food}</TableCell>
                                            <TableCell align="right">{row.job}</TableCell>
                                        </TableRow>
                                    );
                                })
                                : null
                            }
                            {paddingHeight > 0 && (
                                <TableRow
                                    style={{
                                        height: paddingHeight,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </Paper>
        </Box>
    )
}



