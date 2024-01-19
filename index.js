const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id : uuidv4(),
        username : "krishna",
        content : "i am Krishna Baria",
    },

    {
        id : uuidv4(),
        username : "shradha",
        content : "i am shardha",
    },
    
];

app.get("/posts",(req,res)=>{
    console.log("requiest Recived");
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    console.log("request recived");
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    console.log("request receved");
    let {username, content} = req.body;
    let id =uuidv4();
    posts.push({id, username, content});
    //console.log(req.body);
    //res.send("server working well!");
    res.redirect("/posts");
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let newContent = req.body.content;
    console.log(newContent);
    let post = posts.find((p) =>id === p.id);
    post.content = newContent;
    console.log(post);
    // res.send("patch request working");
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) =>id === p.id);
    res.render("edit.ejs",{post});
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    //console.log(id);
    let post = posts.find((p) =>id === p.id);
    console.log(post);
    res.render("show.ejs",{post});
});

app.listen(port,()=>{
    console.log(`app is listening on ${port}`);
});


