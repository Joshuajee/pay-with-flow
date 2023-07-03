const axios = require('axios')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();



const postTransaction = async (tx_ref, payment) => {

    const transaction = await prisma.transaction.findUnique({ 
        where: { tx_ref }
    })

    const address = transaction.address

    try {

        const user = await prisma.user.findUnique({
            where: {
                address: address
            }
        })

        const body = { transaction, payment }

        await axios.post(user.webhookUrl, body)

    } catch (e) {
        //console.error(e)
    }

}



module.exports = {
    postTransaction
}