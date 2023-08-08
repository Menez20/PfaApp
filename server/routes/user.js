import express from 'express';
import { getUser } from '../controllers/user.js';
import { verifyToken } from '../middleware/auth.js';
import { getUsersByRole } from '../controllers/user.js';

const router = express.Router();

router.get('/getusersByRole', getUsersByRole);
router.get('/:id', verifyToken, getUser);

export default router;
