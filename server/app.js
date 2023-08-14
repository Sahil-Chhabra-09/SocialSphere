const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const multer = require("multer");

const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const { register } = require("./controllers/auth");
const { createPost } = require("./controllers/posts");
const { verifyToken } = require("./middleware/auth");

/* CONFIGURATIONS*/
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); //logs http requests and responses
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/*  FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* Authentication */
app.use("/auth", authRouter);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    ping: "pong",
  });
});

app.get("*", (req, res) => {
  res.status(404).send("Route you requested seems incorrect");
});

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, (req, res) => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log({
      msg: "Error occured while kickstarting backend",
      error: error,
    });
  }
};

start();
