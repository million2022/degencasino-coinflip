import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles'
import {
  Stack,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider
} from '@mui/material'
import { useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import CloseIcon from '@mui/icons-material/Close'

// Custom Bootstrap Dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    background: 'rgba(255, 255, 255, 0.7)',
    width: '100%'
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2, color: 'rgb(20, 30, 40)' }} {...other}>
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

// `````````````````````````````````````````````````````````````````````````````//

function ClosdedBet(props) {
  const { open, onClose } = props

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  // States
  const [betType, setBetType] = useState('')

  useEffect(() => {
    async function init() {
      setBetType('HEADS')
    }

    init()
  })

  return (
    <>
      {/* Modal */}
      < BootstrapDialog aria-labelledby="customized-dialog-title" open={open} sx={{ width: isDesktop ? '541px' : '350px', margin: 'auto' }}
        onClose={() => {onClose()}}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => {onClose()}}>
          Closed Bet
        </BootstrapDialogTitle>
        <Divider />
        <DialogContent >
          <Stack direction="row" mt={2} justifyContent='space-around'>
            {/* First Player */}
            <Stack justifyContent="center" alignItems="center" spacing={3} style={{
              opacity: betType === 'HEADS' || betType === '' ?
                '1' :
                '0.5'
            }}>
              <img src="/assets/Sue.png" alt="avatar" style={{
                width: '48px',
                height: '48px',
                borderRadius: '48px',
              }} />
              <Stack direction="row" alignItems="center" sx={{
                background: 'rgba(255, 255, 255, 1)',
                padding: '10px 30px',
                borderRadius: '10px',
              }}>
                <img src="/assets/heads.png" alt="prefix" style={{
                  width: '28px',
                  height: '28px',
                }} />
                {betType === 'HEADS' ? 2500 : 1250} $CHIPS
              </Stack>
              <Typography sx={{
                color: "rgb(20, 30, 40)",
                fontFamily: 'Helvetica',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: '20px',
                lineHeight: '20px',
              }}>
                Sue
              </Typography>
            </Stack>

            {/* Second Player */}
            <Stack justifyContent="center" alignItems="center" spacing={3} style={{
              opacity: betType === 'TAILS' || betType === '' ? '1' : '0.5'
            }}>
              <img
                src="/assets/James.png"
                alt="avatar"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '48px',
                }} />
              <Stack direction="row" alignItems="center" sx={{
                background: 'rgba(255, 255, 255, 1)',
                padding: '10px 30px',
                borderRadius: '10px',
              }}>
                <img src="/assets/tails.png" alt="prefix" style={{
                  width: '28px',
                  height: '28px',
                }} />
                {betType === 'TAILS' ? 2500 : 1250} $CHIPS
              </Stack>
              <Typography sx={{
                color: "rgb(20, 30, 40)",
                fontFamily: 'Helvetica',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: '20px',
                lineHeight: '20px',
              }}>
                James
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
      </BootstrapDialog >
    </>
  );
}

ClosdedBet.propTypes = {
};

export default ClosdedBet
