import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'
import { Button, Typography, useMediaQuery, Stack, Popover, Divider } from '@mui/material'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { injected } from '../../utils/gameContract.js'
import { UPLOADED_FILE_PATH } from '../../utils/constants';
import { useWeb3React } from "@web3-react/core"
import BuyToken from '../modals/buyToken'
import ProfileModal from '../modals/profile'

const Navbar = ({user: {user}}) => {
  // For responsive
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  // State variables
  const [openBuyToken, setOpenBuyToken] = React.useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const { account, activate, deactivate } = useWeb3React()

  useEffect(() => {
    async function fetchData() {
    }

    fetchData()
  }, [])

  // Control Modals
  const handleClose = () => {
    setOpenBuyToken(false)
    setOpenProfile(false)
    setAnchorEl(null)
  }
  // Control Popover
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // Unsigned users section
  const userLinks = (
    <ul>
      <Button
        aria-describedby={id}
        variant="contained"
        size="large"
        onClick={account ? (e) => {setAnchorEl(e.currentTarget)} : () => { 
          activate(injected)
        }}
        endIcon={<UnfoldMoreIcon />}
        sx={{
          borderRadius: '20px',
          fontWeight: 'bold',
          background:
            'linear-gradient(120deg , #dc2424 15%, #4a569d 80%)',
          '&:hover': {
            background:
              'linear-gradient(120deg , #4a569d 15%, #dc2424 80%)'
          }
        }}
      >
        <Stack spacing={3} direction="row" alignItems="center">
          {
            account ?
              !user || user.avatar === '' ?
                (
                  <img src="/assets/default.png" alt="avatar" style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '20px',
                    marginRight: '10px'
                  }} />
                ) :
                (
                  <img
                    src={UPLOADED_FILE_PATH + user.avatar}
                    alt="avatar" style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '20px',
                      marginRight: '10px'
                    }} />
                ) :
              ''
          }

          {
            account ?
              !user || user.name === '' ? (
                ' ' +
                String(account).substring(0, 6) +
                '...' +
                String(account).substring(38)
              ) :
                user.name : (
                <span>🦊 Connect Wallet</span>
              )
          }
        </Stack>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null)
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Button
          onClick={() => { setOpenProfile(true) }}
          sx={{
            p: 2,
            cursor: 'pointer',
            '&:hover': {
              color: '#10E57A'
            }
          }}>
          My Profile
        </Button>
        <Divider />
        <Button
          onClick={() => {
            deactivate()
            setAnchorEl(null)
          }}
          sx={{
            p: 2,
            cursor: 'pointer',
            '&:hover': {
              color: '#10E57A'
            }
          }}>
          Disconnect
        </Button>
      </Popover>
    </ul >
  )

  if (isDesktop) {
    return (
      <nav className="navbar">
        <Stack direction="row" justifyContent={isDesktop ? 'space-between' : 'center'} flexWrap="wrap" alignItems="center" sx={{
          width: '100%',
          borderBottom: 'solid 1px #fffffd',
          borderRadius: '1px',
          paddingBottom: '10px'
        }}
        >
          {/* Logo */}
          <Stack direction="row" justifyContent="center" alignItems='center'>
            <Link to="/">
              <Typography style={{
                fontFamily: 'Helvetica',
                fontSize: '24px',
                fontWeight: 700,
                lineHeight: '100%'
              }}
              >
                DEGEN CASINO
              </Typography>
              <span style={{
                fontFamily: 'Helvetica',
                fontSize: '14px',
                color: '#dc2424',
                fontWeight: 600,
              }}
              >
                COIN FLIP GAME
              </span>
            </Link>
          </Stack>
          {/* Balance and Buy token */}
          {
            account ?
              <Stack direction="row" spacing={3} justifyContent="center" alignItems="center" sx={{
                background: 'rgb(255,255, 255, 0.5)',
                boxSizing: 'border-box',
                borderRadius: '8px',
                padding: '6px 16px',
              }}>
                <Typography style={{
                  color: '#EBEBEB',
                  fontStyle: 'normal',
                  fontSize: '16px',
                  fontWeight: 900,
                  lineHeight: '20px',
                  fontFamily: 'Helvetica',
                  letterSpacing: '0.02em'
                }}
                >
                  500 $CHIPS
                </Typography>
                <Button variant="outlined" startIcon={<CurrencyExchangeIcon />} disabled={!account} sx={{ borderRadius: '20px' }} onClick={() => { setOpenBuyToken(true) }}>
                  Buy $chips
                </Button>
              </Stack> :
              ''
          }
          {/* Connect Wallet Button */}
          {userLinks}
        </Stack>

        {/* Modals */}
        <BuyToken
          open={openBuyToken}
          onClose={handleClose}
        />
        <ProfileModal
          open={openProfile}
          onClose={handleClose}
        />
      </nav>
    )
  } else {
    return (
      <nav className="navbar">
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Link to="/">
            <Typography style={{
              color: '#ffffff',
              fontSize: '24px',
              fontWeight: 600,
              lineHeight: '100%',
              fontFamily: 'Helvetica',
              letterSpacing: '0.02em'
            }}
            >
              GENEN CASINO
            </Typography>
            <span style={{
              color: '#58627A',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '100%',
              fontFamily: 'Helvetica',
            }}
            >
              COIN FLIP GAME
            </span>
          </Link>
        </Stack>
        <Fragment>{userLinks}</Fragment>
      </nav>
    )
  }
}

Navbar.propTypes = {
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, {})(Navbar)
