import AWS from "aws-sdk";
const logger = require('../logger');

export interface IS3Config {
    accessKeyId?: string;
    secretAccessKey?: string;
    region?: string;
    endpoint?: string;
    offlineKey?: string;
    hostUrl?: string;
    bucketName?: string;
}

export interface IPutObject {
    bucket: string;
    key: string;
    body: string;
}


class Storage {

    protected s3;

    constructor(options: IS3Config) {
        this.s3 = new AWS.S3(options);
    }
    /**
     *
     * @param {Object} data
     * @returns {Promise<*>}
     */
    async putObject(data: IPutObject) {

        const params = {
            Bucket: data.bucket,
            Key: data.key,
            Body: Buffer.from(data.body, 'base64')
        };

        try {
            return await this.s3.putObject(params).promise();
        } catch (e) {
            console.log(`Download to S3 Failed: ${e}`);
        }
    }

    /**
     *
     * @param {Object} data
     * @returns {Promise<*>}
     */
    async putCsv(data) {
        const params = {
            Bucket: data.bucket,
            Key: data.key,
            Body: data.buffer,
            ContentType: 'text/csv',
            ContentEncoding: 'utf-8'
        };

        try {
            return await this.s3.putObject(params).promise();
        } catch (e) {
            logger.error(`Download to S3 Failed: ${e}`);
        }
    }

    /**
     *
     * @param {Object} params
     * @param {String} file
     * @returns {Promise<*>}
     */
    async getObject(params, file) {
        try {
            return await this.s3
                .getObject(params)
                .createReadStream()
                .pipe(file);
        } catch (e) {
            logger.error(`Cannot Get File from S3: ${e}`);
        }
    }
}

export default Storage;
