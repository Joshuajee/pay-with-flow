const express = require("express")
const flowMerchant = require('flow-merchant-sdk-beta')

const FlowMerchant = new flowMerchant("sk_key_qfbb73swa1t7gl2bpayws4ssdiccr7dt")


const app = express()

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


app.post("/init", async(req, res) => {

    try {

        const body = req.body

        const response = await FlowMerchant.requestPay(body)

        const data = response?.data

        console.log(data)

    res.send({...data})

    } catch (e) {
        console.error(e)
        res.status(500).send("Error")
    }

})


app.post("/webhook", async(req, res) => {

    console.log("YES")

    console.log(req.body)

    const response = await FlowMerchant.verifyPay(req.body)

    console.log(response)
    
    res.send("success")

})




const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});