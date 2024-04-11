// hooks
import { useNavigate } from 'react-router-dom';
// Material UI
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// Buttons
import WhiteBtn from 'components/Buttons/WhiteBtn';

// type
import type { ColumnType } from 'layouts/Admin/Home';

// colors
import colors from 'assets/colors/palette';

interface EgPageTableType {
    rows: any;
    columns: ColumnType[];
    btnLink?: string;
}

const EgPageTable = ({ columns, rows, btnLink }: EgPageTableType) => {
    const { egPurple } = colors;
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table
                    stickyHeader
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHead sx={{ '.MuiTableCell-root': { background: egPurple.superLight } }}>
                        <TableRow>
                            {columns.map((column: ColumnType) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{
                            '.MuiTableRow-hover:hover': { background: `${egPurple.superLight} !important` },
                            '.Mui-selected': { background: `${egPurple.superLight} !important` },
                        }}
                    >
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any, idx: number) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={idx}
                                    >
                                        {columns.map((column: ColumnType) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.id === 'thumnail' ? (
                                                        <div>
                                                            <img
                                                                src={value}
                                                                alt="thumnail"
                                                                className="object-cover w-12 h-12 rounded-full"
                                                            />
                                                        </div>
                                                    ) : column.id === 'infoBtn' ? (
                                                        <WhiteBtn
                                                            content={row.infoBtn}
                                                            func={() =>
                                                                btnLink &&
                                                                (rows[idx].userId
                                                                    ? navigate(`${btnLink}/${rows[idx].userId}`)
                                                                    : rows[idx].coachId
                                                                    ? navigate(`${btnLink}/${rows[idx].coachId}`)
                                                                    : navigate('/admin'))
                                                            }
                                                        />
                                                    ) : (
                                                        <div>{value}</div>
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage=""
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default EgPageTable;
