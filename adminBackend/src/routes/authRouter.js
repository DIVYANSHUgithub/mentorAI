import  { signup, login } from  '../controllers/AuthControllers.js'
import { signupValidation, loginValidation } from '../validators/authValidator.js'

import {Router} from 'express'
const router=Router();
router.post('/login', loginValidation, login);
router.post('/signup', signupValidation,signup);
;
export default router