const TronWeb = require("tronweb")
const { saveAdress, saveTransaction } = require("../models")

const tronWeb = new TronWeb({
    fullHost: "https://trx.getblock.io/mainnet/",
    headers: { "x-api-key": "d02cc299-add9-4bc4-b638-ff8b39993683" }
})


module.exports = {
    createAdress: async (req, res) => {
        try {
            const adressData = await tronWeb.createAccount()

            const data = await saveAdress({
                network: "TRX",
                adress: adressData.address.base58,
                pivate: adressData.privateKey,
                public: adressData.publicKey
            })
            return res.status(200).json({
                data,
                status: true
            })

        } catch (e) {
            console.log(e)
            return res.status(200).json({
                message: e.message,
                error: e,
                status: true
            })
        }
    },
    createTransaction: async (req, res) => {
        let mnemonicData=req.body.passphrase ? tronWeb.fromMnemonic(req.body.passphrase) :  null
        const privateKey = mnemonicData ? mnemonicData.privateKey.slice(2): req.body.pk
        const data = req.body

        if (!privateKey) {
            return res.status(400).json({
                status: false,
                message: "Private key not provided"
            })
        } else if (!data.to) {
            return res.status(400).json({
                status: false,
                message: "Receiver adress not provided"
            })
        } else if (!data.amount) {
            return res.status(400).json({
                status: false,
                message: "Transfer amount not provided"
            })
        }

        try {
            const transactionDetails=await tronWeb.trx.sendTransaction(data.to, data.amount, privateKey)
            const transaction = await saveTransaction({
                from:mnemonicData ? mnemonicData.address : tronWeb.address.fromPrivateKey(privateKey),
                to: data.to,
                network: "TRX",
                amount:  data.amount.toString(),
                status: "",
                data:transactionDetails
            })
            return res.status(200).json({
                data:transaction,
                status: true
            });
        } catch (e) {
            console.error(e)
            return res.status(400).json({
                message: e.message,
                error: e,
                status: false
            })
        }
    },

    getAccount: async (req, res)=>{
        const adress=req.params.adress
        try{
            return res.status(200).json({
                data:await  tronWeb.trx.getAccount(adress)
            })
        }catch(e){  
            console.log(e)
            return res.status(400).json({
                status:false,
                error:e,
                message:e.message
                
            })
        }
    }
}