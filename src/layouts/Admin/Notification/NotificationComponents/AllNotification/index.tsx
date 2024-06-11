// Material UI
import * as React from 'react';
import { Link } from 'react-router-dom';
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
// hooks
import { useRecoilValue } from 'recoil';
import { IsMobileSelector } from 'atom/isMobile';
import { useQuery } from '@tanstack/react-query';
import { requestGet } from 'api/basic';
// Buttons
import PurpleBtn from 'components/Buttons/PurpleBtn';
// Modals
import AlarmModal from 'components/Modals/AlarmModal';
import BasicModal from 'components/Modals/BasicModal';
// colors
import colors from 'assets/colors/palette';
// react-icons
import { FaArrowDown } from 'react-icons/fa';
import { FaArrowUp } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from 'react-icons/io';
// Pagination
import PaginationRounded from 'components/EgMaterials/Pagenation';
// Notification Components
import TagCard from 'layouts/Admin/Notification/NotificationComponents/TagCard';

interface Data {
    id: number;
    birth: number;
    name: string;
    className: string;
    expiration: number;
    usingRounds: number | '0';
    paymentRound: number | '0';
}

interface InitialData {
    id: number;
    className: string;
    name: string;
    birth: number;
    expiration: number;
    usingRounds: number | '0';
    paymentRound: number | '0';
}

