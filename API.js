
/*RESTful API for a simple note-taking application using Node.js and Express.js, with MongoDB 
as the database. The API allows users to create, retrieve, update, and delete text notes. */

import express from "express";
import mongoose from "mongoose";
import basicAuth from "basic-auth";
const app = express();
const port = 4000;


mongoose.connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const postSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    title: String,
    content: String,
    created: Date,
    modified: Date,
});


const Post = mongoose.model("Post", postSchema);

//middleware for basic authentication
const authenticate = (req, res, next) => {
    const credentials = basicAuth(req);


    if (!credentials || credentials.name !== "Hardiknotes" || credentials.pass !== "SkillStreet") {
        res.status(401).send("Unauthorized");
    } else {
        next(); 
    }
};


app.use(authenticate);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//to post a new note
app.post('/api/posts', async (req, res) => {
        try {
        const id = await Post.countDocuments();
        const newData = {
            id: id+1,
            title: req.body.title,
            content: req.body.content,
            created: new Date(),
            modified: new Date(),
        };
        console.log("created");
        // Create a new post in the MongoDB database
        console.log(newData);
        const createdPost = await Post.create(newData);
        // console.log("made up");

        res.status(200).send(createdPost);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }

});

//to retrieve all notes
app.get('/allNotes', async (req, res) => {
    try {
        const allPosts = await Post.find();

        res.json(allPosts);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

//to retreive a note of particular id
app.get('/post/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await Post.findOne({id:id});
        console.log(result);

        if (!result) return res.sendStatus(404).send({ message: "Trying to find a non existent note" });
        res.json(result);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

//to update a note
app.put('/posts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedPost = await Post.updateOne(
            { "id": id },
            {
                $set: {
                    title: req.body.title ,
                    content: req.body.content ,
                    modified: new Date(),
                }
            }
        );
        

        res.json(updatedPost);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

//to delete a note
app.delete('/posts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        console.log(id);
        const result = await Post.deleteOne({ id: id });

        if (!result) return res.status(404).json({ message: "Trying to delete a non existent note" });
        res.json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
