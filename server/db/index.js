const {Pool} = require('pg');

const pool= new Pool({
    connectionString: process.env.EXTERNAL_URL,
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl:true
});

module.exports={
    query:(text, params)=> pool.query(text, params),
};