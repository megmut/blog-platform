import { Router } from 'express';
import { AdminRenderer } from './../../controllers/admin/adminRenderer';
import { Authentication } from './../../controllers/core/authentication';

let router;

export default () => {
    router = Router();

    router.get('/general', Authentication.isAdmin, (req, res, next) => {
        AdminRenderer.render({
            template: 'settings/general',
        }, (html) => {
            res.status(200).send(html);
        });
    });

    router.get('/logs', Authentication.isAdmin, (req, res, next) => {
        AdminRenderer.render({
            template: 'settings/logs',
        }, (html) => {
            res.status(200).send(html);
        });
    });

    router.get('/stats', Authentication.isAdmin, (req, res, next) => {
        AdminRenderer.render({
            template: 'settings/stats',
        }, (html) => {
            res.status(200).send(html);
        });
    });

    return router
}