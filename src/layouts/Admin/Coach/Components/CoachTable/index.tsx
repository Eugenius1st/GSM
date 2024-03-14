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
import { IoFilterSharp } from 'react-icons/io5';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { visuallyHidden } from '@mui/utils';

//hooks
import { Link } from 'react-router-dom';

// images
import coach_son from 'assets/coach/coach_son.jpeg';
import coach_kim from 'assets/coach/coach_kim.jpeg';
import coach_hong from 'assets/coach/coach_hong.jpeg';

// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
import PurpleBtn from 'components/Buttons/PurpleBtn';

// colors
import colors from 'assets/colors/palette';

interface Data {
    id: number;
    profile: string;
    name: string;
    birth: number;
    level: number;
}

const rows = [
    {
        id: 1,
        profile: coach_son,
        name: '손흥민',
        birth: 1998,
        level: 1,
    },
    {
        id: 2,
        profile: coach_kim,
        name: '김민재',
        birth: 2000,
        level: 2,
    },
    {
        id: 3,
        profile: coach_hong,
        name: '홍길동',
        birth: 1978,
        level: 3,
    },
    {
        id: 4,
        profile: coach_son,
        name: '손흥민',
        birth: 1998,
        level: 4,
    },
    {
        id: 5,
        profile: coach_kim,
        name: '김민재',
        birth: 2000,
        level: 5,
    },
    {
        id: 6,
        profile: coach_hong,
        name: '홍길동',
        birth: 1978,
        level: 6,
    },
    {
        id: 7,
        profile: coach_son,
        name: '손흥민',
        birth: 1998,
        level: 1,
    },
    {
        id: 8,
        profile: coach_kim,
        name: '김민재',
        birth: 2000,
        level: 7,
    },
    {
        id: 9,
        profile: coach_hong,
        name: '홍길동',
        birth: 1978,
        level: 1,
    },
    {
        id: 10,
        profile: coach_son,
        name: '손흥민',
        birth: 1998,
        level: 1,
    },
    {
        id: 11,
        profile: coach_kim,
        name: '김민재',
        birth: 2000,
        level: 1,
    },
    {
        id: 12,
        profile: coach_hong,
        name: '홍길동',
        birth: 1978,
        level: 1,
    },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'profile',
        numeric: false,
        label: 'profile',
    },
    {
        id: 'name',
        numeric: false,
        label: 'Name',
    },
    {
        id: 'level',
        numeric: false,
        label: 'Level',
    },
    {
        id: 'birth',
        numeric: false,
        label: 'Birth',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { egPurple } = colors;
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead sx={{ '.MuiTableCell-root': { background: egPurple.superLight } }}>
            <TableRow>
                <TableCell
                    align="center"
                    padding="checkbox"
                >
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
                {headCells.map((headCell) => (
                    <TableCell
                        sx={{ paddingX: 0 }}
                        key={headCell.id}
                        align="left"
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box
                                    component="span"
                                    sx={visuallyHidden}
                                >
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell
                    sx={{ paddingX: 0 }}
                    align="center"
                >
                    정보 보기
                </TableCell>
                <TableCell
                    sx={{ paddingX: 0 }}
                    align="center"
                >
                    수업 보기
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
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
                    sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    코치관리
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <RiDeleteBin6Fill />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <IoFilterSharp />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}
export default function EnhancedTable() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('level');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { egPurple } = colors;

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage]
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer sx={{ overflowY: 'scroll' }}>
                    <Table
                        sx={{ minWidth: 440 }}
                        aria-labelledby="tableTitle"
                        size="small"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody sx={{ '.MuiTableRow-hover:hover': { background: egPurple.superLight } }}>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            sx={{ paddingX: 0 }}
                                            align="center"
                                        >
                                            <img
                                                className="object-cover rounded-full w-14 h-14"
                                                src={row.profile}
                                                alt={row.name}
                                            />
                                        </TableCell>

                                        <TableCell
                                            sx={{ paddingX: 0 }}
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell sx={{ paddingX: 0 }}>{row.level} lv</TableCell>
                                        <TableCell sx={{ paddingX: 0 }}>{row.birth}</TableCell>
                                        <TableCell
                                            sx={{ paddingX: 0 }}
                                            align="center"
                                        >
                                            <Link to={`/admin/coach/${row.id}`}>
                                                <WhiteBtn
                                                    content="정보보기"
                                                    width="18"
                                                />
                                            </Link>
                                        </TableCell>
                                        <TableCell
                                            sx={{ paddingX: 0 }}
                                            align="center"
                                        >
                                            <Link to={`/admin/coach/coach-class/${row.id}`}>
                                                <WhiteBtn
                                                    content="수업보기"
                                                    width="18"
                                                />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 33,
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
                    labelRowsPerPage=""
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
