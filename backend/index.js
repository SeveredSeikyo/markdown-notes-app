// import packages
const express = require('express');
const cors = require('cors');
const notesRouter = require('./routes/notes.routes');
require('dotenv').config();


const port = process.env.PORT;
const frontendURL = process.env.FRONTEND_URL;


var corsOptions = {
	origin: frontendURL,
	methods: "GET, PUT, PATCH, POST, DELETE",
	preflightContinue: false,
	optionsSuccessStatus: 200
}



const appRouter = express.Router();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());


// Connect AppRouter to NotesRouter
appRouter.use("/notes", notesRouter)

// Health Check
appRouter.get("/health", (req, res) => {
	res.json({ message: "hello" });
})

// Connect AppRouter to App
app.use("/api", appRouter);


app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});


