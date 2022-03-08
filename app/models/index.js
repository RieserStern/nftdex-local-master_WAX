const dotenv = require("dotenv");
dotenv.config();
const { Client } = require('pg');

console.log(process.env.PGPORT);

export const pgClient = new Client({
	user: process.env.PGUSER,
	password: process.env.PGPW,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
});

pgClient.connect().then(()=>{
    console.log("pg's ready!")
}).catch(e => {
    console.log(e.message);
});
