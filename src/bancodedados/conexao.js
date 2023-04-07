
const knex = require("knex")({
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "198117",
      database: "dinheiro"
    }
  });
module.exports = knex
