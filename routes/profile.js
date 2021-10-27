const express = require("express");
const ProfileController = require('../controllers/profile.controller');
const fileChecker = require('../middleware/file');

const router = express.Router();

router.post("", fileChecker, ProfileController.createProfile);
router.put("/:id", fileChecker, ProfileController.updateProfile);
router.get("", ProfileController.getAllProfiles);
router.get("/:id", ProfileController.getOneProfile)
router.delete("/:id", ProfileController.deleteProfile);

module.exports = router;
