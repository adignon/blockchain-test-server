const express  = require("express")
const tezos = require("./chainblock/tezos")
const tron = require("./getblock/tron")
const bodyParser = require("body-parser")



module.exports={
    app:()=>{
        const app=express()
        app.use(bodyParser.json())

        //Chainstack
        //Tezos
        app.get("/api/tezos/adress", tezos.createAdress)
        app.post("/api/tezos/transactions", tezos.createTransaction)

        //getblock
        //Tron
        app.get("/api/trx/adress", tron.createAdress)
        app.post("/api/trx/transactions", tron.createTransaction)
        app.get("/api/trx/accounts/:adress", tron.getAccount)

        
        return app
    }
}