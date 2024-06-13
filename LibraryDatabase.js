const { MongoClient, ServerApiVersion } = require("mongodb");

class LibraryDatabase {
  constructor() {
        this.uri = "mongodb+srv://admin:Password@library.0rpylkw.mongodb.net/";
        this.dbname = "Library";
        this.buchcoll = "Buchdaten";
        this.userFav = "UserFav";
        this.userData = "Nutzerdaten";
        this.client = new MongoClient(this.uri,  {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          }
        });
  }

  async connect() {
        try {
            await this.client.connect();
            await this.client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
          } catch (err) {
            console.error(err);
          }
  }

  async search(title) {
      try {
          // Specify the database and collection
          const db = this.client.db(this.dbname);
          const collection = db.collection(this.buchcoll);
  
          // Create a regex pattern to match the beginning of the title
          const pattern = new RegExp(`^${title}`, 'i');
  
          // Query for documents with the specified title
          const documents = await collection.find({ title: pattern }).toArray();
          // Return the data array if needed
        console.log(documents.toString());
        //line above Not needed, delete after test
          return documents;
        } catch (err) {
          console.error(err);
    }
  }
  async getAllUsers() {
    try {
        // Specify the database and collection
        const db = this.client.db(this.dbname);
        const collection = db.collection(this.userData);

        // Query for all documents in the collection
        const documents = await collection.find().toArray();
        console.log(documents.toString());
        return documents;
    } catch (err) {
        console.error(err);
    }
  }
  async getAll() {
    try {
        // Specify the database and collection
        const db = this.client.db(this.dbname);
        const collection = db.collection(this.buchcoll);

        // Query for all documents in the collection
        const documents = await collection.find().toArray();
        console.log(documents.toString());
        return documents;
    } catch (err) {
        console.error(err);
    }
  }
  async filter1(parameter) {
    try {
        const db = this.client.db(this.dbname);
        const collection = db.collection(this.buchcoll);
        const pattern = new RegExp(`^${parameter}`, 'i');
        const query = {
            $or: [
              { title: pattern },
              { language: pattern },
              { genre: pattern },
              { year: pattern },
              { date: pattern },
              { author: pattern },
              {publisher: pattern},
              {ISBN: pattern}
            ]
        };

        // Query for documents with the specified pattern
        const documents = await collection.find(query).toArray();
        // Return the data array if needed
        console.log(documents.toString());
        //line above Not needed, delete after test
        return documents;
    } catch (err) {
        console.error(err);
    }
  }

  async filter2(minPages, maxPages) {
    try {
      const db = this.client.db(this.dbname);
      const collection = db.collection(this.buchcoll);
      const query = {
        pages: {
          $gte: minPages,
          $lte: maxPages
        }
      };
      const documents = await collection.find(query).toArray();
      // Return the data array if needed
      console.log(documents.toString());
      //line above Not needed, delete after test
      return documents;
    } catch (err) {
      console.error(err);
    }
  }

  
  async filter3(verlag) {
    try {
        const db = this.client.db(this.dbname);
        const collection = db.collection(this.buchcoll);
        const pattern = new RegExp(`^${verlag}`, 'i');
        const documents = await collection.find({ publisher: pattern }).toArray();
        return documents;
      }catch (err) {
        console.error(err);
      }
        
  }

  async filter4(author) {
    try {
      const db = this.client.db(this.dbname);
      const collection = db.collection(this.buchcoll);
      const pattern = new RegExp(author, 'i'); // Case-insensitive match
      const query = { Autor: pattern };
      const documents = await collection.find(query).toArray();
      console.log(dataArray);
      return documents;
      }catch (err) {
        console.error(err);
      }
  }
  async filter5(limit = 10) {
    try {
      const db = this.client.db(this.dbname);
      const collection = db.collection(this.buchcoll);
      const query = {};
      const options = { sort: { date: -1 }, limit: limit };
      const latestBooks = await collection.find(query, options).toArray();
      console.log("Latest Books:");
      latestBooks.forEach(book => {
        console.log(book);
      });
      return latestBooks;
    } catch (err) {
      console.error(err);
    }
  }
  async filter6(title) {
    try {
      const db = this.client.db(this.dbname);
      const collection = db.collection(this.buchcoll);
  
      // Query for documents with the specified title
      const query = { title: title };
      const books = await collection.find(query).toArray();
  
      if (books.length === 0) {
        console.log(`No books found with title "${title}"`);
        return 0;
      }
  
      let totalAvailable = books[0].available;
  
      console.log(`Total Available Books for "${title}":`, totalAvailable);
      return totalAvailable;
    } catch (err) {
      console.error(err);
    }
  }
  
  async close() {
        try {
            await this.client.close();
        } catch (err) {
            console.error(err);
        }
  }

  async addBookToFavorites(userId, bookId) {
    try {
      const db = this.client.db(this.dbname);
      const collection = db.collection(this.userFav);
  
      // Check if the user already has the book in favorites
      const existingFavorite = await collection.findOne({ userId: userId, bookId: bookId });
      if (existingFavorite) {
        console.log("Book already in favorites.");
        return;
      }
  
      // Add the book to user's favorites
      const result = await collection.insertOne({ userId: userId, bookId: bookId });
      console.log("Book added to favorites:", result.insertedId);
    } catch (err) {
      console.error(err);
    }
  }
  
  async getFavoriteBooks(userID) {
    try {
      const db = this.client.db(this.dbname);
      const collection = db.collection(this.userFav);
  
      // Find all favorite books of the user
      const favoriteBooks = await collection.find({ userId: userID }).toArray();
      const bookIds = favoriteBooks.map(favorite => favorite.bookId);
  
      // Retrieve details of favorite books from the main collection
      const mainCollection = db.collection(this.buchcoll);
      const books = await mainCollection.find({ ISBN: { $in: bookIds } }).toArray();
  
      console.log("Favorite Books for User:", userID);
      books.forEach(book => {
        console.log(book);
      });
  
      return books;
    } catch (err) {
      console.error(err);
    }
  }
  
  async removeBookFromFavorites(userId, bookId) {
    try {
      const db = this.client.db(this.dbname);
      const collection = db.collection(this.userFav);
  
      // Remove the book from user's favorites
      const result = await collection.deleteOne({ userId: userId, bookId: bookId });
      console.log("Book removed from favorites:", result.deletedCount);
    } catch (err) {
      console.error(err);
    }
  }
  
}
module.exports = LibraryDatabase;
//const dbClient = new LibraryDatabase();
//dbClient.connect().catch(console.dir);
//dbClient.search("Der Erste");
//dbClient.getAll().then(() => dbClient.close()).catch(console.dir);
//dbClient.filter1("Deutsch").then(() => dbClient.close()).catch(console.dir);
//dbClient.filter2(100, 300).then(() => dbClient.close()).catch(console.dir);
//dbClient.filter4("Kickl").then(() => dbClient.close()).catch(console.dir);
//dbClient.filter5().then(() => dbClient.close()).catch(console.dir);
//dbClient.filter6("Der Erste Weltkrieg : eine kurze Geschichte").then(() => dbClient.close()).catch(console.dir);