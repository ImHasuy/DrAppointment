import {DataSource} from "typeorm";

export default new DataSource({
    type: 'mysql',
    host: process.env['DATABASE_HOST'],
    port: +(process.env['DATABASE_PORT'] ?? 3306),
    username: process.env['DATABASE_USERNAME'],
    password: process.env['DATABASE_PASSWORD'],
    database: process.env['DATABASE'],
    entities: [],
});