const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

app.use("/static", express.static(__dirname + "/public"));

const { Router } = express;

const ropaRouter = new Router();

ropaRouter.use(express.json());
ropaRouter.use(express.urlencoded({ extended: true }));

const ropa = [];

ropaRouter.get("/", (req, res) => {
  res.json(ropa);
});

function addId(req, res, next) {
  req.body.id = ropa.length + 1;
  next();
}

ropaRouter.post("/", addId, (req, res) => {
  ropa.push(req.body);
  res.json(req.body);
});

ropaRouter.delete("/:id", (req, res) => {
  ropa.splice(req.params.id - 1, 1);
  res.json(mascotas);
});

app.use("/ropa", ropaRouter);

app.use((req, res, next) => {
  res.status(400).send("Error prenda no encontrada");
});

