import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// Common
import SearchBar from 'components/Common/SearchBar';
import SelectMenu from 'components/Common/SelectMenu';
// Eg Components
import DropDownModal from 'components/EgMaterials/DropDown';
//hooks
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
import { useQuery, useMutation } from '@tanstack/react-query';
// api
import { requestGet, requestPatch } from 'api/basic';
// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';
// colors
import colors from 'assets/colors/palette';
// icons
import { RiUserForbidFill } from 'react-icons/ri';
// Cards
import EmptyCard from 'components/Cards/EmptyCard';
// utility
import { classGroupMatcherByEng } from 'utility/standardConst';
// Pagination
import PaginationRounded from 'components/EgMaterials/Pagenation';

interface PatchDataType {
    requestUrl: string;
    data?: any;
    flagCheckFunc?: (data: boolean) => void;
}
interface RowDataType {
    _id: number;
    photo: string;
    name: string;
    birth: number;
    team: string;
    classGroupName?: string;
}
interface TableRowDataType {
    tableRowData: RowDataType[];
    userSearchState: boolean;
    setUserSearchState?: (data: boolean) => void;
}

interface HeadCell {
    id: keyof RowDataType;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'photo',
        numeric: false,
        label: 'profile',
    },
    {
        id: 'name',
        numeric: false,
        label: 'Name',
    },

    {
        id: 'birth',
        numeric: false,
        label: 'Birth',
    },
    {
        id: 'team',
        numeric: false,
        label: 'Team',
    },
];

