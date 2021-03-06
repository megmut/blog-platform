import { BaseController } from '../baseController';
import { PageModel } from '../../models/mysql/pages';

export class PageController extends BaseController {
    public static getListOfPages() {
        return new Promise((resolve, reject) => {
            PageModel.getPages()
                .then((pages) => {
                    let count: number = pages.length;
                    let published: number = 0;
                    for(let page of pages) {
                        if(page.published) {
                            published++;
                        }
                    }
                    resolve({
                        pages: pages,
                        pageCount: count,
                        pagesPublished: published
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }

    public static getSinglePage(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            PageModel.getPage(id)
                .then((page) => {
                    resolve(page);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }

    public static getSinglePageBySlug(slug: string): Promise<any> {
        return new Promise((resolve, reject) => {
            PageModel.getPageByUrl(slug)
                .then((page) => {
                    resolve(page);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }

    public static updatePage(payload, id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            /**
             * TODO do serverside validation here
             */
            let name = payload.name;
            let description = payload.description;
            let content = payload.content;
            let url = payload.url;
            let published = payload.published;
            let layout = payload.layout;
            let template = payload.template;

            PageModel.updatePage(name, description, content, url, published, layout, template, id)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
        })
    }
    
}