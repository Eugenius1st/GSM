// Material UI
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
import { visuallyHidden } from '@mui/utils';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
// Modals
import AlarmModal from 'components/Modals/AlarmModal';
// colors
import colors from 'assets/colors/palette';
// icons
import { FaBell } from 'react-icons/fa';
interface Data {
    id: number;
    lesson: string;
    name: string;
    expiration: number;
    remainingRounds: number | '0';
    paymentRound: number | '0';
    deposit: number;
}

interface InitialData {
    id: number;
    lesson: string;
    name: string;
    expiration: number;
    remainingRounds: number | '0';
    paymentRound: number | '0';
    deposit: boolean;
}

const initialData: InitialData[] = [
    {
        id: 1,
        name: '손흥민',
        lesson: '엘리트',
        expiration: 7,
        remainingRounds: 5,
        paymentRound: 10,
        deposit: false,
    },
    {
        id: 2,
        name: '김민재',
        lesson: '엘리트',
        expiration: 5,
        remainingRounds: 5,
        paymentRound: 10,
        deposit: false,
    },
    {
        id: 3,
        name: '홍길동',
        lesson: '엘리트',
        expiration: 3,
        remainingRounds: 5,
        paymentRound: 10,
        deposit: true,
    },
    {
        id: 4,
        name: '손흥민',
        lesson: '엘리트',
        expiration: 7,
        remainingRounds: 5,
        paymentRound: 10,
        deposit: true,
    },
    {
        id: 5,
        name: '김민재',
        lesson: '엘리트',
        expiration: 5,
        remainingRounds: 5,
        paymentRound: 10,
        deposit: true,
    },
    {
        id: 6,
        name: '홍길동',
        lesson: '엘리트',
        expiration: 3,
        remainingRounds: 5,
        paymentRound: 10,
        deposit: true,
    },
    {
        id: 7,
        name: '손흥민',
        lesson: '엘리트',
        expiration: 7,
        remainingRounds: 5,
        paymentRound: 10,
        deposit: true,
    },
    {
        id: 8,
        name: '김민재',
        lesson: '엘리트',
        expiration: 5,
        remainingRounds: 5,
        paymentRound: 10,
        deposit: true,
    },
    {
        id: 9,
        name: '홍길동',
        lesson: '엘리트',
        expiration: 3,
        remainingRounds: 5,
        paymentRound: 10,
        deposit: false,
    },
    {
        id: 10,
        name: '손흥민',
        lesson: '기본기·어린이',
        expiration: 7,
        remainingRounds: 5,
        paymentRound: 10,
        deposit: false,
    },
    {
        id: 11,
        name: '김민재',
        lesson: '기본기·어린이',
        expiration: 5,
        remainingRounds: 5,
        paymentRound: 10,
        deposit: false,
    },
    {
        id: 12,
        name: '홍길동',
        lesson: '기본기·어린이',
        expiration: 3,
        remainingRounds: 5,
        paymentRound: 10,
        deposit: false,
    },
];

function DataProcess(DataList: InitialData[]) {
    const NewData: Data[] = []; // NewData 배열의 타입을 Data로 선언
    DataList.forEach((el) => {
        // forEach로 변경
        NewData.push({
            // push 메서드 사용
            id: el.id,
            name: el.name,
            lesson: el.lesson,
            remainingRounds: el.remainingRounds,
            paymentRound: el.paymentRound,
            expiration: el.expiration,
            deposit: el.deposit ? 1 : 0,
        });
    });
    return NewData;
}

const rows = DataProcess(initialData);

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
        id: 'name',
        numeric: false,
        label: '이름',
    },
    {
        id: 'lesson',
        numeric: false,
        label: '수업명',
    },
    {
        id: 'deposit',
        numeric: false,
        label: '입금여부',
    },
    {
        id: 'remainingRounds',
        numeric: false,
        label: '잔여회차',
    },
    {
        id: 'expiration',
        numeric: false,
        label: '만료',
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
    const { egPurple, egBlack } = colors;
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead
            sx={{
                '.MuiTableCell-root': { background: egPurple.superLight },
                '.MuiTableCell-head': { border: `1px solid ${egBlack.light}` },
            }}
        >
            <TableRow>
                <TableCell
                    align="left"
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
                        sx={{ width: '5rem', paddingX: 0 }}
                        align="center"
                        key={headCell.id}
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
                    sx={{ width: '5rem', paddingX: 0 }}
                    align="center"
                >
                    알림 전송
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
    const { egPurple, egWhite } = colors;

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
                    variant="subtitle1"
                    id="tableTitle"
                    component="div"
                >
                    회원정보
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Add">
                    <IconButton
                        sx={{
                            fontSize: '1rem',
                            background: egPurple.default,
                            borderRadius: '5px',
                            color: egWhite.default,
                            px: '0.7rem',
                        }}
                    >
                        선택 알림 전송
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
    const [orderBy, setOrderBy] = React.useState<keyof Data>('expiration');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { egPurple, egBlack } = colors;

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
                        <TableBody
                            sx={{
                                '.MuiTableRow-hover:hover': { background: `${egPurple.superLight} !important` },
                                '.Mui-selected': { background: `${egPurple.superLight} !important` },
                            }}
                        >
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
                                        sx={{
                                            '.MuiTableCell-body': { border: `1px solid ${egBlack.light}` },
                                            cursor: 'pointer',
                                        }}
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
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell
                                            sx={{ paddingX: 0 }}
                                            align="center"
                                        >
                                            {row.lesson}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{ paddingX: 0 }}
                                        >
                                            {row.deposit ? 'O' : 'X'}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{ paddingX: 0 }}
                                        >
                                            {row.remainingRounds}/{row.paymentRound}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{ paddingX: 0 }}
                                        >
                                            D-{row.expiration}
                                        </TableCell>

                                        <TableCell
                                            sx={{ paddingX: 0 }}
                                            align="center"
                                        >
                                            <AlarmModal />
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
            <div className="text-end">
                <PurpleBtn content="선택 알림 전송" />
            </div>
        </Box>
    );
}
