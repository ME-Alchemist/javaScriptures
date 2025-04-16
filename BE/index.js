const express = require("express");
const cors = require("cors");
const { json } = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

const arrOfItems = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

app.get("/", (req, res) => {
  arrOfItems.forEach((item) => console.log("this is item number: ", item));
  res.send(arrOfItems);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
