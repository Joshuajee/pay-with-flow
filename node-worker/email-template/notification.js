const { getTokenNameById } = require("./../util")

const notification = (payload) => {

    const { amount, amountPaid, status, tx_ref, paymentId, requestedToken, narration, paidAt } = payload

    const token = getTokenNameById(requestedToken)

    return (`
        <!DOCTYPE html>

        <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
            <head>
                <title></title>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
                <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
                <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
                <!--[if !mso]><!-->
                <link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" type="text/css"/>
                <link href="https://fonts.googleapis.com/css?family=Alegreya" rel="stylesheet" type="text/css"/>
                <link href="https://fonts.googleapis.com/css?family=Arvo" rel="stylesheet" type="text/css"/>
                <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css"/>
                <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css"/>
                <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css"/>
                <!--<![endif]-->
                <style>
                    * {
                        box-sizing: border-box;
                    }
            
                    body {
                        margin: 0;
                        padding: 0;
                    }
            
                
                </style>
            </head>

            <body style="background-color: #FFFFFF; margin: 0; padding: 2px; -webkit-text-size-adjust: none; text-size-adjust: none;">

                <p style="margin-bottom:10px;">

                    <p>Transaction Ref: ${tx_ref} </p>

                    <p>Payment Id: ${paymentId}</p>

                    <p>Amount: ${amount} ${token}</p>

                    <p>Amount Paid: ${amountPaid} ${token} </p>

                    <p>Payment Status: ${status} </p>

                    <p>Narration: ${narration || "N/A"} </p>

                    <p>Paid At: ${paidAt || "N/A"} </p>
                    
                </p>


            </body>

        </html>
    `)
}

module.exports = {
    notification
}