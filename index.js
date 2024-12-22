import express from "express";

import { connectToDatabase } from "./db.js";
const app = express();
let db = await connectToDatabase();

app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("KuPro");
});

app.get("/kate", async (req, res) => {
  let kategorije_collection = db.collection("kategorije");
  let allKategorije = await kategorije_collection.find().toArray();
  res.status(200).json(allKategorije);
});

app.listen(PORT, (error) => {
  if (error) {
    console.log("Greška prilikom pokretanja servera", error);
  }
  console.log(` poslužitelj dela na http://localhost:${PORT}`);
});
