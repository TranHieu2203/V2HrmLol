export interface ICategory {
    catID: number,
    category: string,
    catOrder: number,
    catDescription: string,
    featherClass: string,
    imgURL: string,
    active: boolean,
    adminOnly: boolean,
    modifiedDate: Date | null,
}