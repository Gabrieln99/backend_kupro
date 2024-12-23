import express from "express";
import authRouter from "./auth.js"
import { connectToDatabase } from "./db.js";

const app = express();
const PORT = 3000;

let db = await connectToDatabase();

app.use(express.json());

app.use("/auth", authRouter) // trebalo bi kad si tunderu na local host3000/auth/login delat za login a na /singup za singup ako nisan nesto sjeba 

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
