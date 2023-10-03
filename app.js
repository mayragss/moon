const express = require('express');
const app = express();
const bodyParser = require("body-parser");

// create application/json parser
var jsonParser = bodyParser.json();


app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
 
// create application/x-www-form-urlencoded parser
//var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get("/", (req, res) => { 
    res.render("index", {mensagem:""});
});

app.post("/send-message", jsonParser, (req, res) => {

    const msg = req.body.msg;
    const email = req.body.email;
    const name = req.body.name;
    const phone = req.body.number;

    const message = `
    Nome do cliente: ${name}\nEmail: ${email}\nTelemóvel: ${phone}\nMensagem: \n${msg}`;

    const accountSid = 'AC5380ebfa8fed7b1d53eda0ff9dcceb8f';
    const authToken = '29022f93493a1309b17ab6e6361305c5';
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            from: 'whatsapp:+12567332935',
            body: `${message}`,
            to: `whatsapp:+55957056779`
        })
        .then(message => console.log(message));
    res.render("index",{message: "Orçamento enviado com sucesso."})
});

app.listen("8020", () => {
    console.log("server on");
});