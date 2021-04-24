let mongoose = require("mongoose");

const sanphamShema = new mongoose.Schema({
  masp: {
    type: String,
    require: true,
  },
  nhanhieu: {
    type: String,
    require: true,
  },
  namsx: {
    type: String,
    require: true,
  },
  giasp: {
    type: String,
    require: true,
  },
  giagoc: {
    type: String,
    require: true,
  },
  urlsp: {
    type: String,
    require: true,
  },
});
module.exports = sanphamShema;
