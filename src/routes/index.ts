import { Router } from 'express';

/* Controllers */
import mediaController from '../controllers/MediaController';

/* Validators */

const router = Router();

router.get('/media', mediaController.getAll);
router.post('/media', mediaController.create);

router.get('/info', (req, res) => {
    res.send('Hello from Media Service');
});

export default router;