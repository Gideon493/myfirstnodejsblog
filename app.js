const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { Blog } = require('./models/blog');
const { render } = require('ejs');
const app = express();

const dbURL = 'mongodb+srv://gideongetich493:8aWVPgSf9CUUPJow@myfirstnodeapp.xj7fr4d.mongodb.net/gid-node?retryWrites=true&w=majority&appName=myfirstnodeapp';

mongoose.connect(dbURL)
    .then((result) => {
        console.log('Connected sucessfully');
        app.listen(3000);

        console.log(result);
    })
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {

    res.redirect('/blogs');

});

app.get('/blogs', (req, res) => {

    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('home', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => console.log(err));

});
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((rsults) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/about-one', (req, res) => {

    const blog = new Blog({
        title: "Node crash course",
        body: "Learning Node Js crash course",
        name: "Gideon One"
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));

    //res.render('about', { title: 'About' });
});


app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { title: 'Blog Details', blog: result })
        })
        .catch((err) => {
            console.log(err);
        })
});
app.get('/create', (req, res) => {

    res.render('create', { title: 'Create Blog' });
});

app.get('/about-me', (req, res) => {

    res.redirect('/', { title: 'About' });
});
app.use((req, res) => {

    res.render('404', { title: 'Error 404' });
});