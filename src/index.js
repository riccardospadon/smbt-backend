import express from 'express';
import { genericError } from './middlewares/genericError.js';
import apiRouter from './routers/apiRouter.js';

const server = express()

// porta del server
const port = 3050

// Middleware per analizzare i corpi delle richieste JSON
server.use(express.json())

// Sotto-directory /api
server.use('/api', apiRouter)

// Errore generico (gestito nella cartella "middlewares")
server.use(genericError)

// Controllo stato del server (visto su Postman)
server.get('/health', (req, res) => {
    res.status(200).json({ message: 'OK' })
})

server.listen(port, () => {
    console.log("🚀 Server listening on port " + port)
})