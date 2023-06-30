const express = require("express")
const axios = require("axios")


const app = express()

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const SECRET_KEY = "sk_key_g5l3y4ygfqeb8zs7wxwawhpgfo5hl9sp" // Your Secret Key


app.post("/init", async(req, res) => {

    const config = {
        headers: {
            ['secret-key']: SECRET_KEY
        }
    }

    const body = {
        amount: 500,
        requestedToken: "0" // 0 FLow, 1 TUSD, 2 TEUR, 3 TGBP
    }

    const response = await axios.post("http://localhost:3000/api/init-payment", body, config)

    const data = response?.data?.data

    console.log(data)

    res.send({...data})

})


app.post("/webhook", async(req, res) => {

    console.log("YES")

    console.log(req.body)

    
    res.send("success")

})




const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});