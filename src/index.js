require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const methodOverride = require("method-override");
const Article = require("../models/article");
const articlesRouter = require("../routes/article.routes");
const setupDB = require("../utils/db");
const cors = require("cors");


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(cors());


app.get("/", async (req, res)=>{
    const articles = await Article.find().sort({
        createAt: "desc",
    });
    res.render("../views/index", { articles: articles });
});

setupDB();

app.use("/", articlesRouter);

app.use('/public/', express.static("./public/"));

app.listen(port, () => console.log(`Puerto escuchando en ${port}`));