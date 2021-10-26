const express = require("express");
const ProfileController = require('../controllers/profile.controller');

const router = express.Router();

router.post("", ProfileController.createProfile);
router.put("/:id", ProfileController.updateProfile);
router.get("", ProfileController.getAllProfiles);
router.get("/:id", ProfileController.getOneProfile)
router.delete("/:id", ProfileController.deleteProfile);

module.exports = router;
