const {app} = require("./src/app");

app().listen(4000, ()=>{
    console.log("server started")
})