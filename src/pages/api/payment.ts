const SSLCommerzPayment = require('sslcommerz-lts');

const store_id = 'testbox';
const store_passwd = 'qwerty';
const is_live = false;

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const data = {
      total_amount: +req.body.price,
      currency: 'BDT',
      tran_id: req.body?.transId,
      success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/paymentSuccess?orderId=${req.body.id}&token=${req.body.token}`,
      fail_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/paymentFail`,
      cancel_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/paymentCancel`,
      ipn_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/ipn`,
      shipping_method: 'Courier',
      product_name: 'Computer.',
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: 'Customer Name',
      cus_email: 'customer@example.com',
      cus_add1: req?.body?.address.address,
      cus_add2: req?.body?.address.address,
      cus_city: req?.body?.address.address_name,
      cus_state: req?.body?.address.address_name,
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: req?.body?.address.phone,
      cus_fax: req?.body?.address.phone,
      ship_name: req?.body?.address.address_name,
      ship_add1: req?.body?.address.address,
      ship_add2: req?.body?.address.address,
      ship_city: req?.body?.address.address,
      ship_state: req?.body?.address.address,
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apires = await sslcz.init(data);
    res.json(apires);
  }
}
