const mongoose = require('mongoose')
const User = require('../models/User')

// Update User
exports.manageUser = async (req, res) => {
  const { address } = req.params
  const { name } = req.body

  let avatar = ''
  avatar = req.body.avatar ? req.body.avatar : 'non';
  if (req.files.avatar) {
    avatar = req.files.avatar[0].filename;
  }
  // Serch condition
  let setSection = avatar !== 'non' ?
    {
      $set: {
        name,
        avatar: avatar
      }
    } :
    {
      $set: {
        name,
        avatar: ''
      }
    }

  const user = await User.findOne({ address: address })

  if (!user) {
    new User({
      name,
      address: address,
      avatar: avatar
    }).save().then((result) => res.status(200).json(result))
  } else {
    await User.findOneAndUpdate(
      { address: address },
      setSection
    )

    await User.findOne({ address: address })
      .then((result) => res.status(200).json(result))
  }
}

// Get Current User
exports.getUser = async (req, res) => {
  const user = await User.findOne({ address: req.body.address })

  res.status(200).json(user)
}