'use client';

import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import type { RootState } from '@/store';
import { setSearchQuery } from '@/store/searchSlice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.search.query);

  return (
    <TextField
      size="small"
      placeholder="Search tasks..."
      value={query}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
      sx={{ minWidth: 260 }}
    />
  );
}
