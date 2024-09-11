export interface Repository<Data> {
    findAll(): Promise<Array<Data>>;
    findById(id: string): Promise<Data | null>;
    create(data: Omit<Data, 'id'>): Promise<Data>;
    update(id:string, data: Partial<Data>): Promise<Data | null>;
    deleteById(id:string): Promise<boolean>;
}