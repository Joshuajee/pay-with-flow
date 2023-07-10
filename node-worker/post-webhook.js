const axios = require('axios')
const { PrismaClient } = require('@prisma/client')
const crypto = require('crypto');


const prisma = new PrismaClient();


const postTransaction = async (user, tx_ref, payment) => {

    const transaction = await prisma.transaction.findUnique({ 
        where: { tx_ref }
    })

    try {

        const payload = JSON.stringify({ transaction, payment })

        const hashAlgo = crypto.createHash('sha256')

        const signature = hashAlgo.update(payload).digest('hex');

        const body = { transaction, payment, signature }

        await axios.post(user.webhookUrl, body)

    } catch (e) {
        console.error(e)
    }

}



module.exports = {
    postTransaction
}