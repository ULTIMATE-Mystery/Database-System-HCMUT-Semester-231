const axios = require('axios').default; 
const CryptoJS = require('crypto-js'); 
const config = {
  appid: "553",
  key1: "9phuAOYhan4urywHTh0ndEXiV3pKHr5Q",
  key2: "Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3",
  endpoint: "https://sandbox.zalopay.com.vn/v001/tpe/createorder"
};

const embeddata = {
  merchantinfo: ""
};

const items = [{
  itemid: "",
  itemname: "",
  itemprice: 0,
  itemquantity: 1
}];

const order = {
  appid: config.appid, 
  apptransid: '211202_7242', // mã giao dich có định dạng yyMMdd_xxxx
  appuser: "HealthCare", 
  apptime: Date.now(), // miliseconds
  item: JSON.stringify(items), 
  embeddata: JSON.stringify(embeddata), 
  amount: 50000, 
  description: "Thanh toán đơn hàng cho HealthCare",
  bankcode: "zalopayapp", 
};

// appid|apptransid|appuser|amount|apptime|embeddata|item
const data = config.appid + "|" + order.apptransid + "|" + order.appuser + "|" + order.amount + "|" + order.apptime + "|" + order.embeddata + "|" + order.item;
order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

axios.post(config.endpoint, null, { params: order })
  .then(res => {
    console.log(res.data);
  })
  .catch(err => console.log(err));