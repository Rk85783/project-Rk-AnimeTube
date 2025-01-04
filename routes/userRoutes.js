import express from "express";
import { getAllUsersList } from "../controllers/userController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get('/', authenticate, authorize(['admin']), getAllUsersList);

export default router;