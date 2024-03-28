import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationRoundedType {
    pageList: any;
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange?: any;
}

export default function PaginationRounded({
    pageList,
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}: PaginationRoundedType) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handleChange = (e: React.ChangeEvent<unknown>) => {
        console.log(e.target);
    };
    return (
        <Stack spacing={2}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e) => handleChange(e)}
                shape="rounded"
            />
        </Stack>
    );
}
