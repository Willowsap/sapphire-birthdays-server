const express = require("express");
const ProfileController = require('../controllers/profile.controller');
const file = require('../middleware/file');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post("", checkAuth, file, ProfileController.createProfile);
router.put("/:id", checkAuth, file, ProfileController.updateProfile);
router.get("", ProfileController.getAllProfiles);
router.get("/:id", ProfileController.getOneProfile)
router.delete("/:id", checkAuth, ProfileController.deleteProfile);

module.exports = router;
