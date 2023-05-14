const express  = require("express")
const cors=require("cors")
const tezos = require("./chainblock/tezos")
const tron = require("./getblock/tron")
const bodyParser = require("body-parser")
const all = require("./all")




module.exports={
    app:()=>{
        const app=express()
        app.use(cors())
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

        //All blockchains
        app.get("/api/adresses/:type?", all.getAdresses)
        app.get("/api/transactions/:type?", all.getTransactions)
        app.delete("/api/adresses/:id", all.removeAdress)
        app.get("/api/transactions/:id", all.removeTransaction)
        app.all("/api/webhook",all.getBlockWebhook)

        
        return app
    }
}