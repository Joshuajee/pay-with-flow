const axios = require('axios')
const crypto = require('crypto');
const fcl = require('@onflow/fcl')


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

            const response = await axios.post("https://flow-merchant.netlify.app/api/init-payment", payload, this.config)

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
            
            } else {
            
                reject("Invalid Signature")
            
            }

        } catch (e) {

            reject(e)
                
        }
    
    });

}


module.exports = FlowMerchant