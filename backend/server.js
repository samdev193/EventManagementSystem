const express = require('express')
const app = express()
const speakeasy = require("speakeasy")
const uuid = require("uuid")
const pool = require('./db')
const bcrypt = require('bcrypt');
const QRcode = require('qrcode')
app.use(express.json());
var cors = require('cors')
app.use(cors())

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}


// register user
app.post('/api/register', async (req, res) => {
    const id = uuid.v4();
    const {name, password, email} = req.body;
    let query = `SELECT * from users WHERE email = $1`
    let result =  await pool.query(query, [email])

    // prevents duplicates.
    if (result.rows[0]) {
        return res.status(500).json({message: "User already exists.", data:null})
    }

    try {
        const securePassword = await hashPassword(password)
        const secret = speakeasy.generateSecret()
        const temp_secret = secret.base32
        query = `
            INSERT INTO users (id, name, password, email, temp_secret, verified_secret) VALUES ($1, $2, $3, $4, $5, NULL)
        `
        await pool.query(query, [id, name, securePassword, email, temp_secret])
        // Generate QR code data url
        const otpauth_url = secret.otpauth_url;
        const qrCodeDataUrl = await QRcode.toDataURL(otpauth_url);
        res.status(201).json({
            message:"User registered. Scan the QR code with your authenticator app.",
            data: {
                user: {id, name, email},
                qrCode:qrCodeDataUrl,
            }
        })
    } catch(error) {
        console.log(error)
       res.status(500).json({message: "Error generating the secret", data:null})
    }
})


//Verify token and make secret permanent
app.post('/api/verify2FA', async (req, res) => {
    const {token, email} = req.body
    try {
        let query = `SELECT * from users where email = $1`
        let result = await pool.query(query, [email])
        let user = result.rows[0]
        const verified = speakeasy.totp.verify({
            secret: user.temp_secret || user.verified_secret,
            encoding: 'base32',
            token,
            window: 1
        });
        if (verified) {
            if (user.temp_secret) {
                let query = `
                    UPDATE users
                    SET verified_secret = temp_secret,
                        temp_secret = NULL
                    WHERE email = $1
                `
                await pool.query(query, [email])
            }
            res.json({verified: true})
        } else {
            res.json({ verified:false})
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Error generating the secret"})
    }
})

// handles logging in.
app.post('/api/login', async (req, res) => {
    const {email, inputPassword} = req.body;
    try {
        const query = `SELECT password, verified_secret
                       FROM users
                       WHERE email = $1`;
        const result = await pool.query(query, [email])
        const user = result.rows[0]
        if (!user) {
            return res.status(404).json({message: "user not found.", login:false})
        }

        const passwordMatch = bcrypt.compare(inputPassword, user.password)
        if (!passwordMatch) {
            return res.status(404).json({message: "Invalid credentials.", login:false})
        }
        return res.status(201).json({message:"Login successful", login:true})
    } catch (error) {
         console.log(error)
        res.status(500).json({message: "Error generating QR code",})
    }
})


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

