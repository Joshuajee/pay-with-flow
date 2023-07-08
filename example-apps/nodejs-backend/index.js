const express = require("express")
const flowMerchant = require('flow-merchant-sdk-beta')

// initialize with the secret key
const FlowMerchant = new flowMerchant("sk_key_1jqneypxpu7zmblevme7x73ia20ei4z7")
const app = express()

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.post("/pay", async(req, res) => {
    try {
        const response = await FlowMerchant.requestPay(req.body)
        const data = response?.data
        console.log(data)
        res.send({...data})
    } catch (e) {
        res.status(500).send(e)
    }
})

app.post("/webhook", async(req, res) => {
    console.log(req.body)
    
    const response = await FlowMerchant.verifyPay(req.body)
    // Update Database
    console.log(response)
    res.send("success")
})




const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});