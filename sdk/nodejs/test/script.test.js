const flowMerchant = require('flow-merchant-sdk-beta')

const FlowMerchant = new flowMerchant("sk_key_qfbb73swa1t7gl2bpayws4ssdiccr7dt")

const Init = async() => {

    console.log("Payment Request")

    try {

        const payload = {
            amount: 100, 
            requestedToken: "0",
            metadata: {
                userId: "22222"
            } 
        }
        const init = await FlowMerchant.requestPay(payload)

        console.log(init)

    } catch(e) {
        console.error(e)
    }
}


const Verify = async() => {

    console.log("Payment Request")

    try {

        const payload = {
            amount: 100, 
            requestedToken: 0,
            meta: {
                userId: "22222"
            } 
        }
        const init = await FlowMerchant.requestPay(payload)

        console.log(init)

    } catch(e) {
        console.error(e)
    }
}


Init()
