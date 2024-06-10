const mongoose = require("mongoose");
const ejs = require("ejs");

const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  next();
});

const mongoDBConnectionString =
  "mongodb+srv://SE12:CSH2024@swilliams.7s2jirb.mongodb.net/?retryWrites=true&w=majority&appName=SWilliams";

mongoose.connect(mongoDBConnectionString).then(() => {
  console.log("MongoDB connected...");
});

app.use(express.json());

const backlogSchema = new mongoose.Schema({
  name_item: { type: String, required: true },
  type: { type: String, required: true },
  last_engaged: { type: String, required: true },
  progress: { type: Number }, // percent
  image: { type: String, required: true },
});

const BacklogItem = mongoose.model("BacklogItem", backlogSchema);

app.get("/", (req, res) => {
  BacklogItem.find({}).then((BacklogList) => {
    res.render("ran.ejs", { Items: BacklogList });
  });
});

app.get("/addItem", (req, res) => {
  res.status(200).sendFile(__dirname + "/public/addItem.html");
});

app.post("/addItem", (req, res) => {
  const item = new BacklogItem({
    name_item: req.body.name_item,
    type: req.body.type,
    last_engaged: req.body.last_engaged,
    progress: req.body.progress,
    image: req.body.image,
  });
  item.save().then((newItem) => {
    res.json(newItem);
  });
});

app.patch("/BacklogItem/:_id", (req, res) => {
  const filter = { _id: req.params._id };

  const update = { $set: { progress: req.body.progress } };

  BacklogItem.findOneAndUpdate(filter, update, { new: true }).then(
    (updatedBacklogItem) => {
      res.json(updatedBacklogItem);
    },
  );
});

app.delete("/BacklogItem/:_id", (req, res) => {
  const filter = { _id: req.params._id };

  BacklogItem.findOneAndDelete(filter).then((deletedBacklogItem) => {
    res.json(deletedBacklogItem);
  });
});

app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/404.hrml")
})

app.get("/", (req, res) => {
  BacklogItem.find({})
  .then((BacklogList) => {
    res.status(200).render("ran.ejs", {Items: BacklogList});
  })
  .catch((error) => {
    console.error("Error fetchng items:", error)
    res.status(500).sendFile(__dirname + "/public/500.html");
  });
});

app.listen(3000, () => {
  console.log("Server running");
});
