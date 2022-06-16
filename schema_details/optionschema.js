const mongoose = require("mongoose");
const optionSchema = new mongoose.Schema({
  optionvalue: {
    type: String,
  },
  OId: {
    // option unique id
    type: String,
  },
});
module.exports = mongoose.model("optionschema", optionSchema);
