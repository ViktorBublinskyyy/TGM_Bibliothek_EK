#TGM Bibliothek 

Verfasser: **Matei Dragne, Dominik Sandler, Julian Ganner, Viktor Bublinskyy**

Datum: **12.06.2024**

## 1. Einführung

Es gibt unterschiedliche Methoden um Daten zu speichern, zum Beispiel in Dateien auf einer Festplatte oder in einem Cloudstorage. Für unser Projekt haben wir uns für MongoDB entschieden, da es eine intuitive Weboberfläche hat, und somit eine niedrigere Lernkurve besitzt als andere Alternativen. Es ist außerdem direkt gehostet und man muss kein port forwarding verwenden.

## 2. Projektbeschreibung

Das TGM besitzt derzeit eine alte Bibliothekwebsite, welches nicht den
Ansprüchen einer modernen und technischen Schule entspricht. Die Website
hat derzeit einige Mängel, z.B. funktioniert die Übersetzung nicht, man kann
nicht vorreservieren, und das Design ist in die Jahre gekommen. Als Schüler
kann man sich nur den Bestand anschauen, und als Mitarbeiter Bücher
hinzufügen. Die Modernisierung von dieser Website würde die Effizienz
steigern, da man schneller und leichter zu dem gelangt, was man möchte.

## 3. Theorie

Das vorgestellte Projekt zielt darauf ab, eine webbasierte Anwendung für eine Bibliothek zu entwickeln, die es Benutzern ermöglicht, Bücher und andere Medien zu durchsuchen und zu filtern. Das Frontend der Anwendung wird mit Vue.js und Vuetify entwickelt, während das Backend mit Node.js und einer MongoDB-Datenbank implementiert wird. Die Benutzeroberfläche bietet eine Vielzahl von Filteroptionen, um die Suche nach Medien zu erleichtern.

### Theorie

Um das Projekt erfolgreich durchzuführen, müssen mehrere theoretische Aspekte und technologische Grundlagen verstanden werden. Diese umfassen:

1. **Frontend-Entwicklung mit Vue.js und Vuetify:**
  
  - **Vue.js:** Ein progressives JavaScript-Framework zur Erstellung von Benutzeroberflächen. Es ermöglicht eine einfache und flexible Entwicklung von Single-Page-Anwendungen (SPAs).
  - **Vuetify:** Eine Material Design Component Library für Vue.js, die vorgefertigte UI-Komponenten bereitstellt und die Entwicklung optisch ansprechender Benutzeroberflächen vereinfacht.
2. **Backend-Entwicklung mit Node.js und Express:**
  
  - **Node.js:** Eine plattformübergreifende Laufzeitumgebung für JavaScript, die auf der V8-Engine von Google basiert. Sie ermöglicht die serverseitige Ausführung von JavaScript.
  - **Express:** Ein minimalistisches Web-Framework für Node.js, das eine robuste Gruppe von Features zum Aufbau von Web- und Mobilanwendungen bietet.
3. **Datenbankmanagement mit MongoDB:**
  
  - **MongoDB:** Eine dokumentenorientierte NoSQL-Datenbank, die JSON-ähnliche Dokumente mit dynamischen Schemas speichert. Sie ist skalierbar und flexibel, was sie ideal für Anwendungen macht, die große Datenmengen verarbeiten müssen.
4. **RESTful APIs:**
  
  - **REST (Representational State Transfer):** Ein Architekturstil für die Gestaltung von Netzwerkdiensten. RESTful APIs verwenden HTTP-Anfragen, um CRUD-Operationen (Create, Read, Update, Delete) auf Ressourcen auszuführen.
5. **Asynchrone Programmierung:**
  
  - **Promises und async/await:** Methoden zur Handhabung von asynchronen Operationen in JavaScript, die es ermöglichen, auf das Ergebnis von Operationen zu warten, ohne den Hauptthread zu blockieren.

## 4. Arbeitsschritt

Die einzelnen Schritte sollen hier genauer beschrieben werden. Mithilfe dieser Dokumentation sollte jeder das Projekt mit demselben Ergebnis nachmachen können. Weitere Arbeitsschritte können hinzugefügt werden.

1. **Umgebungen aufsetzten**
  
      Zu Beginn haben wir alle Programme auf den Pc heruntergeladen :
  
      - npm install mongodb
  
      - npm install nodejs
  
      - npm install axios
  

Für Vuetify:

     1. `npm install -g yarn`

     2. yarn create vuetify

     3. This command prompts you with a few options before generating your          scaffolded Vue / Vuetify 3 project.

