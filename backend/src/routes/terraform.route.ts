import {Router} from 'express';
import { chatController } from '../controllers/chat.controller';
import { terraformController } from '../controllers/terraform.controller';

export const terraformRouter = Router();

terraformRouter.post('/', terraformController.generateterraform.bind(terraformController));