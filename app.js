const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var db = require("./models");

app.get("/", (req, res) => {
  console.log("========== / ============");
  res.send("HI");
});

app.get("/api/bills", (req, res) => {
  console.log("========== api/bills ============");
  db.Bill.findAll().then((data) => {
    res.json(data);
  });
});

app.post("/api/bill", ({ body }, res) => {
  console.log({ body });
  const [_, account, date, cost] = body.info.split(" ");

  const newDate = `20${date.substr(0, 2)}/${date.substr(2, 2)}/${date.substr(
    4,
    2
  )}`;
  const bill = {
    account,
    date: new Date(newDate),
    cost: Number(cost),
  };

  console.log({ bill });

  db.Bill.create(bill).then((data) => res.json(data));
});

db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
});
