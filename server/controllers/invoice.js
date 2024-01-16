const axios = require('axios');
require('dotenv').config();

exports.createInvoice = (req, res, next) => {

  const headers = {
    'accessKey': `${process.env.WFIRMA_ACCESS_KEY}`,
    'secretKey': `${process.env.WFIRMA_SECRET_KEY}`,
    'appKey': `${process.env.WFIRMA_APP_KEY}`
  }
  
  const data = '<?xml version="1.0" encoding="UTF-8"?>\n<api>\n    <invoices>\n        <invoice>\n            <contractor>\n                <name>Testowy kontrahent</name>\n                <zip>10-100</zip>\n                <city>Wrocław</city>\n            </contractor>\n            <type>normal</type>\n            <type_of_sale>WSTO_EE</type_of_sale>\n            <invoicecontents>\n                <invoicecontent>\n                    <name>123123</name>\n                    <count>1.0000</count>\n                    <unit_count>1.0000</unit_count>\n                    <price>9699.00</price>\n                    <unit>szt.</unit>\n                </invoicecontent>\n            </invoicecontents>\n        </invoice>\n    </invoices>\n</api>';
  
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api2.wfirma.pl/invoices/add?outputFormat=xml&inputFormat=xml&company_id=',
    headers: {...headers},
    data : data
  };

  axios(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    res.send(JSON.stringify(response.data))
  })
  .catch((error) => {
    console.log(error);
  });
}







