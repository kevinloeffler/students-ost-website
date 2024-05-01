import { handler } from './build/handler.js';
import express from 'express'
// import cors from 'cors'

const app = express()
const PORT = 3000

//const corsOptions = {
//    origin: 'http://localhost:27017',
//}
// app.use(cors(corsOptions))

// Increase the request size limit
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));


// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
    res.end('ok')
})

app.get('/qr', (req, res) => {
    res.redirect('/')
})

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
