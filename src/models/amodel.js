const express = require("express");
const mongoose = require("mongoose");

const aschema = new mongoose.Schema({
  titel: {
    type: String,
    require: true,

  },
  massage: {
    type: Array,
    require: true,

  },
});

const amodel = new mongoose.model("user", aschema);
module.exports = amodel;