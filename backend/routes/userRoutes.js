//import express from "express";
// import {
//   authUser,
//   registerUser,
//   updateUserProfile,
// } from "../controllers/userController.js";
// import { protect } from "../middleware/authMiddleware.js";
const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');
const router = express.Router();

router.route('/').post(registerUser)
router.route('/login').post(authUser)

//export default router;

module.exports = router
