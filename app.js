const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");

const morgan = require("morgan");
app.use(morgan("dev"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var db = require("./models");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.get("/api/bills", (req, res) => {
  db.Bill.findAll().then((data) => {
    res.json(data);
  });
});

app.post("/api/bill", ({ body }, res) => {
  // const [_, account, date, cost] = body.info.split(" ");
  console.log({ body });
  const account = body.info.substr(2, 12);
  const date = body.info.substr(14, 6);
  const cost = body.info.substr(20, 9);

  console.log({ account, date, cost });

  const newDate = `20${date.substr(0, 2)}/${date.substr(2, 2)}/${date.substr(
    4,
    2
  )}`;
  const bill = {
    account,
    billDate: new Date(newDate),
    cost: Number(cost),
    manualDate: new Date(),
  };

  db.Bill.create(bill).then((data) => res.json(data));
});

db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
});
