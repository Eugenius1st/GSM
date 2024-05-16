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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
// Modals
import AlarmModal from 'components/Modals/AlarmModal';
// colors
import colors from 'assets/colors/palette';
// Eg Components
import DropDownModal from 'components/EgMaterials/DropDown';
import EgCheckBox from 'components/EgMaterials/CheckBox';
// Pagination
import PaginationRounded from 'components/EgMaterials/Pagenation';

interface Data {
    id: number;
    lesson: string;
    name: string;
    expiration: number;
    remainingRounds: number | '0';
    paymentRound: number | '0';
}

interface InitialData {
    id: number;
    lesson: string;
    name: string;
    expiration: number;
    remainingRounds: number | '0';
    paymentRound: number | '0';
}

const initialData: InitialData[] = [
    {
        id: 1,
        name: '손흥민',
        lesson: '엘리트',
        expiration: 7,
        remainingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 2,
        name: '김민재',
        lesson: '엘리트',
        expiration: 5,
        remainingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 3,
        name: '홍길동',
        lesson: '엘리트',
        expiration: 3,
        remainingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 4,
        name: '손흥민',
        lesson: '엘리트',
        expiration: 7,
        remainingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 5,
        name: '김민재',
        lesson: '엘리트',
        expiration: 5,
        remainingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 6,
        name: '홍길동',
        lesson: '엘리트',
        expiration: 3,
        remainingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 7,
        name: '손흥민',
        lesson: '엘리트',
        expiration: 7,
        remainingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 8,
        name: '김민재',
        lesson: '엘리트',
        expiration: 5,
        remainingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 9,
        name: '홍길동',
        lesson: '엘리트',
        expiration: 3,
        remainingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 10,
        name: '손흥민',
        lesson: '기본기·어린이',
        expiration: 7,
        remainingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 11,
        name: '김민재',
        lesson: '기본기·어린이',
        expiration: 5,
        remainingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 12,
        name: '홍길동',
        lesson: '기본기·어린이',
        expiration: 3,
        remainingRounds: 5,
        paymentRound: 10,
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
        });
    });
    return NewData;
}

const rows = DataProcess(initialData);

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
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { egPurple, egBlack } = colors;
    const { onSelectAllClick, numSelected, rowCount } = props;

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
                    >
                        {headCell.label}
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
    const [applicationOnWeek, setApplicationOnWeek] = React.useState(true);
    const [notApplicationOnWeek, setNotApplicationOnWeek] = React.useState(true);

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
                <div className="flex">
                    <div
                        className="flex items-center w-40 mr-2 "
                        onClick={() => setApplicationOnWeek(!applicationOnWeek)}
                    >
                        <EgCheckBox checked={applicationOnWeek} />
                        <div>금주 수업 신청 X</div>
                    </div>
                    <div
                        className="flex items-center w-40 mr-4 "
                        onClick={() => setNotApplicationOnWeek(!notApplicationOnWeek)}
                    >
                        <EgCheckBox checked={notApplicationOnWeek} />
                        <div>금주 수업 신청 O</div>
                    </div>
                    <Tooltip title="Filter list">
                        <DropDownModal
                            itemList={[
                                {
                                    item: 'ALL',
                                },
                                {
                                    item: '엘리트반',
                                },
                                {
                                    item: '취미반',
                                },
                                {
                                    item: '성인반',
                                },
                            ]}
                        />
                    </Tooltip>
                </div>
            )}
        </Toolbar>
    );
}
export default function EnhancedTable() {
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { egPurple, egBlack } = colors;

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
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={rows.length}
                        />
                        <TableBody
                            sx={{
                                '.MuiTableRow-hover:hover': { background: `${egPurple.superLight} !important` },
                                '.Mui-selected': { background: `${egPurple.superLight} !important` },
                            }}
                        >
                            {rows.map((row, index) => {
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
                                            '.MuiTableCell-body': {
                                                border: `0.5px solid ${egBlack.light}`,
                                            },
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
            </Paper>
            <div className="flex justify-center my-4">
                <PaginationRounded
                    totalItems={1}
                    itemsPerPage={10}
                    curPage={1}
                    setCurPage={(page) => console.log(page)}
                />
            </div>
            <div className="text-end">
                <PurpleBtn content="선택 알림 전송" />
            </div>
        </Box>
    );
}
