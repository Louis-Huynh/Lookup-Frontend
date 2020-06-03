const express = require("express");
const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!1</h1>");
});

app.get("/api/notes/", (req, res) => {
  console.log("Give me head ", req.headers);
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log("appel", req.params);

  console.log("id", id);

  const note = notes.find((note) => {
    return note.id === id;
  });
  console.log("note", note);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

const GenerateID = () => {
  const maxID =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
  return maxID + 1;
};

//params vs body
app.post("/api/notes/", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: GenerateID(),
  };

  console.log("note", note);
  notes = notes.concat(note);
  res.json(note);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
