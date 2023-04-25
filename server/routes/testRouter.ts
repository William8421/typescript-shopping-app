import express from 'express';
import { getTest, postTest } from "../controllers/testController";

const router = express.Router()

router.get('/', getTest)
router.post('/', postTest)

export default router