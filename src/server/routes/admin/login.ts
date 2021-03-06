import { Router } from 'express';
import { AdminRenderer } from './../../controllers/admin/adminRenderer';

let router;

export default () => {
    router = Router();

    
    router.get('/', (req, res, next) => {
        AdminRenderer.render({
            template: 'login',
            layout: 'login'
        }, (html) => {
            res.status(200).send(html);
        });
    });

    return router
}