  import express from 'express';
  import { connectToDatabase } from './db.js';

  const router = express.Router();

// nebi skodilo napravit folder ruter di cemo odvajat APIJe(/) na temelju cemu nan treba tipo sad za log in sing up da je u posebm ruteru da se ne mjesa jer cemo imat puno /
// provjeri smao 'korisnici' dal san dobro napisa ili kako vec si ti napisa ne moren provjerit dal dela jer ne moren otprit tvoj mongodb 
// sad neman bas vremena proucit kako da se spojin na taj mongodb pa samo ti kad rivas provjeri i tako u komentar mi stavi dal dela ili me zovi 
// testirat u postamnu obavezno ili tunder clientu 

  router.post('/signup', async (req, res) => {
      const { ime, prezime, email, lozinka } = req.body;
      const db = await connectToDatabase();
    
      try {
          const existingUser = await db.collection('korisnici').findOne({ email });
        
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
