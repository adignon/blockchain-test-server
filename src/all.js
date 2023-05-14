const models = require("./models")

module.exports = {
    getAdresses: async (req, res) => {
        try {
            return res.status(200).json({
                data: await models.getAdresses({
                    network: {
                        equals: req.params.type.toUpperCase()
                    }
                }),
                status: true
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({
                message: e.message,
                error: e,
                status: false
            })
        }
    },

    getAdresses: async (req, res) => {
        try {
            return res.status(200).json({
                data: await models.getAdresses({
                    network: {
                        equals: req.params?.type?.toUpperCase()
                    }
                }),
                status: true
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({
                message: e.message,
                error: e,
                status: false
            })
        }
    },

    getTransactions: async (req, res) => {
        try {
            return res.status(200).json({
                data: await models.getTransactions({
                    network: {
                        equals: req.params.type.toUpperCase()
                    }
                }),
                status: true
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({
                message: e.message,
                error: e,
                status: false
            })
        }
    },

    removeAdress: async (req, res) => {
        try {
            return res.status(200).json({
                data: await models.removeAdress( req.params.id),
                status: true
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({
                message: e.message,
                error: e,
                status: false
            })
        }
    },
    removeTransaction: async (req, res) => {
        try {
            return res.status(200).json({
                data: await models.removeTransaction(req.params.id),
                status: true
            })
        } catch (e) {
            console.log(e)
            return res.status(400).json({
                message: e.message,
                error: e,
                status: false
            })
        }
    },
    getBlockWebhook:async(req, res)=>{
        models.sendLog(`
            GetBlock Transaction Log:
            Body:
            ${JSON.stringify(req.body)}
            Query:
            ${JSON.stringify(req.query)}
        `)
        res.status(200).end()
    }
}