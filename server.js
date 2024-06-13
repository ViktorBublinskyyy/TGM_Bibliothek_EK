const express = require("express");
const cors = require("cors");
const LibraryDatabase = require("./LibraryDatabase");

const app = express();
const port = 3001;
const dbClient = new LibraryDatabase();

app.use(cors());
app.use(express.json());

dbClient.connect().catch(console.error);

app.get("/search/:title", async (req, res) => {
    const title = req.params.title;
    try {
        const result = await dbClient.search(title);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});

app.get("/books", async (req, res) => {
    try {
        const result = await dbClient.getAll();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});
app.get("/users", async (req, res) => {
    try {
        const result = await dbClient.getAllUsers();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});
app.get("/filter1/:parameter", async (req, res) => {
    const parameter = req.params.parameter;
    try {
        const result = await dbClient.filter1(parameter);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});
app.get("/filter2", async (req, res) => {
    const minPages = parseInt(req.query.minPages);
    const maxPages = parseInt(req.query.maxPages);
    
    if (isNaN(minPages) || isNaN(maxPages)) {
        return res.status(400).json({ error: "Invalid query parameters" });
    }

    try {
        const result = await dbClient.filter2(minPages, maxPages);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});
app.get("/filter3/:verlag", async (req, res) => {
    const verlag = req.params.verlag;
    try {
        const result = await dbClient.filter3(verlag);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});
app.get("/filter4/:author", async (req, res) => {
    const author = req.params.author;
    try {
        const result = await dbClient.filter4(author);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});
app.get("/filter5", async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    try {
        const result = await dbClient.filter5(limit);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.get("/filter6/:title", async (req, res) => {
    const title = req.params.title;
    try {
        const result = await dbClient.filter6(title);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});
app.post("/favorites", async (req, res) => {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
        return res.status(400).json({ error: "Missing userId or bookId" });
    }

    try {
        await dbClient.addBookToFavorites(userId, bookId);
        res.status(200).json({ message: "Book added to favorites" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});
app.get("/favorites/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const result = await dbClient.getFavoriteBooks(userId);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});
app.delete("/favorites", async (req, res) => {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
        return res.status(400).json({ error: "Missing userId or bookId" });
    }

    try {
        await dbClient.removeBookFromFavorites(userId, bookId);
        res.status(200).json({ message: "Book removed from favorites" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});
process.on("SIGINT", () => {
    dbClient.close().then(() => {
        console.log("MongoDB connection closed");
        process.exit(0);
    });
});