const searchedHeadCells: readonly HeadCell[] = [
    {
        id: 'photo',
        numeric: false,
        label: 'profile',
    },
    {
        id: 'name',
        numeric: false,
        label: 'Name',
    },

    {
        id: 'classGroupName',
        numeric: true,
        label: 'ClassGroupName',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
    userSearchState: boolean;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { egPurple } = colors;
    let isMobile = useRecoilValue(IsMobileSelector);
    const { onSelectAllClick, numSelected, rowCount, userSearchState } = props;

    return (
        <TableHead sx={{ '.MuiTableCell-root': { background: egPurple.superLight } }}>
            <TableRow>
                <TableCell
                    align="center"
                    sx={{
                        width: '1rem',
                        padding: 0,
                    }}
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

                {userSearchState
                    ? searchedHeadCells.map((headCell) => (
                          <TableCell
                              align="center"
                              sx={{
                                  paddingX: 0,
                                  width: 'fit-content',
                              }}
                              key={headCell.id}
                          >
                              {headCell.label}
                          </TableCell>
                      ))
                    : headCells.map((headCell) => (
                          <TableCell
                              align="center"
                              sx={{
                                  paddingX: 0,
                                  width: 'fit-content',
                              }}
                              key={headCell.id}
                          >
                              {headCell.label}
                          </TableCell>
                      ))}
                <TableCell
                    sx={{
                        paddingX: 0,
                        width: '1rem',
                    }}
                    align="center"
                >
                    정보 보기
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
    setRowData: (data: any) => void;

    selectedArr: any;
    userSearchState?: boolean;
    setUserSearchState?: (data: boolean) => void;
    curPage: number;
    setCurPage: (page: number) => void;
    itemsPerPage: number;
    setAllCount: (count: number) => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const {
        numSelected,
        setRowData,
        selectedArr,
        userSearchState,
        setUserSearchState,
        curPage,
        itemsPerPage,
        setCurPage,
        setAllCount,
    } = props;

    let isMobile = useRecoilValue(IsMobileSelector);
    const [searchedUser, setSearchedUser] = React.useState<any>('');
    const [userQueryEnabled, setCoachQueryEnabled] = React.useState(false);
    const [userSearchInput, setUserSearchInput] = React.useState('');

    // GET 요청을 보낼 함수 정의
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['searchUser'],
        queryFn: () => {
            if (userSearchInput) {
                return requestGet({
                    requestUrl: `/student/search/${userSearchInput}?with_head=true&take=${itemsPerPage}&page=${curPage}`,
                    successFunc: setSearchedUser,
                    flagCheckFunc: setUserSearchState,
                });
            } else {
                // searchInput이 undefined일 때에 대한 처리
                return Promise.resolve([]); // 또는 다른 유효한 값을 반환할 수 있음
            }
        },
        enabled: userQueryEnabled, // enabled 옵션을 사용하여 쿼리를 활성화 또는 비활성화합니다.
    });
    // GET 요청 버튼 클릭 시에만 쿼리를 활성화하도록 설정합니다.
    const useHandleButtonClick = () => {
        if (userSearchInput) {
            setCurPage(1);
            setCoachQueryEnabled(true);
            refetch();
        }
    };

    // 검색시 렌더링
    React.useEffect(() => {
        convertTableRowData();
        setAllCount(searchedUser.count);
    }, [searchedUser]);
    // 유저 검색 input 값이 없을 시
    React.useEffect(() => {
        if (!userSearchInput && setUserSearchState) {
            setUserSearchState(false);
        }
    }, [userSearchInput]);
    // Table 에 적합한 Row 형태로 변경하기
    function convertTableRowData() {
        // 코치 정보를 담을 빈 배열 생성
        if (searchedUser.result) {
            const rows: RowDataType[] = [];
            searchedUser.result.forEach((user: RowDataType, index: number) => {
                const { _id, photo, name, birth, team, classGroupName } = user; // 원하는 속성들을 추출
                if (userSearchState) {
                    rows.push({
                        _id: _id,
                        photo: photo,
                        name: name,
                        classGroupName: classGroupName,
                        birth: 0,
                        team: '',
                    });
                } else
                    rows.push({
                        _id: _id, // 배열 인덱스를 이용하여 id 부여
                        photo: photo, // 사진 속성 그대로 사용
                        name: name, // 이름 속성 그대로 사용
                        birth: new Date(birth).getFullYear(), // 출생일에서 연도만 추출
                        team: team,
                    });
            });
            // 변환된 배열 반환!!
            setRowData(rows);
        }
    }
    const [patchCheckFlag, setPatchCheckFlag] = React.useState(false);

    // Patch 요청
    const mutation = useMutation({
        mutationFn: ({ requestUrl, data, flagCheckFunc }: PatchDataType) => {
            return requestPatch({
                requestUrl: requestUrl,
                data: data,
                flagCheckFunc: flagCheckFunc,
            });
        },
    });
    function handleBlock() {
        selectedArr.forEach((userId: any) => {
            mutation.mutate({
                requestUrl: `/auth/block/${userId}`,
                // data: data,
                flagCheckFunc: setPatchCheckFlag,
            });
        });
    }
    React.useEffect(() => {
        if (patchCheckFlag) {
            alert('비활성화 되었습니다');
            setPatchCheckFlag(false);
        }
    }, [patchCheckFlag]);
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
                !isMobile && (
                    <Typography
                        sx={{ fontWeight: 'bold' }}
                        variant="subtitle1"
                        id="tableTitle"
                        component="div"
                    >
                        회원정보
                    </Typography>
                )
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={handleBlock}>
                        <span className="text-base text-egPurple-default">비활성화</span>
                        <RiUserForbidFill className="w-5 h-5 text-egPurple-default" />
                    </IconButton>
                </Tooltip>
            ) : (
                <div className="flex items-center">
                    <div className="flex items-center justify-between">
                        {!isMobile && (
                            <div className="mr-1">
                                <SelectMenu menuList={['이름']} />
                            </div>
                        )}
                        <SearchBar
                            searchFunc={useHandleButtonClick}
                            searchInput={userSearchInput}
                            setSearchInput={setUserSearchInput}
                            barWidth="15rem"
                            placeholder="이름으로 검색하세요"
                        />
                    </div>

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
                </div>
            )}
        </Toolbar>
    );
}
export default function EnhancedTable({ tableRowData, userSearchState, setUserSearchState }: TableRowDataType) {
    const [rowData, setRowData] = React.useState(tableRowData);
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [curPage, setCurPage] = React.useState(1);
    const [allCount, setAllCount] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const { egPurple } = colors;

    // Table Body 렌더링 관련
    React.useEffect(() => {
        if (tableRowData) setRowData(tableRowData);
    }, [tableRowData]);

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

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    setRowData={setRowData}
                    userSearchState={userSearchState}
                    setUserSearchState={setUserSearchState}
                    selectedArr={selected}
                    curPage={curPage}
                    setCurPage={setCurPage}
                    itemsPerPage={itemsPerPage}
                    setAllCount={setAllCount}
                />
                <TableContainer sx={{ overflowY: 'scroll' }}>
                    {rowData && rowData.length > 0 ? (
                        <Table
                            sx={{ minWidth: 400 }}
                            aria-labelledby="tableTitle"
                            size="small"
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                onSelectAllClick={handleSelectAllClick}
                                rowCount={rowData.length}
                                userSearchState={userSearchState}
                            />
                            <TableBody
                                sx={{
                                    '.MuiTableRow-hover:hover': {
                                        background: `${egPurple.superLight} !important`,
                                    },
                                    '.Mui-selected': {
                                        background: `${egPurple.superLight} !important`,
                                    },
                                }}
                            >
                                {rowData.map((row, index) => {
                                    const isItemSelected = isSelected(row._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row._id)}
                                            role="left"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    paddingX: 0,
                                                    width: '1rem',
                                                }}
                                            >
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    paddingX: 0,
                                                    width: '1rem',
                                                }}
                                            >
                                                <img
                                                    className="object-cover m-auto rounded-full w-14 h-14"
                                                    src={row.photo}
                                                    alt={row.name}
                                                />
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{ paddingX: 0, width: '1rem' }}
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                            >
                                                {row.name}
                                            </TableCell>

                                            {userSearchState ? (
                                                <TableCell
                                                    align="center"
                                                    sx={{ paddingX: 0, width: '1rem' }}
                                                >
                                                    {row.classGroupName
                                                        ? classGroupMatcherByEng(row.classGroupName)
                                                        : '미정'}
                                                </TableCell>
                                            ) : (
                                                <TableCell
                                                    align="center"
                                                    sx={{ paddingX: 0, width: '1rem' }}
                                                >
                                                    {row.birth} 년생
                                                </TableCell>
                                            )}
                                            {!userSearchState && (
                                                <TableCell
                                                    align="center"
                                                    sx={{ paddingX: 0, width: '1rem' }}
                                                >
                                                    {row.team}
                                                </TableCell>
                                            )}
                                            <TableCell
                                                sx={{
                                                    paddingX: 0,
                                                    width: '6rem',
                                                }}
                                                align="center"
                                            >
                                                <Link to={`/admin/user/${row._id}`}>
                                                    <WhiteBtn
                                                        content="정보보기"
                                                        width="18"
                                                    />
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    ) : (
                        <EmptyCard
                            content="검색 결과가 없습니다"
                            customStyle="py-28 text-egPurple-semiLight flex flex-col justify-center items-center  shadow-md"
                        />
                    )}
                </TableContainer>
            </Paper>
            {userSearchState && (
                <div className="flex justify-center my-4">
                    <PaginationRounded
                        totalItems={allCount ? allCount : 1}
                        itemsPerPage={itemsPerPage}
                        curPage={curPage}
                        setCurPage={(page) => setCurPage(page)}
                    />
                </div>
            )}
        </Box>
    );
}
