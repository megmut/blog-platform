import { Router } from 'express';

import { AdminRenderer } from './../../controllers/adminRenderer';
import { PostController } from './../../controllers/postController';

let router;

export default () => {
    router = Router();

    router.get('/view-posts', (req, res) => {
        PostController.getListOfPosts()
            .then((posts) => {
                AdminRenderer.render({
                    template: 'view-posts',
                    data: { posts: posts }
                }, (html) => {
                    res.status(200).send(html);
                });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.get('/edit-post', (req, res) => {
        PostController.getSinglePost(req.query.post_id)
            .then((post) => {
                if (post.length < 1) {
                    AdminRenderer.render({
                        template: 'edit-posts',
                        data: { editorRequired: true, noPost: true }
                    }, (html) => {
                        res.status(200).send(html);
                    });
                    res.render('pages/edit-post', { layout: 'admin', editorRequired: true, noPost: true });
                } else {
                    AdminRenderer.render({
                        template: 'edit-posts',
                        data: { editorRequired: true, post: post[0]}
                    }, (html) => {
                        res.status(200).send(html);
                    });
                }
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    return router
}