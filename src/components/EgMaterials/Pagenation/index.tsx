// hooks
import { useState } from 'react';
import * as React from 'react';
// Material UI
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// colors
import colors from 'assets/colors/palette';

interface PaginationRoundedType {
    totalItems: number;
    itemsPerPage: number;
    curPage: number;
    setCurPage: (page: number) => void;
    onPageChange?: any;
}

export default function PaginationRounded({
    totalItems,
    itemsPerPage,
    curPage,
    setCurPage,
    onPageChange,
}: PaginationRoundedType) {
    const { egPurple, egWhite } = colors;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
        // 현재 페이지 변경
        setCurPage(page);
        // 페이지 불러오는 함수면 될듯
        // onPageChange();
    };
    return (
        <Stack spacing={2}>
            <Pagination
                count={totalPages}
                page={curPage}
                onChange={handleChange}
                shape="rounded"
                sx={{
                    '.MuiPagination-ul .MuiButtonBase-root': { color: egPurple.default },
                    '.Mui-selected': { background: egPurple.light },
                }}
            />
        </Stack>
    );
}
