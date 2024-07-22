import express from 'express';
import tweetsRouter from './tweetsRouter.js';

const apiRouter = express.Router();

// ho bisogno che mi venga restituito in formato json
apiRouter.use(express.json())

apiRouter.get('/test', (req, res) => {
    res.json({ message: "test ok" })
})

apiRouter.use('/tweets', tweetsRouter)

export default apiRouter