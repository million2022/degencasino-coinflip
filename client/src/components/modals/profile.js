import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  DialogTitle,
  useMediaQuery,
  FormControl,
  Paper,
  Divider,
  IconButton,
  TextField,
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { manageUser } from '../../actions/user';
import { useWeb3React } from "@web3-react/core"
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Cancel } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  getContract
} from '../../utils/gameContract.js'
import {
  UPLOADED_FILE_PATH
} from '../../utils/constants';
const contractABI = require("../../utils/contract-abi.json");

const Input = styled('input')({
  display: 'none'
});

// Customed Bootstrap Dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'rgba(255, 255, 255, 0.8)',
  },
}))

//------------------------------------------------------------------------------------------------------------------------

const Profile = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  // Props
  const { onClose, open, user: { user }, manageUser } = props;
  // State variables
  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const { library, account } = useWeb3React()

  // Get Game Contract
  const Contract = getContract(
    process.env.REACT_APP_CONTRACTADDRESS,
    contractABI,
    library,
    account
  )
  console.log(Contract)

  //  When click the "Save button"
  const onSubmit = async () => {
    let avatar

    if (image) {
      avatar = image
    } else {
      avatar = user ? user.avatar : ''
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', account);
    formData.append('avatar', avatar)

    manageUser(account, formData)
    onClose();
  }

  return (
    <BootstrapDialog
      fullScreen={fullScreen}
      fullWidth={true}
      maxWidth="md"
      open={open}
      onClose={() => { onClose() }}bo
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" sx={{
        color: 'rgb(20, 30, 40)'
      }}>
        Edit Profile
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack
          spacing={5}
          sx={{ mt: 2 }}
          justifyContent="center"
          alignItems="center"
        >
          <Stack direction="row" spacing={3} alignItems="center">
            {/* Name */}
            <TextField
              name="name"
              label={user ? user.name : ''}
              helperText="You can change your user name."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Stack>
          {/* Logo */}
          <FormControl>
            <Stack
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
              spacing={1}
            >
              {
                image === null ?
                  user && user.avatar !== '' ? (
                    <Box position="relative">
                      <Paper
                        elevation={3}
                        sx={{ width: 128, height: 128, borderRadius: '128px', objectFit: 'cover' }}
                        component="img"
                        src={
                          user.avatar
                        }
                      />
                      <IconButton
                        sx={{ position: 'absolute', top: -10, right: -10 }}
                        onClick={() => { setImage(null) }}
                      >
                        <Cancel />
                      </IconButton>
                    </Box>
                  ) : (
                    <Paper elevation={3} sx={{ width: 128, height: 128, borderRadius: '128px' }} />
                  ) : (
                    <Box position="relative">
                      <Paper
                        elevation={3}
                        sx={{ width: 128, height: 128, borderRadius: '128px', objectFit: 'cover' }}
                        component="img"
                        src={
                          image instanceof Object
                            ? URL.createObjectURL(image)
                            : UPLOADED_FILE_PATH + image
                        }
                      />
                      <IconButton
                        sx={{ position: 'absolute', top: -10, right: -10 }}
                        onClick={() => { setImage(null) }}
                      >
                        <Cancel />
                      </IconButton>
                    </Box>
                  )
              }
              {/* Upload user's image */}
              <Stack>
                <label htmlFor="upload-logo">
                  <Input
                    accept="image/*"
                    id="upload-logo"
                    type="file"
                    onChange={(e) => { setImage(e.target.files[0]) }}
                  />
                  <Button variant="contained" component="span" startIcon={<UploadFileIcon />} style={{
                    color: '#fff',
                    borderRadius: '20px',
                    fontSize: '10px',
                    lineHeight: '12px',
                    fontWeight: '900',
                    background: 'linear-gradient(0deg, #11BB77 20%, #11EE77 100%)',
                    fontFamily: 'Helvetica',
                    textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
                    width: '150px'
                  }}>
                    Upload
                  </Button>
                </label>
              </Stack>
            </Stack>
          </FormControl>
        </Stack>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button autoFocus variant="outlined" startIcon={<CancelIcon />} onClick={() => { onClose() }} sx={{
          borderRadius: '20px',
          fontSize: '10px',
          lineHeight: '12px',
          fontWeight: '900',
          fontFamily: 'Helvetica',
        }}>
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="contained" startIcon={<SaveIcon />} autoFocus style={{
          color: '#fff',
          borderRadius: '20px',
          fontSize: '10px',
          lineHeight: '12px',
          fontWeight: '900',
          background: 'linear-gradient(0deg, #11BB77 20%, #11EE77 100%)',
          fontFamily: 'Helvetica',
          textShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
        }}>
          Save
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}

Profile.propTypes = {
  manageUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, { manageUser })(Profile)
