  import express from 'express';
  import { connectToDatabase } from './db.js';

  const router = express.Router();

  router.post('/signup', async (req, res) => {
      const { ime, prezime, email, lozinka } = req.body;
      const db = await connectToDatabase();
    
      try {
          const existingUser = await db.collection('users').findOne({ email });
        
          if (existingUser) {
              return res.status(400).json({ message: 'Korisnik vec postoji' });
          }
        
          const NoviKorisnik = await db.collection('korisnici').insertOne({
              ime,
              prezime,
              email,
              lozinka,
          });

          res.status(201).json({ message: 'Uspijesno kreiran korisnik' });
      } catch (error) {
          res.status(500).json({ message: 'Error' });
      }
  });

  router.post('/login', async (req, res) => {
      const { email, password } = req.body;
      const db = await connectToDatabase();
    
      try {
          const user = await db.collection('korisnici').findOne({ email });
        
          if (!user) {
              return res.status(400).json({ message: 'Korisnik s tim emailom nije pronaden' });
          }

          if (password !== user.password) {
              return res.status(400).json({ message: 'Pogresna lozinka' });
          }

          res.status(200).json({
              userId: user._id,
              email: user.email,
              name: user.name
          });
      } catch (error) {
          res.status(500).json({ message: 'Error' });
      }
  });

  export default router;
