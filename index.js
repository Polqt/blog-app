import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs", );
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
})

app.get("/create", (req, res) => {
    res.render("create.ejs");
})

app.post("/contact", (req, res) => {
    const firstName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.email;
    const message = req.body.message;

    if (!firstName || !lastName || !email || !message) {
        console.log("Please fill out all fields");
        res.redirect('/contact?error=Please fill out all fields');
    } else {
        console.log(`Contact form submitted by ${firstName} ${lastName} with an email of ${email} and a message of: ${message}`);
        res.redirect('/contact?success=Form submitted successfully!');
    };
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});