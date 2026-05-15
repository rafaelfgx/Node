import { MongoClient, Db, Collection, Document } from "mongodb";

export default class MongoService {
    private static client: MongoClient;
    public static db: Db;

    public static async connect() {
        this.client = new MongoClient(process.env.MONGODB_URL as string);
        await this.client.connect();
        this.db = this.client.db();
    }

    public static async disconnect() {
        await this.client?.close();
    }

    public static collection<T extends Document>(name: string): Collection<T> {
        return this.db?.collection<T>(name);
    }
}
