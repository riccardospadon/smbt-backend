import express from "express";
import { genericError } from "./middlewares/genericError.js";
import apiRouter from "./routers/apiRouter.js";
import cors from 'cors'

const server = express();

// porta del server
const port = 3050;

// configurazione di CORS
const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, next) {
    if (whitelist.includes(origin) || !origin) {
      next(null, true);
    } else {
      next(new Error("Not allowed by CORS"));
    }
  },
};

server.use(cors(corsOptions))

// Middleware per analizzare i corpi delle richieste JSON
server.use(express.json());

// Sotto-directory /api
server.use("/api", apiRouter);

// Errore generico (gestito nella cartella "middlewares")
server.use(genericError);

// Controllo stato del server (visto su Postman)
server.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

server.listen(port, () => {
  console.log("🚀 Server listening on port " + port);
});
