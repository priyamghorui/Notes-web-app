const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/my_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("mondod connected");
  })
  .catch((e) => {
    console.log(e);
  });