const initialData: InitialData[] = [
    {
        id: 1,
        name: '손흥민',
        className: '엘리트',
        birth: 2016,
        expiration: 7,
        usingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 2,
        name: '김민재',
        className: '엘리트',
        birth: 2016,

        expiration: 5,
        usingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 3,
        name: '홍길동',
        className: '엘리트',
        birth: 2016,

        expiration: 3,
        usingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 4,
        name: '손흥민',
        className: '엘리트',
        birth: 2016,

        expiration: 7,
        usingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 5,
        name: '김민재',
        className: '엘리트',
        birth: 2016,

        expiration: 5,
        usingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 6,
        name: '홍길동',
        className: '엘리트',
        birth: 2016,

        expiration: 3,
        usingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 7,
        name: '손흥민',
        className: '엘리트',
        birth: 2016,

        expiration: 7,
        usingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 8,
        name: '김민재',
        className: '엘리트',
        birth: 2016,

        expiration: 5,
        usingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 9,
        name: '홍길동',
        className: '엘리트',
        birth: 2016,

        expiration: 3,
        usingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 10,
        name: '손흥민',
        className: '기본기·어린이',
        birth: 2017,

        expiration: 7,
        usingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 11,
        name: '김민재',
        className: '기본기·어린이',
        birth: 2018,

        expiration: 5,
        usingRounds: 5,
        paymentRound: 10,
    },
    {
        id: 12,
        name: '홍길동',
        className: '기본기·어린이',
        birth: 2010,

        expiration: 3,
        usingRounds: 5,
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
            className: el.className,
            birth: el.birth,
            usingRounds: el.usingRounds,
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
        id: 'className',
        numeric: false,
        label: '클래스',
    },
    {
        id: 'birth',
        numeric: false,
        label: '년생',
    },

    {
        id: 'usingRounds',
        numeric: false,
        label: '사용회차',
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
    let isMobile = useRecoilValue(IsMobileSelector);
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
                !isMobile && (
                    <Typography
                        sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
                        variant="subtitle1"
                        id="tableTitle"
                        component="div"
                    >
                        회원정보
                    </Typography>
                )
            )}

            {numSelected > 0 && (
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
            )}
        </Toolbar>
    );
}
export default function EnhancedTable() {
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { egPurple, egBlack } = colors;
    // 필터탭
    const [lessonType, setLessonType] = React.useState('group');
    const [classType, setClassType] = React.useState('practice');
    const remainRoundState = [
        { label: '있음', value: 'remain' },
        { label: '없음', value: 'none' },
        { label: '전체', value: 'remainRoundStateAll' },
    ];
    const [remainRound, setRemainRound] = React.useState('remain');
    const applyPeriodState = [
        { label: '~2주', value: '2주' },
        { label: '~3개월', value: '3개월' },
        { label: '~6개월', value: '6개월' },
        { label: '~1년', value: '1년' },
        { label: '전체', value: 'applyPeriodStateAll' },
    ];
    const [lastApply, setLastApply] = React.useState('2주');

    // GET ClassGroup
    const [classGroups, setClassGroups] = React.useState([]);
    const getClassGroup = useQuery({
        queryKey: ['allClassGroup'],
        queryFn: () => {
            return requestGet({
                requestUrl: `/classGroup`,
            });
        },
        staleTime: 5 * 1000,
    });

    //핸들러
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
    const NotificationTab = [
        { label: '공지', link: '/admin/notification/entire' },
        { label: '수업신청공지', link: '/admin/notification/application' },
        { label: '회차차감공지', link: '/admin/notification/round' },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <Box sx={{ mx: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
                    {NotificationTab.map((el, idx) => (
                        <div key={idx}>
                            <Link to={el.link}>
                                <span
                                    className={
                                        el.label === '공지'
                                            ? 'px-2 pb-1 mr-2 border-b-2 text-egPurple-default border-egPurple-default'
                                            : 'px-2 pb-1 mr-2 text-egGrey-default-default'
                                    }
                                >
                                    {el.label}
                                </span>
                            </Link>
                            {idx < NotificationTab.length - 1 && <span>·</span>}
                        </div>
                    ))}
                    <BasicModal
                        modalBtn={<IoIosInformationCircleOutline className="text-orange-600" />}
                        modalTitle={
                            <div>
                                <span className="px-2 bg-egPurple-superLight w-fit">공지용어 안내</span>
                            </div>
                        }
                        modalContents={
                            <div>
                                <div className="mt-2 mb-4 border-b-2"></div>
                                <div className="flex my-2">
                                    <div className="mr-2 font-bold">공지 |</div>
                                    <div>전체회원들에게 공지</div>
                                </div>
                                <div className="flex my-2">
                                    <div className="mr-2 font-bold">회차차감 공지 |</div>
                                    <div>전 주 수업 수강한 경우 공지</div>
                                </div>
                                <div className="flex my-2">
                                    <div className="mr-2 font-bold">수업신청 공지 |</div>
                                    <div>이번주 수업 신청 안한 경우 공지</div>
                                </div>
                            </div>
                        }
                    />
                </Box>
                {/* 필터탭 */}
                <Box>
                    <div className="flex w-full">
                        <div className="w-2/12 py-2 text-center border bg-egPurple-superLight">레슨타입</div>
                        <div className="grid w-10/12 grid-cols-10 px-4 py-2 border">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="group"
                                    name="lessonType"
                                    value="group"
                                    className="hidden"
                                    defaultChecked={lessonType === 'group'}
                                    onChange={(e) => setLessonType(e.target.value)}
                                />
                                <label
                                    htmlFor="group"
                                    className={
                                        lessonType === 'group'
                                            ? 'bg-egPurple-default py-1 w-14 text-center rounded-2xl text-egWhite-default'
                                            : 'w-14 text-center'
                                    }
                                >
                                    단체
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="personal"
                                    name="lessonType"
                                    value="personal"
                                    className="hidden"
                                    defaultChecked={lessonType === 'personal'}
                                    onChange={(e) => setLessonType(e.target.value)}
                                />
                                <label
                                    htmlFor="personal"
                                    className={
                                        lessonType === 'personal'
                                            ? 'bg-egPurple-default py-1 w-14 text-center rounded-2xl text-egWhite-default'
                                            : 'w-14 text-center'
                                    }
                                >
                                    개인
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="w-2/12 py-2 text-center border bg-egPurple-superLight">클래스타입</div>
                        <div className="grid w-10/12 grid-cols-10 px-4 py-2 border">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="practice"
                                    name="classType"
                                    value="practice"
                                    className="hidden"
                                    defaultChecked={classType === 'practice'}
                                    onChange={(e) => setClassType(e.target.value)}
                                />
                                <label
                                    htmlFor="practice"
                                    className={
                                        classType === 'practice'
                                            ? 'bg-egPurple-default py-1 w-14 text-center rounded-2xl text-egWhite-default'
                                            : 'w-14 text-center'
                                    }
                                >
                                    실기
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="theory"
                                    name="classType"
                                    value="theory"
                                    className="hidden"
                                    defaultChecked={classType === 'theory'}
                                    onChange={(e) => setClassType(e.target.value)}
                                />
                                <label
                                    htmlFor="theory"
                                    className={
                                        classType === 'theory'
                                            ? 'w-14 bg-egPurple-default py-1 px-2 text-center rounded-2xl text-egWhite-default'
                                            : 'w-14 text-center'
                                    }
                                >
                                    이론
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="flex items-center justify-center w-2/12 py-2 text-center border bg-egPurple-superLight">
                            클래스그룹
                        </div>
                        {/* <div className="grid w-10/12 grid-cols-7 px-4 py-2 border"> */}
                        <div className="w-10/12">
                            {getClassGroup.data?.result && (
                                <TagCard
                                    tagList={getClassGroup?.data?.result}
                                    func={setClassGroups}
                                    defaultTagList={getClassGroup?.data?.result}
                                />
                            )}
                        </div>
                        {/* </div> */}
                    </div>
                    <div className="flex w-full">
                        <div className="w-2/12 py-2 text-center border bg-egPurple-superLight">잔여수강권</div>
                        <div className="grid w-10/12 grid-cols-10 px-4 py-2 border">
                            {remainRoundState.map((el, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center"
                                >
                                    <input
                                        type="radio"
                                        id={el.value}
                                        name="remainRound"
                                        value={el.value}
                                        className="hidden"
                                        defaultChecked={remainRound === el.value}
                                        onChange={(e) => setRemainRound(e.target.value)}
                                    />
                                    <label
                                        htmlFor={el.value}
                                        className={
                                            remainRound === el.value
                                                ? 'bg-egPurple-default py-1 w-14 text-center rounded-2xl text-egWhite-default'
                                                : 'w-14 text-center'
                                        }
                                    >
                                        {el.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="w-2/12 py-2 text-center border bg-egPurple-superLight">마지막수업신청</div>
                        <div className="grid w-10/12 grid-cols-8 px-4 py-2 border">
                            {applyPeriodState.map((el, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center"
                                >
                                    <input
                                        type="radio"
                                        id={el.value}
                                        name="applyPeriod"
                                        value={el.value}
                                        className="hidden"
                                        defaultChecked={lastApply === el.value}
                                        onChange={(e) => setLastApply(e.target.value)}
                                    />
                                    <label
                                        htmlFor={el.value}
                                        className={
                                            lastApply === el.value
                                                ? 'bg-egPurple-default py-1 w-16 text-center rounded-2xl text-egWhite-default'
                                                : 'w-16 text-center'
                                        }
                                    >
                                        {el.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </Box>
                <Box sx={{ textAlign: 'end', m: 2 }}>
                    <button className="p-1 border rounded-md border-egBlack-light ">
                        최신가입자 <FaArrowDown className="inline text-egPurple-default" />
                    </button>
                </Box>
                {/* 테이블 */}
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
                                            {row.className}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{ paddingX: 0 }}
                                        >
                                            {row.birth}학년변환
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{ paddingX: 0 }}
                                        >
                                            {row.usingRounds}/{row.paymentRound}
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
