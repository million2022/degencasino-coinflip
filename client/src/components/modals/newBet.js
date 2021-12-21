import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles'
import DialogContent from '@mui/material/DialogContent'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Stack, TextField, Box } from '@mui/material'
import { useTheme } from '@material-ui/core/styles'
import { withStyles, useMediaQuery } from '@material-ui/core'
import CloseIcon from '@mui/icons-material/Close'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Custom styled Typographies
const UnSelectedColor = withStyles({
  root: {
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    background: "rgba(20, 30, 40, 0.5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }
})(Typography)
const SelectedColor = withStyles({
  root: {
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    background: "rgba(20, 30, 40, 0.7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }
})(Typography)

// Customed Dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    overflow: 'hidden',
    height: 'auto'
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    background: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid #1B2437',
    boxSizing: 'border-box',
    borderRadius: '6px',
    width: '100%'
  },
}))

// Set BootstrapDialog's Title
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

// ```````````````````````````````````````````````````````````````````````````````````````````````````````````//

function NewBet(props) {
  const { user } = props
  const amount = 500

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  //State variables
  const [side, setSide] = useState('heads')
  const [value, setValue] = useState(amount / 2)
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      {/* Open NewBet Flip Modal */}
      <Button
        variant="contained"
        onClick={() => {setOpen(true)}}
        disabled={!user}
        startIcon={<AddCircleOutlineIcon />}
        style={{
          color: '#fff',
          borderRadius: '20px',
          fontSize: '10px',
          lineHeight: '12px',
          fontWeight: '900',
          background: 'linear-gradient(0deg, #11BB77 20%, #11EE77 100%)',
          fontFamily: 'Helvetica',
          textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
          height: '39px',
          padding: '10px 18px',
          opacity: `${user ? 1 : 0.3}`
        }}
      >
        Start New Bet
      </Button>
      {/* Dilog for modal */}
      <BootstrapDialog
        onClose={() => {setOpen(false)}}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          width: isDesktop ? '463px' : '350px',
          margin: 'auto',
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={() => {setOpen(false)}}
        >
          Start New Bet
        </BootstrapDialogTitle>

        <Divider />

        <DialogContent >
          <Stack spacing={2}>
            <Typography sx={{
              color: "rgb(20, 30, 40)",
              fontFamily: 'Helvetica',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: '20px',
            }}>
              Set Bet Side
            </Typography>

            <Stack direction="row" justifyContent="space-around">
              {/* Heads */}
              <Stack spacing={2} alignItems="center" onClick={() => { setSide('heads') }} sx={{
                  background: side && side === 'heads' ? 'linear-gradient(45deg, rgba(20, 30, 40, 0) 0%, #11CC77 180%)' : 'rgb(255, 255, 255, 0.7)',
                  boxShadow: '0px 2px 2px 0px #0000001A',
                  borderRadius: '6px',
                  padding: '20px',
                  cursor: 'pointer',
                  '&:hover': side !== 'heads' ? { background: 'rgba(20, 30, 40, 0.2)' } : ''
                }}>
                <img src="/assets/heads.png" alt="heads" style={{ width: '48px', height: '48px' }} />
                {
                  side && side === 'heads' ?
                    <SelectedColor> Heads </SelectedColor> :
                    <UnSelectedColor> Heads </UnSelectedColor>
                }
              </Stack>
              {/* Tails */}
              <Stack spacing={2} alignItems="center" onClick={() => { setSide('tails') }} sx={{
                  background: side && side === 'tails' ? 'linear-gradient(45deg, rgba(20, 30, 40, 0) 0%, #11CC77 180%)' : 'rgb(255, 255, 255, 0.7)',
                  boxShadow: '0px 2px 2px 0px #0000001A',
                  borderRadius: '6px',
                  padding: '20px',
                  cursor: 'pointer',
                  '&:hover': side !== 'tails' ? { background: 'rgba(20, 30, 40, 0.2)' } : ''
                }}>
                <img src="/assets/tails.png" alt="tails" style={{ width: '48px', height: '48px' }} />
                {
                  side && side === 'tails' ?
                    <SelectedColor> Tails </SelectedColor> :
                    <UnSelectedColor> Tails </UnSelectedColor>
                }
              </Stack>
            </Stack>
          </Stack>

          {/* Set bet amount */}
          <Stack
            mt={2}
            spacing={2}
          >
            <Typography sx={{
              color: "rgb(20, 30, 40)",
              fontFamily: 'Helvetica',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: '20px',
            }}>
              Set Bet Amount
            </Typography>
            <TextField
              fullWidth
              autoComplete="eth"
              label="$CHIPS"
              sx={{ marginTop: '10px' }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              InputProps={{
              }}
            />
            <Button
              variant="contained"
              // onClick={}
              className="new_flip_btn"
              startIcon={<AddCircleOutlineIcon />}
              style={{
                color: '#fff',
                borderRadius: '20px',
                fontSize: '10px',
                lineHeight: '12px',
                fontWeight: '900',
                background: 'linear-gradient(0deg, #11BB77 20%, #11EE77 100%)',
                fontFamily: 'Helvetica',
                textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
                padding: '10px 18px',
                width: '200px',
                margin: 'auto',
                marginTop: '10px'
              }}
            >
              Start New Bet
            </Button>
          </Stack>
        </DialogContent>
      </BootstrapDialog >
    </Box>
  );
}

NewBet.propTypes = {
};

export default NewBet
