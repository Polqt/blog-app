import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


function exampleQuote(req, res, next) {
    const quotes = {
        date: "October 1, 2021",
        category: "Motivational",
        title: "The True Path to Success",
        quote: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. But remember, success is not measured by the position you reach in life, but by the obstacles you overcome.",
        image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        author: "Michael Foster",
        profession: "Psychologist",
    };

    req.sampleQuotes = quotes;
    next();
}

app.use(exampleQuote);

app.get("/", (req, res) => {
    res.render("index.ejs", {
        title: "From the Quotables",
        content: "Explore timeless quotes to inspire and motivate you.",
        currentRoute: req.path,
        exampleQuote: req.sampleQuotes,
    });
});

app.get("/about", (req, res) => {
    res.render("about.ejs", {
        title: "About",
        firstContent: "Welcome to Quotables, your go-to platform for discovering and sharing powerful quotes that move and inspire. Whether you’re in search of timeless wisdom, motivation to push through your day, or just a little spark to ignite your creativity, Quotables is here to provide an engaging and easy-to-navigate space for all your inspirational needs. Our platform is designed to be more than just a collection of quotes—it’s a community where ideas, thoughts, and reflections come together to create something meaningful.",
        secondContent: "At the heart of Quotables is Janpol Hidalgo, a passionate 3rd-year Computer Science student at the University of Saint La Salle. Fueled by a deep love for technology and an appreciation for the power of words, Janpol set out to create this web app using Node.js and Express, aiming to blend functionality with simplicity.",
        thirdContent: "At its core, Quotables is more than just a tool for reading quotes—it’s a space for connection, reflection, and inspiration. We believe in the power of words to transform perspectives, uplift spirits, and bridge the gap between individuals from all walks of life. Every quote on this platform is a reminder that words have weight, and it’s our mission to ensure they reach those who need them most. Join us in exploring the beauty of language and the wisdom it can impart.",
        currentRoute: req.path,
    });
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs", {
        title: "Contact",
        content: "For any inquiries or further assistance, feel free to reach out to us.",
        currentRoute: req.path,
    });
})

app.get("/create", (req, res) => {
    res.render("create.ejs", {
        currentRoute: req.path,
    });
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
