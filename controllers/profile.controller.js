const { restart } = require('nodemon');
const Profile = require('../models/profile.model');

exports.createProfile = (req, res, next) => {
  const profile = new Profile({
    fname: req.body.fname,
    mname: req.body.mname,
    lname: req.body.lname,
    birthday: req.body.birthday,
    about: req.body.about
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
  const profile = new Profile({
    _id: req.body.id,
    fname: req.body.fname,
    mname: req.body.mname,
    lname: req.body.lname,
    birthday: req.body.birthday,
    about: req.body.about
  })
  Profile.updateOne({_id: req.params.id}, profile)
    .then(result => {
      if (result.n > 0)
        res.status(200).json({message: "Update successful"});
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
    console.log("fetched profiles");
    res.status(200).json(documents);
  })
  .catch(error => {
    res.status(500).json({message: "fetching profiles failed"});
  })
}
/*exports.getAllProfiles = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const query = req.query.query;
  let profileQuery = Profile.find({ name: { $regex: new RegExp(query, "i") } });
  let fetchedProfiles;
  if (pageSize && currentPage && !query) {
    profileQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize)
  }
  profileQuery.then(documents => {
    if (query) {
      fetchedProfiles = documents.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize > documents.length ? documents.length : currentPage * pageSize
      );
      return documents.length;
    } else {
      fetchedProfiles = documents;
      return Profile.countDocuments();
    }
  })
  .then(count => {
    res.status(200).json({
      message: "Profiles successfully fetched",
      profiles: fetchedProfiles.sort(),
      maxProfiles: count
    });
  })
  .catch(error => {
    res.status(500).json({message: "Fetching profiles failed!"})
  });
}*/

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
