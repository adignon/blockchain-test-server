const { PrismaClient } = require("@prisma/client")
const { default: axios } = require("axios")

const prisma = new PrismaClient()

module.exports = {
    saveAdress: async (data) => {
        try {
            const walletAdress = await prisma.adress.create({
                data: {
                    passphraseHash: data.passphraseHash,
                    passphrase: data.passphrase,
                    network: data.network,
                    adress: data.adress,
                    pivate: data.pivate,
                    public: data.public
                }
            })
            return walletAdress
        } catch (e) {
            console.error(e)
            return false
        }
    },
    saveTransaction: async (data) => {
        try {
            const transaction = await prisma.transaction.create({
                data: {
                    from: data.from,
                    to: data.to,
                    network: data.network,
                    amount: data.amount,
                    status: data.status,
                    data: data.data
                }
            })
            return transaction
        } catch (e) {
            console.log(e)
            return false;
        }
    },
    getAdresses: async (filters) => {
        try {
            return await prisma.adress.findMany({
                where: filters
            })
        } catch (e) {
            console.error(e)
            return false
        }
    },
    getTransactions: async (filters) => {
        try {
            return await prisma.transaction.findMany({
                where: filters
            })
        } catch (e) {
            console.error(e)
            return false
        }
    },
    removeAdress: async (id) => {
        try {
            return await prisma.adress.delete({
                where: {
                    id: id
                }
            })
        } catch (e) {
            console.error(e)
            return false
        }
    },
    removeTransaction: async (id) => {
        try {
            return await prisma.transaction.delete({
                where: {
                    id: id
                }
            })
        } catch (e) {
            console.error(e)
            return false
        }
    },
    sendLog: async (messageHtml) => {
        const TELEGRAM_BASE_URL = `https://api.telegram.org/bot5698394273:AAHpE9vEe20yK3NanYDGKbj7JwXa1FO1OUo`

        const CHANELS = {
            MONITORING: -1001801239861
        }
        try {
            const { data } = await axios.post(TELEGRAM_BASE_URL + "/sendMessage", {
                "chat_id":  CHANELS.MONITORING,
                "text": messageHtml,
                "parse_mode": "HTML"
            })
            if (data.ok && data.result) {
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log(e)
            return false
        }
    }
}