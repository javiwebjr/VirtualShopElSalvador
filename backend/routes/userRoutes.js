import express from "express";
import { createUser, loginUser, logoutUser, getAllUsers, getProfile, updateProfile, deleteUser, getUser, updateUser } from "../controllers/userController.js";
import { auth, authorizeAdmin } from "../middlewares/AuthMiddleware.js";
const router = express.Router();

router.route('/').post(createUser).get(auth, authorizeAdmin, getAllUsers);
router.post('/auth', loginUser);
router.post('/logout', logoutUser);
router.route('/profile').get(auth, getProfile).put(auth, updateProfile);

router.route('/:id').delete(auth, authorizeAdmin, deleteUser).get(auth, authorizeAdmin, getUser).put(auth, authorizeAdmin, updateUser);

export default router;