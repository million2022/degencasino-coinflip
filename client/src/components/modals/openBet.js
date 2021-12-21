import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import {
  Stack,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Box,
} from '@mui/material'
import { useTheme } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import CloseIcon from '@mui/icons-material/Close'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import JoinGameModal from './joinGame'

// Custom BootstrapDialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'rgba(255, 255, 255, 0.7)',
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

// ```````````````````````````````````````````````````````````````````````````````````````````````` //

function OpenBet(props) {
  const { onClose, open } = props;

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  // const [selected, setSelected] = useState('heads')
  let selected = 'heads'

  return (
    < BootstrapDialog
      onClose={() => { onClose() }}
      fullWidth={true}
      maxWidth="md"
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{
        width: isDesktop ? '541px' : '350px',
        margin: 'auto',
      }}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={() => { onClose() }}>
        Open Bet
      </BootstrapDialogTitle>
      <Divider />
      <DialogContent >
        <Stack direction="row" justifyContent='space-around'>
          {/* First Player */}
          <Stack alignItems="center" spacing={3}>
            <img
              src="/assets/James.png"
              alt="avatar"
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '48px',
              }} />
            <Stack direction="row" alignItems="center" sx={{
              background: 'rgba(255, 255, 255, 0.7)',
              padding: '10px 30px',
              borderRadius: '10px',
            }}>
              {
                selected ?
                  <img src={`/assets/${selected}.png`} alt="prefix" style={{
                    width: '28px',
                    height: '28px',
                    marginRight: '10px'
                  }} /> :
                  ''
              }
              1250 $CHIPS
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

          {/* Second Player */}
          <Stack alignItems="center" spacing={3}>
            <Stack justifyContent="center" alignItems="center" style={{
              width: '48px',
              height: '48px',
              borderRadius: '48px',
              border: '1.5px solid #58627A',
            }}>
              <QuestionMarkIcon />
            </Stack>
            <Box variant="contained" sx={{
              background: 'rgba(255, 255, 255, 0.7)',
              padding: '10px 30px',
              borderRadius: '10px'
            }}>
              Joinable...
            </Box>
            {/* Join Game */}
            <JoinGameModal
              closeOpenBet={onClose}
            />
          </Stack>
        </Stack>
      </DialogContent>
    </BootstrapDialog >
  );
}

OpenBet.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default OpenBet
