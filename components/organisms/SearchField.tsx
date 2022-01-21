const wikiConfig = require('../../wiki.config.json')
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { InputBase, Box, Autocomplete, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const searchOptions = []
wikiConfig.menuElements.map(item => {
  item.children && item.children.map(item => {
    if (item.component !== null && item.component !== '') {
      searchOptions.push({
        component: item.component,
        label: item.label
      })
    } else {
      item.subItems && item.subItems.map(item => {
        if (item.component !== null && item.component !== '') {
          searchOptions.push({
            component: item.component,
            label: item.label
          })
        }
      })
    }
  })
})

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  margin: '0 40px'
})

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

export default function SearchField({ setSelectedComponent }) {
  const [value, setValue] = React.useState<string | null>('')

  const handleSearchChange = (newValue) => {
    setValue(newValue)
    if (newValue) {
      const componentExists = searchOptions.indexOf(newValue) !== -1 ? true : false
      if (componentExists) setSelectedComponent(newValue.component)
    }
  }

  return (
    <StyledBox>
      <Search>
        <Autocomplete
          size='small'
          id="search"
          sx={{ width: 300 }}
          options={searchOptions}
          autoHighlight
          value={value}
          onChange={(event: any, newValue: string | null) => handleSearchChange(newValue)}
          freeSolo
          renderInput={(params) => (
            <TextField
              sx={{
                color: '#fff',
                '& .MuiInputBase-input': {
                  color: '#fff',
                  width: '100%',
                },
              }}
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <React.Fragment>
                    <SearchIcon sx={{ margin: 'auto 5px', color: '#fff' }} />
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </Search>
    </StyledBox>
  )
}