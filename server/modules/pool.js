const pg = require('pg');
const url = require('url');
let config = {};

if (process.env.DATABASE_URL) {
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
  };
} else {
  const host = process.env.POSTGRES_HOST
    ? process.env.POSTGRES_HOST
    : 'localhost'; // "localhost" is Docker's default
  const user = process.env.POSTGRES_USER
    ? process.env.POSTGRES_USER
    : 'postgres'; // "postgres" is the default username for Docker
  const password = process.env.POSTGRES_PASSWORD
    ? process.env.POSTGRES_PASSWORD
    : 'postgres'; // "postgres" is the default password for Docker
  const port = process.env.PORT_DB ? process.env.PORT_DB : 5432;
  const database = process.env.POSTGRES_DB
    ? process.env.POSTGRES_DB
    : 'capstone';

  config = {
    host, // Server hosting the postgres database
    user,
    password,
    port,
    database, // name of application database
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
}

const pool = new pg.Pool(config);

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
