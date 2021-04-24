let express = require("express");

let hbs = require("express-handlebars");

let multer = require("multer");
var parser = require("body-parser");

let app = express();

app.use(express.urlencoded({ extended: true }));
// ép kiểu dữ liệu khi dùng post
app.use(parser.json());

let mongoose = require("mongoose");
let accountSchema = require("./model/accountSchema");
let sanphamSchema = require("./model/sanphamSchema");
let khachhangSchema = require("./model/khachhangSchema");
let dathangSchema = require("./model/dathangSchema");

let User = mongoose.model("account", accountSchema, "account");
let Sanpham = mongoose.model("sanpham", sanphamSchema, "sanpham");
let Khachhang = mongoose.model("khachhang", khachhangSchema, "khachhang");
let Dathang = mongoose.model("dondathang", dathangSchema, "dondathang");
mongoose
  .connect(
    "mongodb+srv://nt123:Nt12345@cluster0-pamcf.gcp.mongodb.net/quanly_banhang",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(function (conn) {
    console.log("Connected");
  });

app.engine(
  ".hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "",
    layoutsDir: "",
  })
);

app.set("view engine", ".hbs");

app.use(express.static("public"));
let storage = multer.diskStorage({
  //định nghĩa thư mục lưu file
  destination: function (req, res, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    let filename = `${Date.now()}-Lucifer-Morningstar-${file.originalname}`;
    if (!filename.endsWith(".jpg")) {
      return cb("Vui lòng up file có đuôi là jpg ", filename);
    }

    // console.log('./uploads/'+filename);

    cb(null, filename);
  },
});
// khởi tạo biến upload
let upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1020 * 1024,
  },
});

app.listen(1520);

app.get("/", async (req, res) => {
  let sanpham = await Sanpham.find({});
  try {
    res.render("index", { sanpham });
  } catch (e) {
    res.send("co loi xay ra", e.message);
  }
});

app.get("/addsp", function (req, res) {
  res.render("addsp");
});

app.post("/addspA", upload.single("avatar"), async (req, res) => {
  var nhanhieu = req.body.loaisp;
  var masp = req.body.tensp;
  var namx = req.body.hangsp;
  var giasp = req.body.giasp;
  var giagoc = req.body.mausp;
  var urlsp = "../images/" + req.file.filename;
  if (
    nhanhieu == "" ||
    masp == "" ||
    namx == "" ||
    giasp == "" ||
    giagoc == ""
  ) {
    res.render("addsp", { text: "Nhập đủ thông tin" });
  } else {
    const sanpham = new Sanpham({
      masp: masp,
      nhanhieu: nhanhieu,
      namsx: namx,
      giasp: giasp,
      giagoc: giagoc,
      urlsp: urlsp,
    });

    try {
      await sanpham.save();
      res.render("addsp");
    } catch (e) {
      res.send("Co loi xay ra" + e.message);
    }
  }

  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
});

app.get("/home", async (req, res) => {
  let sanpham = await Sanpham.find({});
  try {
    res.render("home", { sanpham });
  } catch (e) {
    res.send("co loi xay ra", e.message);
  }
});
app.get("/deletesp/:id", async (req, res) => {
  try {
    const stt = await Sanpham.findByIdAndDelete(req.params.id);
    let sanpham = await Sanpham.find({});
    try {
      res.render("index", { sanpham });
    } catch (e) {
      res.send("co loi xay ra", e.message);
    }
  } catch (e) {}
});

app.post("/updatesp", function (req, res) {
  var idsp = req.body.idsp;
  var tensp = req.body.tensp;
  var hangsp = req.body.motasp;
  var loaisp = req.body.motasp;
  var giasp = req.body.giasp;
  var urlsp = req.body.urlsp;

  res.render("updatesp", { idsp, tensp, hangsp, giasp, urlsp, loaisp });
});

app.post("/updatespA", upload.single("avatar"), async (req, res) => {
  try {
    var tensp = req.body.tenspU;
    var loaisp = req.body.loaispU;
    var hangsp = req.body.hangspU;
    var giasp = req.body.giaspU;
    var urlsp = "../images/" + req.file.filename;
    const stt = await Sanpham.findByIdAndUpdate(idsp, {
      masp: masp,
      tensp: tensp,
      hangsp: hangsp,
      loaisp: loaisp,
      giasp: giasp,
      urlsp: urlsp,
    });
    if (!stt) {
      res.end("khong tim thay");
    } else {
      res.redirect("home");
    }
  } catch (e) {}
});

app.get("/themsanpham", function (req, res) {
  res.render("addsp");
});

app.get("/trangchu", function (req, res) {
  res.redirect("/");
});

//?????
module.exports = app;
