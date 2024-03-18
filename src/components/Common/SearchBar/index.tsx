import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// icons
import { IoMdSearch } from 'react-icons/io';

const SearchBar = () => {
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ position: 'relative', height: 'fit-content' }}
        >
            <TextField
                sx={{
                    width: '20rem',
                    paddingRight: '2`rem',
                    paddingTop: '0.5rem',
                }}
                variant="standard"
            />

            <IoMdSearch className="absolute w-10 h-10 hover:bg-[rgba(0,0,0,0.05)] rounded-full p-2 right-1.5 top-1" />
        </Box>
    );
};
export default SearchBar;
