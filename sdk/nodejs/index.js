const axios = require('axios')
const crypto = require('crypto');


class FlowMerchant {

    secretKey = null
    config = null

    constructor (secretKey) {
        this.secretKey = secretKey
        this.config = {
            headers: {
                ['secret-key']: secretKey
            }
        }

    }

    requestPay = (payload) => new Promise(async(resolve, reject) => {

        try {

            const { amount, requestedToken, metadata } = payload

            const body = {  amount, requestedToken, metadata }

            const response = await axios.post("http://localhost:3000/api/init-payment", body, this.config)

            resolve(response?.data)

        } catch (e) {

            reject(e?.response?.data)

        }
    
    });

    verifyPay = (payload) => new Promise(async(resolve, reject) => {

        try {

            const { signature } = payload

            const body = payload

            body.signature = undefined

            const sig = JSON.stringify((body))

            const hashAlgo = crypto.createHash('sha256')

            const hash = hashAlgo.update(sig).digest('hex');

            if (signature === hash) {
                resolve(body)
            }

        } catch (e) {

            reject(e?.response?.data)
                
        }
    
    });

}


module.exports = FlowMerchant