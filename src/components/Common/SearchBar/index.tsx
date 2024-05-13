import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// icons
import { IoMdSearch } from 'react-icons/io';

interface SearchBarType {
    searchFunc: () => void;
    searchInput: string;
    setSearchInput: (value: string) => void;
    barWidth?: string;
    placeholder?: string;
}

const SearchBar = ({
    searchFunc,
    searchInput,
    setSearchInput,
    barWidth = '18rem',
    placeholder = '',
}: SearchBarType) => {
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ position: 'relative', height: 'fit-content' }}
        >
            <TextField
                sx={{
                    width: barWidth,
                    paddingRight: '2rem',
                    paddingTop: '0.5rem',
                }}
                placeholder={placeholder}
                onChange={(e) => setSearchInput(e.target.value)}
                value={searchInput}
                variant="standard"
            />

            <IoMdSearch
                onClick={() => searchFunc()}
                className="absolute w-10 h-10 hover:bg-[rgba(0,0,0,0.05)] rounded-full p-2 right-1.5 top-1"
            />
        </Box>
    );
};
export default SearchBar;