```bash
success Installed "create-vuetify@x.x.x" with binaries:
    - create-vuetify

? Project name: ❯ vuetify-project // the folder to generate your application
? Use TypeScript?: ❯ No / Yes
? Would you like to install dependencies with yarn, npm, or pnpm?:
  ❯ yarn
    npm
    pnpm
    bun
    none
```

        After making your selections, [create-vuetify](https://github.com/vuetifyjs/create-vuetify) will generate the structure for your         new application.

        Once the scaffold is complete, start the vite development server by running the         following commands:

```bash
     cd vuetify-project
     yarn dev --host
```

2. **MongoDB aufsetzten**
  
  Auf der MongoDB Website haben wir uns ein Konto gemacht und danach aus den Optionen für verscheidene Cluster und Dienste den kostenlosen Cluser mit 500MB an Speicher genommen. In diesem Cluster der von MongoDB gehostet wird haben wir die Datenbank für die TGM-Bibliothek erstellt. Unter dieser Datenbank haben wir die einzelnen Collections : Buchdaten, UserFavorite, usw. erstellt. In diesen Collections kann man mit "Insert Documents" ein neues Dokument erstellen, die Erstellung kann in einem benutzerfreundlichen Format indem man nur den Parameternamen setzt und den Wert, oder man kann auch das Dokument selber in JSON schreibweise Notieren.
  
  Beispiel aus unserer Datenbank:
  
  ```bash
  {"_id":{"$oid":"662a1b2ce21f9892bc11292d"},"imageHref":"https://cover.ekz.de/9783549074992.jpg","title":"Die verspielte Freiheit","language":"Deutsch","genre":"Geschichte","year":"2016","date":"1.6.2024","author":"Hans Mommsen","publisher":"C.H. Beck","ISBN":"9783406704023","available":"3","borrowed":"1","unknown":"0","reserved":"0","description":"","pages":{"$numberLong":"450"}}
  ```
  

       Nachdem man alle Documente und alle Collections fertig gemacht hat geht man        zurück zur Übersicht deiner Datenbank und Clickt auf den "Connect" Button.

       Jetzt bekommt man verschiedene Optionen um sich zu seinen Daten auf der        Datenbank zu verbinden. Die Option für die wir uns entschieden haben ist durch        eine MongoDB Driver uns zu verbinden deswegen haben wir vorhin - npm install        mongodb geschrieben. Auf der Website wird direkt dieses Beispiel gegeben um die        ersten Abfragen zu machen von der Datenbank:

```js
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://<username>:<password>@library.0rpylkw.mongodb.net/?retryWrites=true&w=majority&appName=Library";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
 serverApi: {
 version: ServerApiVersion.v1,
 strict: true,
 deprecationErrors: true,
 }
});

async function run() {
 try {
 // Connect the client to the server (optional starting in v4.7)
 await client.connect();
 // Send a ping to confirm a successful connection
 await client.db("admin").command({ ping: 1 });
 console.log("Pinged your deployment. You successfully connected to MongoDB!");
 } finally {
 // Ensures that the client will close when you finish/error
 await client.close();
 }
}
run().catch(console.dir);
```

Der wichtige Teil ist diese Zeile :

```js
const uri = "mongodb+srv://<username>:<password>@library.0rpylkw.mongodb.net/?retryWrites=true&w=majority&appName=Library";
```

Das ist der Verbindungs-String. damit verbindet man sich zur Datenbank, die einzigen Sachen die man aus dem Beispiel ändern muss sind die <username> und <password> Teile vom String. Stattdessen soll man den Benutzernamen und Passwort vom Konto eingeben.

Jetzt kann man alle Methoden schreiben um die Daten aus der DB abzufragen. Zum Beispeil haben wir im Projekt eine `async search(titel)` Methode:

```js
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
```

Hier noch eine Mtethode um alle buchdaten zu bekommen:

```js
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
```

Um die Abfrage vorzubereiten um diese aus dem Frontend abzurufen haben wir ein `server.js`file.

```js
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
```

Hier auch die vorbereitung für die Abfrage von allen Büchern:

```js
app.get("/books", async (req, res) => {
    try {
        const result = await dbClient.getAll();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred" });
    }
});
```

Danach kann man aus dem Frontend welches wir mit Vuetify 3 gemacht haben die Daten abfragen.

Unter `methods` werden diese Methoden geschreiben.

Die Abfrage für alle Bücher:

```js
async fetchBooks() {
      try {
        const response = await axios.get("http:localhost:3001/books");
        this.books = response.data;
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally { 
        this.lodadingbooks = false; // Setze den Lade-State auf false
      }
    },
```

Für die search Methode:

```js
async searchBooks(title) {
        try {
          const response = await axios.get(`http:localhost:3001/search/${title}`);
          this.searchResults = response.data;
          console.log(this.searchResults);
        } catch (error) {
          console.error("Error searching books:", error);
        }
    },
```

Die `searchResults` sind die Daten die dan am Ende auf der Website angezeigt werden.

## 5. Zusammenfassung

Beim Projekt gab es Anfangs ein paar Probleme, welche die Verteilung der Rechte betrifft, und das Einstellen der "Keys", da MongoDB nicht mit SQL Requests gemacht ist, und wir herausfinden mussten, wie wir trotzdem in der Augabe Regeln dazulegen können, um z.B. keine doppelten IDs zu erlauben. Zeitlich ist es sich nicht ausgegangen alle geplanten Funktionen dabei zu Implementieren. Manche der Funktionen mussten überarbeitet werden, da sie fehlerhaft waren, und nicht wie gewollt funktionierten, was jedoch leicht zu reparieren war.

## 6. Quellen

https://vuetifyjs.com/en/getting-started/installation/#installation
https://www.mongodb.com/docs/manual/

https://nodejs.org/docs/latest/api/
https://axios-http.com/docs/intro
https://vuejs.org/tutorial/#step-1
