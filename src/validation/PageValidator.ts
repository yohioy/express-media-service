import { Response } from 'express';
import { pageStatusTypes, templateTypes } from './enum';

import logger from "../lib/logger";
import {responseType} from "../lib/responseTypes";
import { pageValidation } from '../lib/validation'

class PageValidator {

    async create(req, res: Response, next) {

        const payload = req.body;

        try {
            req.body = await pageValidation(payload, { pageStatusTypes: pageStatusTypes, templateTypes: templateTypes });
            next();
        } catch (e) {
            logger.error(e);
            responseType.failed.more_info = e.details[0].message;
            res.status(responseType.failed.code).json(responseType.failed);
        }
    }


    async update(req, res: Response, next) {
        const id = req.params.id;
        let payload = req.body;

        if(!id) {
            return res.status(responseType.failed.code).json(responseType.failed);
        }

        try {
            req.params.id = id;
            req.body = await pageValidation(payload, { pageStatusTypes: pageStatusTypes, templateTypes: templateTypes });
            next();
        } catch (e) {
            logger.error(e);
            responseType.failed.more_info = e.details[0].message;
            res.status(responseType.failed.code).json(responseType.failed);
        }
    }
}
export default new PageValidator();
