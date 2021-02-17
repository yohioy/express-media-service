import { MediaModel } from './media.model';
import { ObjectModel } from '../core/ObjectModel';

export interface IAddMedia {
    fileName: string;
    fileDescription: string;
    fileHeight: string;
    fileWidth: string;
    fileSize: string;
    fileStorageType: string;
    fileUrl: string;
    fileMimeType: string;
    imageType: string;
    modifiedDate: number;
    createdDate: number;
}

export class Media extends ObjectModel {

    protected readonly options: object;

    constructor (options) {
        super(options, MediaModel);
    }

    describe() {
        console.log(`Media Files: ${this.options}`)
    }

    async create (data: IAddMedia): Promise<object> {
        return super.create(data);
    }

    async update (id: string, data: object): Promise<any> {
        return super.update(id, data);
    }

    async getById (id: string): Promise<any> {
        return super.getById(id);
    }

    async getAll (query: { type?: string }): Promise<any> {

        let filter;

        if(query.type) {
            filter = { where: { template: query.type } }
        }

        return super.getAll(filter);
    }

    async delete (id: string): Promise<any> {
        return super.delete(id);
    }

}
