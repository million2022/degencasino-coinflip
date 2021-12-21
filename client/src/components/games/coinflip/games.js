import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core'
import { Stack, Typography } from '@mui/material'
import TouchAppIcon from '@mui/icons-material/TouchApp'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import JoinGameModal from '../../modals/openBet'
import ClosedBetModal from '../../modals/closedBet'

const Games = () => {
  //State variables
  const [openJoin, setOpenJoin] = useState(false)
  const [openClosedBet, setOpenClosedBet] = useState(false)

  useEffect(() => {
    async function init() {
    }

    init()
  })

  const handleClose = (value) => {
    setOpenJoin(false)
    setOpenClosedBet(false)
  }

  // Custom Typographies
  const HeaderColor = withStyles({
    root: {
      fontFamily: 'Helvetica',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '20px',
      lineHeight: '24px',
      background: "-webkit-linear-gradient(#ffda6f 15%, #e2a139 56%, #a44e01 80%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
  })(Typography)

  return (
    <>
      {/* Heads */}
      <Stack direction="row" justifyContent={'space-between'} alignItems="center" sx={{
        background: 'rgba(255, 255, 255, 0.4)',
        borderRadius: '2px',
        height: '34px',
        marginBottom: '10px',
        padding: '15px',
        marginTop: '45px'
      }}>
        <HeaderColor> Users </HeaderColor>
        <HeaderColor> Status </HeaderColor>
        <HeaderColor> Value </HeaderColor>
      </Stack>

      {/* Listing */}
      {[...Array(1)].map((_, index) => (
        <Fragment key={index}>
          {/* Join Game */}
          <Stack direction="row" justifyContent={'space-between'} sx={{
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '15px',
            height: '48px',
            marginBottom: '2px',
            borderRadius: '2px'
          }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack >
                <img src="/assets/James.png" alt="avatar" style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '20px',
                }} />
              </Stack>
              <Stack justifyContent="center">
                <Typography sx={{
                  color: "#fff",
                  fontFamily: 'Helvetica',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  lineHeight: '20px',
                }}>
                  James
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center" sx={{ cursor: 'pointer', color: "#10B07A" }} onClick={() => { setOpenJoin(true) }}>
              <TouchAppIcon sx={{ margin: '0px 10px' }} />
              Open Bet
            </Stack>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Stack justifyContent="center">
                <Typography sx={{
                  color: "#fff",
                  fontFamily: 'Helvetica',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  lineHeight: '20px',
                }}>
                  100 $CHIPS
                </Typography>
              </Stack>
              <img src="/assets/heads.png" alt="avatar" style={{ width: '24px', height: '24px' }} />
            </Stack>
          </Stack>

          {/* Winner */}
          <Stack direction="row" justifyContent={'space-between'} sx={{
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '15px',
            height: '48px',
            marginBottom: '2px',
            borderRadius: '2px'
          }}>
            <Stack direction="row" spacing={2} alignItems="center">
              {/* Player */}
              <Stack>
                <img src="/assets/pgp.png" alt="avatar" style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '20px',
                }} />
              </Stack>
              {/* Status */}
              <Stack justifyContent="center">
                <Typography sx={{
                  color: "#fff",
                  fontFamily: 'Helvetica',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  lineHeight: '20px',
                }}>
                  PGP123
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="center" alignItems="center" sx={{ cursor: 'pointer', color: 'rgba(255, 0, 0, 0.7)' }} onClick={() => { setOpenClosedBet(true) }}>
              <ThumbUpAltIcon sx={{ margin: '0px 10px' }} />
              Closed Bet
            </Stack>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <Stack justifyContent="center">
                <Typography sx={{
                  color: "#fff",
                  fontFamily: 'Helvetica',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  lineHeight: '20px',
                }}>
                  100 $CHIPS
                </Typography>
              </Stack>
              <img src="/assets/heads.png" alt="avatar" style={{ width: '24px', height: '24px' }} />
            </Stack>
          </Stack>

          <JoinGameModal
            open={openJoin}
            onClose={handleClose}
          />
          <ClosedBetModal
            open={openClosedBet}
            onClose={handleClose}
          />
        </Fragment>

      ))}
    </>
  );
}

Games.propTypes = {
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {})(Games)
