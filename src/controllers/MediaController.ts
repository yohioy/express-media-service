import config from 'config';
import { Response } from 'express';
import pa from 'path';
import { Media, IAddMedia } from "../modules/media";
import logger from '../lib/logger';
import {responseType} from '../lib/responseTypes';
import Storage, { IS3Config, IPutObject } from '../lib/s3/storage';

class MediaController {

    async create(req, res: Response) {

        const s3Config: IS3Config = config.get('S3');

        const options = { db: req.app.locals.db };
        const { body, files } = req;
        const { data, name, mimetype, size } = files.image_file;
        const { image_type } = body;
        const { hostUrl, endpoint, bucketName } = s3Config;

        let subDir = '';
        switch (mimetype) {
            case 'image/jpeg':
                subDir = 'images';
                break;
            case 'image/jpg':
                subDir = 'images';
                break;
            default:
                subDir = '';
                break
        }

        const assetDir = `${bucketName}/${subDir}`;

        const assetUrl =  `${hostUrl}/${name}`;

        let s3options = {
            endpoint: endpoint ? endpoint : undefined,
            s3ForcePathStyle: true
        };
        if(s3Config.offlineKey){
            // Only for Offline
            s3options = {
                ...s3options,
                ...{
                    accessKeyId: 'S3RVER',
                    secretAccessKey: 'S3RVER'
                }
            }
        }

        let imageData: IPutObject = {
            bucket: assetDir,
            key: name,
            body: data
        };

        const storage = new Storage(s3options);
        const response = await storage.putObject(imageData);

        if(!response.ETag) {
            return res.status(responseType.failed.code).json(responseType.failed);
        }

        const media = new Media(options);

        const createObject: IAddMedia = {
            fileName: name,
            fileDescription: '',
            fileHeight: '',
            fileWidth: '',
            fileSize: size,
            fileStorageType: 's3',
            fileUrl: assetUrl,
            fileMimeType: mimetype,
            imageType: image_type,
            createdDate: Date.now(),
            modifiedDate: Date.now()
        };

        try {
            const response = await media.create(createObject);
            res.status(responseType.success.code).json(responseType.success)
        } catch (e) {
            logger.error(e);
            res.status(responseType.failed.code).json(responseType.failed);
        }
    }


    async getAll(req, res: Response) {
        const options = { db: req.app.locals.db };
        const media = new Media(options);
        const query = req.query;

        try {
            const response = await media.getAll(query);
            res.status(responseType.success.code).json({total: response.length, data: response});

        } catch (e) {
            logger.error(e);
            res.status(responseType.failed.code).json(responseType.failed);
        }
    }

}

export default new MediaController();