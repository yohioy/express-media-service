import { Response } from 'express';
import { pageStatusTypes } from './enum';

import logger from "../lib/logger";
import {responseType} from "../lib/responseTypes";
import { consultantValidation } from '../lib/validation'


class ConsultantValidator {

    async create(req, res: Response, next) {

        const payload = req.body;

        try {
            req.body = await consultantValidation(payload, { pageStatusTypes: pageStatusTypes, templateTypes: ['consultant'] });
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
            req.body = await consultantValidation(payload, { pageStatusTypes: pageStatusTypes, templateTypes: ['consultant'] });
            next();
        } catch (e) {
            logger.error(e);
            responseType.failed.more_info = e.details[0].message;
            res.status(responseType.failed.code).json(responseType.failed);
        }
    }
}
export default new ConsultantValidator();
