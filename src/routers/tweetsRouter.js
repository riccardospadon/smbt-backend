import express from 'express';

const tweetsRouter = express.Router();

// Classe Tweet per definire la struttura dei tweet
class Tweet {
    constructor(username, text) {
        this.id = Tweet.incrementId()
        this.username = username
        this.text = text
        this.likes = 0
    }

    static incrementId() {
        if(!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }
}

// Struttura dati per memorizzare i tweet
const tweets = []

// GET per ritornare tutti i tweets
tweetsRouter.get('/', (req, res) => {
    res.json(tweets)
})

// POST per pubblicare un nuovo tweet
tweetsRouter.post('/', (req, res) => {
    const { text, username } = req.body   // testo e username richiesti
    console.log("Dati ricevuti dal frontend:", { username, text })
    if(!text || !username) {
        return res.status(400).json({ error: 'Testo e username necessari!' })
    }

    const newTweet = new Tweet(text, username)
    tweets.push(newTweet)
    res.status(201).json(newTweet) // HTTP 201 per indicare che è stato creato
})

// POST per incrementare il contatore dei "mi piace"
tweetsRouter.post('/:id/like', (req, res) => {
    const tweetId = parseInt(req.params.id)
    const tweet = tweets.find(t => t.id === tweetId)

    if(!tweet){
        return res.status(404).json({ error: 'Tweet non trovato! '}) // HTTP 404: errore per indicare che il tweet non esiste
    }

    tweet.likes++
    res.json(tweet)
})

export default tweetsRouter