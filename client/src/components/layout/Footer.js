import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles'
import { Typography, useMediaQuery, Stack } from '@mui/material'

const Footer = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <footer className="footer">
      <Stack
        direction="row"
        justifyContent={isDesktop ? 'space-between' : 'center'}
        alignItems="center"
        flexWrap="wrap"
      >
        <Stack direction="row">
          <Link to="/">
            <Typography
              style={{
                fontFamily: 'Helvetica',
                fontSize: '18px',
                fontWeight: 600,
                lineHeight: '100%'
              }}
            >
              DEGENE CASINO
              <span
                style={{
                  fontFamily: 'Helvetica',
                  fontSize: '12px',
                  color: 'rgb(255, 0, 0, 0.7)',
                }}
              >
                .COIN FLIP GAME
              </span>
            </Typography>
          </Link>
        </Stack>
        <Typography sx={{
          color: 'white',
          fontSize: '12px',
          fontWeight: 600,
        }}>
          Copyright © 2021 DEGEN CASINO
        </Typography>
      </Stack>
    </footer >
  )
}

export default Footer
