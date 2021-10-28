const Profile = require('../models/profile.model');

exports.createProfile = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const profile = new Profile({
    fname: req.body.fname,
    mname: req.body.mname,
    lname: req.body.lname,
    birthday: req.body.birthday,
    about: req.body.about,
    imagePath: req.file ? url + "/images/" + req.file.filename : ""
  });
  profile.save().then(createdProfile => {
    res.status(201).json({
      message: "profile added successfully",
      profile: createdProfile
    });
  })
  .catch(error => {
    res.status(400).json({
      message: "creating a profile failed"
    })
  });
}

exports.updateProfile = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const imagePath = req.imagePath ? req.body.imagePath : url + "/images/" + req.file.filename;
  const profile = new Profile({
    _id: req.body.id,
    fname: req.body.fname,
    mname: req.body.mname,
    lname: req.body.lname,
    birthday: req.body.birthday,
    about: req.body.about,
    imagePath: imagePath
  });
  Profile.updateOne({_id: req.params.id}, profile)
    .then(result => {
      if (result.n > 0)
        res.status(200).json({imagePath: imagePath});
      else
        res.status(401).json({message: "Not authorized!"});
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update profile!"
      })
    });
}

exports.getAllProfiles = (req, res, next) => {
  Profile.find().then(documents => {
    res.status(200).json(documents);
  })
  .catch(error => {
    res.status(500).json({message: "fetching profiles failed"});
  })
}

exports.getOneProfile = (req, res, next) => {
  Profile.findById(req.params.id)
    .then(profile => {
      if (profile) {
        res.status(200).json(profile)
      } else {
        res.status(404).json({message: "profile not found"});
      }
    })
    .catch(error => {
      res.status(500).json({message: "Fetching profile failed!"})
    });
}

exports.deleteProfile = (req, res, next) => {
  Profile.deleteOne({_id: req.params.id})
    .then(result => {
      if (result.n > 0)
        res.status(200).json({ message: "Profile Deleted!"});
      else
        res.status(401).json({message: "Not authorized!"});
    })
    .catch(error => {
      res.status(500).json({message: "Deleting profile failed!"});
    });
}
