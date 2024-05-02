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
import { visuallyHidden } from '@mui/utils';
//hooks
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// api
import { requestGet } from 'api/basic';
// Common
import SelectMenu from 'components/Common/SelectMenu';
import SearchBar from 'components/Common/SearchBar';
// Eg Components
import DropDownModal from 'components/EgMaterials/DropDown';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
// colors
import colors from 'assets/colors/palette';
// icons
import { RiUserForbidFill } from 'react-icons/ri';
// Cards
import EmptyCard from 'components/Cards/EmptyCard';

interface RowDataType {
    _id: number;
    photo: string;
    name: string;
    birth: number;
    lv: number;
}
interface TableRowDataType {
    tableRowData: RowDataType[];
}

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

interface HeadCell {
    id: keyof RowDataType;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'photo',
        numeric: false,
        label: 'photo',
    },
    {
        id: 'name',
        numeric: false,
        label: 'Name',
    },
    {
        id: 'lv',
        numeric: false,
        label: 'lv',
    },
    {
        id: 'birth',
        numeric: false,
        label: 'Birth',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof RowDataType) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { egPurple } = colors;
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof RowDataType) => (event: React.MouseEvent<unknown>) => {
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
    defaultRowData: any;
    setRowData: (data: any) => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, defaultRowData, setRowData } = props;
    const [curPage, setCurPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const [coachSearchInput, setCoachSearchInput] = React.useState('');
    const [searchedCoach, setSearchedCoach] = React.useState([]);
    const [coachQueryEnabled, setCoachQueryEnabled] = React.useState(false);

    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['searchCoach'],
        queryFn: () => {
            if (coachSearchInput) {
                return requestGet({
                    requestUrl: `/admin/search/${coachSearchInput}?with_head=true&take=${itemsPerPage}&page=${curPage}`,
                    successFunc: setSearchedCoach,
                });
            } else {
                // searchInput이 undefined일 때에 대한 처리
                return Promise.resolve([]); // 또는 다른 유효한 값을 반환할 수 있음
            }
        },
        staleTime: 1000,
        enabled: coachQueryEnabled, // enabled 옵션을 사용하여 쿼리를 활성화 또는 비활성화합니다.
    });
    const useHandleButtonClick = () => {
        // GET 요청 버튼 클릭 시에만 쿼리를 활성화하도록 설정합니다.
        if (coachSearchInput) {
            setCurPage(1);
            setCoachQueryEnabled(true);
            refetch();
        }
    };

    // 검색시 렌더링
    React.useEffect(() => {
        convertTableRowData();
    }, [searchedCoach]);
    React.useEffect(() => {
        if (!coachSearchInput) {
            setRowData(defaultRowData);
        }
    }, [coachSearchInput]);

    // Table 에 적합한 Row 형태로 변경하기
    function convertTableRowData() {
        // 코치 정보를 담을 빈 배열 생성
        const rows: RowDataType[] = [];
        searchedCoach.forEach((coach: RowDataType, index: number) => {
            const { _id, photo, name, birth, lv } = coach; // 원하는 속성들을 추출
            rows.push({
                _id: _id, // 배열 인덱스를 이용하여 id 부여
                photo: photo, // 사진 속성 그대로 사용
                name: name, // 이름 속성 그대로 사용
                birth: new Date(birth).getFullYear(), // 출생일에서 연도만 추출
                lv: lv, // 레벨 속성 그대로 사용
            });
        });
        // 변환된 배열 반환!!
        setRowData(rows);
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
                display: 'flex',
                justifyContent: 'space-between',
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
                    sx={{ fontWeight: 'bold' }}
                    variant="subtitle1"
                    id="tableTitle"
                    component="div"
                >
                    코치정보
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <span className="text-base text-egPurple-default">비활성화</span>
                        <RiUserForbidFill className="w-5 h-5 text-egPurple-default" />
                    </IconButton>
                </Tooltip>
            ) : (
                <div className="flex items-center">
                    <div className="mr-1">
                        <SelectMenu menuList={['이름']} />
                    </div>
                    <SearchBar
                        searchFunc={useHandleButtonClick}
                        searchInput={coachSearchInput}
                        setSearchInput={setCoachSearchInput}
                    />
                    <DropDownModal
                        itemList={[
                            {
                                item: 'ALL',
                            },
                            {
                                item: 'LV1',
                            },
                            {
                                item: 'LV2',
                            },
                            {
                                item: 'LV3',
                            },
                            {
                                item: 'LV4',
                            },
                        ]}
                    />
                </div>
            )}
        </Toolbar>
    );
}
export default function EnhancedTable({ tableRowData }: TableRowDataType) {
    const [rowData, setRowData] = React.useState(tableRowData);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof RowDataType>('lv');
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { egPurple } = colors;
    // Table Body 렌더링 관련
    React.useEffect(() => {
        if (tableRowData) setRowData(tableRowData);
    }, [tableRowData]);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof RowDataType) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rowData.map((n) => n._id);
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

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty tableRowData.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowData.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    defaultRowData={tableRowData}
                    setRowData={setRowData}
                />
                <TableContainer sx={{ overflowY: 'scroll' }}>
                    {rowData && rowData.length > 0 ? (
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
                                rowCount={rowData.length}
                            />
                            <TableBody
                                sx={{
                                    '.MuiTableRow-hover:hover': { background: `${egPurple.superLight} !important` },
                                    '.Mui-selected': { background: `${egPurple.superLight} !important` },
                                }}
                            >
                                {rowData.map((row, index) => {
                                    const isItemSelected = isSelected(row._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row._id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
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
                                                    src={row.photo}
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
                                            <TableCell sx={{ paddingX: 0 }}>{row.lv} lv</TableCell>
                                            <TableCell sx={{ paddingX: 0 }}>{row.birth}</TableCell>
                                            <TableCell
                                                sx={{ paddingX: 0 }}
                                                align="center"
                                            >
                                                <Link to={`/admin/coach/${row._id}`}>
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
                                                <Link to={`/admin/coach/coach-class/${row._id}`}>
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
                    ) : (
                        <EmptyCard
                            content="데이터가 없습니다."
                            customStyle="py-28 text-egPurple-semiLight flex flex-col justify-center items-center  shadow-md"
                        />
                    )}
                </TableContainer>
                {/* <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rowData.length}
                    rowsPerPage={rowsPerPage}
                    labelRowsPerPage=""
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
            </Paper>
        </Box>
    );
}
