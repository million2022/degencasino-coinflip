import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles'
import {
  Stack,
  TextField,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider
} from '@mui/material'
import { useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import CloseIcon from '@mui/icons-material/Close'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

// Custom Bootstrap Dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    background: 'rgb(255, 255, 255, 0.8)',
    border: '1px solid #1B2437',
    boxSizing: 'border-box',
    borderRadius: '6px',
    width: '100%'
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ margin: 'auto', p: 2, color: 'rgb(20, 30, 40)' }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#58627A',
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

function BuyToken(props) {
  const { onClose, open } = props;

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  // State variables
  const [eth, setEth] = useState(0)
  const [chips, setChips] = useState(0)

  return (
    < BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={() => {onClose()}}
      sx={{
        width: isDesktop ? '541px' : '350px',
        margin: 'auto',
      }}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={() => {onClose()}}
      >
        Buy $CHIPS
      </BootstrapDialogTitle>
      <Divider />
      <DialogContent >

        {/* Eth and Chips */}
        <Stack>
          <Typography sx={{
            color: "rgb(20, 30, 40)",
            fontFamily: 'Helvetica',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '20px',
          }}>
            ETH
          </Typography>
          <TextField
            fullWidth
            autoComplete="eth"
            label="amount"
            sx={{ marginTop: '10px' }}
            value={eth}
            onChange={(e) => setEth(e.target.value)}
            InputProps={{
              endAdornment: <SyncAltIcon />,
            }}
          />

          <Typography sx={{
            color: "rgb(20, 30, 40)",
            fontFamily: 'Helvetica',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '20px',
            marginTop: '10px'
          }}>
            $CHIPS
          </Typography>
          <TextField
            fullWidth
            autoComplete="chips"
            label="amount"
            sx={{ marginTop: '10px' }}
            value={chips}
            onChange={(e) => setChips(e.target.value)}
            InputProps={{
              readOnly: true,
              endAdornment: <SyncAltIcon />,
            }}
          />
        </Stack>

        <Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
          <Button variant="outlined" startIcon={<CurrencyExchangeIcon />} sx={{
            borderRadius: '20px',
          }}>
            ETH
            <SyncAltIcon sx={{ m: 1 }} />
            $CHIPS
          </Button>
        </Stack>
      </DialogContent>
    </BootstrapDialog >
  );
}

BuyToken.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default BuyToken
