import express from 'express';
import IndexController from '../controllers/index.controller.js';
const router = express.Router();

const indexController = new IndexController();

router.get('/test', indexController.test);
router.get('/get-example', indexController.getExample);
router.post('/add-example', indexController.createExample);
router.put('/update-example/:id', indexController.updateExample);
router.delete('/delete-example/:id', indexController.deleteExample);

export default router;
