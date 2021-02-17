import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity('media')
export class MediaModel {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    fileName: string;

    @Column()
    fileDescription: string;

    @Column()
    fileUrl: string;

    @Column()
    fileStorageType: string;

    @Column()
    fileSize: string;

    @Column()
    fileHeight: string;

    @Column()
    fileWidth: string;

    @Column()
    fileMimeType: string;

    @Column()
    imageType: string;

    @Column()
    createdDate: number;

    @Column()
    modifiedDate: number;

}
