import Joi from 'joi';
import { IOptions } from './IOptions';

export const consultantValidation = async (data: object, options: IOptions) => {

    const pageStatusTypes = options.pageStatusTypes;
    const templateTypes = options.templateTypes;

    const schema = Joi.object({
        pageName: Joi.string().required(),
        longDescription: Joi.string(),
        shortDescription: Joi.string(),
        parentPage: Joi.string(),
        strapLine: Joi.string(),
        seoFriendlyLinkId: Joi.string(),
        customLink: Joi.string(),
        metaTitle: Joi.string(),
        metaDescription: Joi.string(),
        metaKeywords: Joi.string(),
        images: Joi.array(),
        template: Joi.string().valid(...templateTypes).required(),
        menuLocation: Joi.string(),
        relatedPages: Joi.object(),
        plugins: Joi.array(),
        pageStatus: Joi.string().valid(...pageStatusTypes).required(),
        profileLetter: Joi.string(),
        qualifications: Joi.string(),
        hospitals: Joi.string(),
        clinicalInterests: Joi.string(),
        contactEmail: Joi.string().email(),
        contactTelephone: Joi.string(),
        websiteAddress: Joi.string(),
        clinicTimes: Joi.array(),
        specialities: Joi.array(),
        services: Joi.array()
    }).required();

    try {
        return await schema.validateAsync(data);
    }
    catch (e) {
        throw e;
    }
}