import React from 'react'
import { connect } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import { Stack, TextField, MenuItem, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import NewBetModal from '../../modals/newBet'

// Styled Components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.35),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.45),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '35ch',
      },
    },
  },
}));

const Control = ({ user: {user} }) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const [status, setStatus] = React.useState(-1);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const statuses = [
    // All Status
    {
      value: -1,
      label: 'All',
    },
    // open bet
    {
      value: 0,
      label: 'Open bets',
    },
    // closed bet
    {
      value: 1,
      label: 'Closed bets',
    },
  ];

  return (
    <Stack
      direction={{ md: 'row', xs: 'column' }}
      justifyContent={isDesktop ? 'space-between' : 'center'}
      alignItems="center"
      sx={{
        background: 'rgb(255, 255, 255, 0.4)',
        padding: '15px',
        borderRadius: '5px',
      }}
    >
      {/* Filtering status */}
      <Stack>
        <TextField
          id="outlined-select-status"
          select
          label="Status"
          value={status}
          onChange={handleChange}
          sx={{
            width: "165px"
          }}
        >
          {statuses.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      {/* Search bar */}
      <Stack>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search user…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </Stack>
      <Stack>
        <NewBetModal
          user={user}
        />
      </Stack>
    </Stack>
  )
}

Control.propTypes = {
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(Control)
