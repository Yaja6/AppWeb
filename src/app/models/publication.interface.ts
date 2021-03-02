export interface PublicationInterface {
    id: string;
    title?: string;
    description: string;
    image?: string;
    file?: string;
    fileName?: string;
    video?: string;
    date: Date;
    userId: string;
    category?: string;
    userName?: string;
    userPhoto?: string;
    idSaved?: string;
    idUserSave?: string;
    idReport?: any;
    idUserReported?: string;
    commentReport?: string;
    reasonReport?: string;
    userResolve?: string;
    state?: string;

}
