import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles'
import {
  Stack,
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
import LoginIcon from '@mui/icons-material/Login'

// Custom Bootstrap Dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    background: 'rgba(255, 255, 255, 0.85)',
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

function JoinGame(props) {
  const { closeOpenBet } = props

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  // States
  const [open, setOpen] = useState(false);
  const [betType, setBetType] = useState('')
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (open === true) {
      console.log(open, seconds)
      // setSeconds(5)
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        if (Math.random() <= 0.5) {
          setBetType('HEADS')
        } else {
          setBetType('TAILS')
        }
      }
    }
  }, [open, seconds])

  return (
    <>
      {/* Join Game Button */}
      <Button variant="contained" startIcon={<LoginIcon />} autoFocus onClick={() => {
        setOpen(true)
      }} style={{
        color: '#fff',
        borderRadius: '20px',
        fontSize: '10px',
        lineHeight: '12px',
        fontWeight: '900',
        background: 'linear-gradient(0deg, #11BB77 20%, #11EE77 100%)',
        fontFamily: 'Helvetica',
        textShadow: '0px 1px 2px rgba(0, 0, 0, 0.5)',
      }}>
        Join Game
      </Button>
      {/* Modal */}
      < BootstrapDialog aria-labelledby="customized-dialog-title" open={open} sx={{ width: isDesktop ? '541px' : '350px', margin: 'auto' }}
        onClose={() => {
          setOpen(false)
          closeOpenBet()
        }}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => {
          setOpen(false)
          closeOpenBet()
        }}>
          Playing Game
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

            {/* Winner Side */}
            <Stack>
              {seconds === 0 ?
                <div id="coin" className={betType}>
                  <div className="side-a">
                    <img
                      src="/assets/tails.png"
                      alt="winner-side"
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '32px',
                        filter: 'drop-shadow(0px 4px 20px rgba(16, 229, 122, 0.15))',
                      }}
                    />
                  </div>
                  <div className="side-b">
                    <img
                      src="/assets/heads.png"
                      alt="winner-side"
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '32px',
                        filter: 'drop-shadow(0px 4px 20px rgba(16, 229, 122, 0.15))',
                      }}
                    />
                  </div>
                </div> :
                <div style={{
                  color: "rgb(20, 30, 40)",
                  textAlign: 'center',
                  fontFamily: 'Helvetica',
                  fontStyle: 'normal',
                  fontWeight: 900,
                  fontSize: '48px',
                  lineHeight: '54px',
                }}
                >
                  {seconds}
                </div>
              }
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

JoinGame.propTypes = {
};

export default JoinGame
