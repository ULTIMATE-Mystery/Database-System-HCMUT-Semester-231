var partnerCode = "MOMODZXF20211213";
var accessKey = "GGPqbepkNu7RizEi";
var secretkey = "uUc3kJmX2xFj8a8syYmt5hUsYlx1R1AX";
var requestId = partnerCode + new Date().getTime();
var orderId = requestId;
var orderInfo = "Thanh toán cho HealthCare";
var returnUrl = "http://localhost:3000/";
var notifyUrl = "https://callback.url/notify";
var amount = "50000";
var requestType = "captureMoMoWallet"
var extraData = "";

var rawSignature = "partnerCode=" + partnerCode 
                 + "&accessKey=" + accessKey
                 + "&requestId=" + requestId
                 + "&amount=" + amount
                 + "&orderId=" + orderId
                 + "&orderInfo=" + orderInfo
                 + "&returnUrl=" + returnUrl
                 + "&notifyUrl=" + notifyUrl
                 + "&extraData=" + extraData 

const crypto = require('crypto');
var signature = crypto.createHmac('sha256', secretkey)
    .update(rawSignature)
    .digest('hex');

const requestBody = JSON.stringify({
    partnerCode : partnerCode,
    accessKey : accessKey,
    requestId : requestId,
    amount : amount,
    orderId : orderId,
    orderInfo : orderInfo,
    returnUrl : returnUrl,
    notifyUrl : notifyUrl,
    extraData : extraData,
    requestType : requestType,
    signature : signature,
    lang: 'vi'
});

const https = require('https');
const options = {
    hostname: 'payment.momo.vn',
    port: 443,
    path: '/gw_payment/transactionProcessor',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
        'Access-Control-Allow-Origin': 'payment.momo.vn'
    }
}   

const req = https.request(options, res => {
    res.setEncoding('utf8');
    console.log(res.body);
    res.on('data', (body) => {
        console.log(body);
        console.log('payUrl: ');
        console.log(JSON.parse(body).payUrl);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
})

req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
});

console.log("Sending....")
req.write(requestBody);
req.end();