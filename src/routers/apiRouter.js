import express from 'express';
import tweetsRouter from './tweetsRouter.js';

const apiRouter = express.Router();

// Middleware per analizzare i corpi delle richieste JSON per questo router
apiRouter.use(express.json())

// Rotta di test
apiRouter.get('/test', (req, res) => {
    res.json({ message: "test ok" })
})

// Rotte per i tweet
apiRouter.use('/tweets', tweetsRouter)

export default apiRouter