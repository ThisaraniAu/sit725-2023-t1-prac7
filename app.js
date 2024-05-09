const express=require('express') 
const bodyparser=require('body-parser')
const path = require("path");
const { Console } = require('console');
const app=express()
 const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


//app.use(bodyparser.urlencoded({extended:true}))


/**app.get('',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})**/

//Define a GET endpoint to serve the card data

app.get('/api/cards', (req, res) =>{
    res.json({cards: cardList});
})

const cardList =[
    {
        title:"Kitten 2",
        path: "image/1.webp",
        link: "About Kitten 2",
        description:"Demo description about kitten 2",
        subTitle:"Kitten 2 Subtitle",
    },
    {
        title:"Kitten 3",
        path: "image/2.webp",
        link: "About Kitten 3",
        description:"Demo description about kitten 3",
        subTitle:"Kitten 3 Subtitle",
    }

]

app.get('/api/projects',(req,res) =>{
    res.json({statusCode:200, data: cardList, message:"Success"})
})
//io request
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
    var rand = Math.floor(Math.random() * 100); 
    console.log(rand);
    socket.on("message from the frontend:", (message) => {
      console.log("message from the frontend:", message);
    });
  });
var port = process.env.port || 3000;



server.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
  });