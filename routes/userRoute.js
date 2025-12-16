const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

router.use(express.json()); 
router.use(express.urlencoded({ extended: false }));

router.post(`/login`, userController.login);
router.post(`/google-login`, userController.loginWithGoogle);
router.get(`/list`, userController.list);
router.post(`/register`, userController.registerUser);
router.delete(`/deleteUser`, userController.deleteUser);
router.post(`/resetPassword`, userController.resetPassword); 
router.post(`/forgotPassword`, userController.forgotPassword);

module.exports = router;
