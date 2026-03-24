# CertiSure

**Web3 Cryptographic Security on Web2 Infrastructure.**

🔗 **[Live Demo](https://certisure-frontend.vercel.app)**

Hey! Welcome to the official repository for **CertiSure**!

## The Problem
Fake academic and professional certificates are a massive headache for recruiters and colleges. Manual verification via phone and email takes days. Existing blockchain solutions are too slow, too complex, and way too expensive for mid-sized institutions.

## Our Solution
CertiSure brings the tamper-proof logic of Web3 to the lightning-fast infrastructure of Web2. We use cryptographic SHA-256 hashing to fingerprint documents and MongoDB Atlas to verify them in milliseconds. 

## Core Features
* **Bulk CSV Upload:** The absolute game changer. Institutions can upload a CSV to generate and hash hundreds of certificates at once. 
* **Single PDF Upload:** Drop a certificate to generate a unique QR code and register it securely in the database.
* **Instant Verification Portal:** Employers just upload the candidate's PDF. We extract the QR data, recompute the hash, and check the database. Match? Verified ✅. Altered? Busted ❌.
* **PWA Ready:** A smooth React frontend that works anywhere, without app store downloads.

## Tech Stack
* **Frontend:** React.js, Tailwind CSS (Deployed on Vercel)
* **Backend:** Node.js, Express.js (Deployed on Vercel)
* **Database:** MongoDB Atlas
* **Magic Ingredients:** `pdf-parse`, `qrcode-reader`, native Node `crypto`

## Run it Locally
Want to test the code yourself? Yah man, it is super easy:

1. Clone this repository to your local machine.
2. Open your terminal and run `npm install` in both the `frontend` and `backend` folders.
3. Create a `.env` file in the backend folder. Add your MongoDB connection string exactly like this: `MONGO_URI=your_atlas_connection_string_here`
4. Run `npm run dev` or `npm start` in both folders.
5. Open `localhost:3000` and start verifying!

***
*Built with ❤️ and a lot of late-night coffee✨*
