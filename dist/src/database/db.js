"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const kysely_1 = require("kysely");
const dialect = new kysely_1.PostgresDialect({
    pool: new pg_1.Pool({
        database: 'postgres',
        host: '127.0.0.1',
        user: 'postgres',
        password: 'A7c11i27'
    })
});
// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
exports.db = new kysely_1.Kysely({
    dialect,
});
