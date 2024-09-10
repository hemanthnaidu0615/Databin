const { Client } = require("pg");

const credentials = {
  user: "postgres",
  host: "uatdatabase.cttfpf5l1rt6.ap-south-1.rds.amazonaws.com",
  database: "postgres_new",
  password: "Admin_2024",
  port: 5432,
  keepAlive:true,
  idle_timeout:7200,
  ssl:{
    rejectUnauthorized:false,
  }
};

// Create a connection pool
const client = new Client(credentials);

// Connect to the database
client.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected as id " + client.user);
});

module.exports = client;
