import { handler } from './build/handler.js';
import express from 'express'
// import cors from 'cors'

const app = express()
const PORT = 3000

//const corsOptions = {
//    origin: 'http://localhost:27017',
//}
// app.use(cors(corsOptions))

// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
    res.end('ok')
})


// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
