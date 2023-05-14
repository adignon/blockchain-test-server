const {Sotez,cryptoUtils} = require("sotez")
const crypto = require("crypto");

const { saveAdress, saveTransaction } = require("../models");
const { NETWORKS } = require("../config");

const tezos = new Sotez('https://nd-106-329-480.p2pify.com/1d4fab10de30c4cc9f2bae763a90d2e7');

module.exports = {
    async createAdress(req, res) {
        try {
            //12 words passphrase/mnemonic  
            const passphrase = cryptoUtils.generateMnemonic()
            const mnemonic = crypto.createHash('sha256')
                .update(passphrase)
                .digest('hex');

            const keys = await cryptoUtils.generateKeys(mnemonic)
            const sk_encrypted = cryptoUtils.encryptSecretKey(keys.sk, passphrase);

            const adress=await saveAdress({
                passphraseHash: mnemonic,
                passphrase,
                network:NETWORKS.TEZOS,
                adress: keys.pkh,
                pivate: sk_encrypted,
                public: keys.pk
            })

            return res.status(200).json({
                data:adress,
                status: true
            })
        } catch (e) {
            return res.status(400).json({
                message: e.message,
                error: e,
                status: false
            })
        }
    },

    async createTransaction(req, res) {
        
        const privateKey = req.body.pk
        const passphrase = req.body.passphrase || null
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
            await tezos.importKey(
                privateKey,
                passphrase
            );

            const { hash } = await tezos.transfer({
                to: data.to,
                amount: data.amount,
            });

            return res.status(200).json({
                data:{
                    tr_hash: hash
                },
                status:true
            })

        } catch (e) {
            console.log(e)
            return res.status(400).json({
                message:e.message,
                error:e,
                status:false
            })
        }
    }

}