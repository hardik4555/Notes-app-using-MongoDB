import express from 'express';
import axios from 'axios';

const yourUserName="Hardiknotes";
const yourPassword="SkillStreet"
const app= express(); 
const port=3000;
const API_URL = 'http://localhost:4000'
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port ,()=>
{
    console.log(`listening on ${port}`);
})

app.get('/', async(req,res)=>
{
    try {
        const response = await axios.get(API_URL+'/allNotes',{
            auth: {
                username: yourUserName,
                password: yourPassword,
            }
        });
        console.log(response);
        res.render('index',{posts:response.data});
    } catch (error) {
        console.error("There is error in fetching response", error.message);
    }
})
app.get("/new", (req, res) => {
    res.render("modify.ejs", { heading: "New Note", submit: "Create Note" });
  });

app.post("/api/posts/:id", async(req,res)=>
{
    try{
        const id= parseInt(req.params.id);
        const response =await axios.put(API_URL+`/posts/${id}`, req.body, {
            auth: {
                username: yourUserName,
                password: yourPassword,
            }
        });

        console.log(response);
        res.redirect('/');
    }
    catch(error)
    {
        console.error("Not able to update the post", error.message);
    }
})
app.get('/edit/:id',async(req,res)=>
{   
    try {
        const id= parseInt(req.params.id)
        const response= await axios.get(API_URL+`/post/${id}`,{
            auth: {
                username: yourUserName,
                password: yourPassword,
            }
        });
       res.render('modify.ejs',{heading: "Edit Note", submit: "Edit", post: response.data});
    } catch (error) {
        res.sendStatus(500);
        console.error("Not able to fetch the element by id")
    }
    
})

app.post('/api/posts', async(req,res)=>
{
    try {
        console.log(req.body);
        const response= await axios.post(API_URL+'/api/posts', req.body, {
            auth: {
                username: yourUserName,
                password: yourPassword,
            }
        });
        res.redirect('/');

    } catch (error) {
        console.error("There is an error posting the new post", error.message);
    }
})


app.get('/api/posts/delete/:id', async(req,res)=>
{   

    try {
        const id=req.params.id;
        const response= await axios.delete(API_URL+`/posts/${id}`, {
            auth: {
                username: yourUserName,
                password: yourPassword,
            }
        });
        console.log(response.data);
        res.redirect('/');
    } catch (error) {
        console.error("not able to delete");
    }
})