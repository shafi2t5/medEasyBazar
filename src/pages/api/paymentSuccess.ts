import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    let data = {
      order_id: +req.query.orderId,
      status: req?.body?.status,
      tran_date: req?.body?.tran_date,
      tran_id: req?.body.tran_id,
      val_id: req?.body.val_id,
      amount: +req?.body?.amount,
      store_amount: +req?.body?.store_amount,
      card_type: req?.body?.card_type,
    };

    const headers = { Authorization: `Bearer ${req.query.token}` };
    await http.post(API_ENDPOINTS.PAYMENTINFO, data, {
      headers,
    });

    res.redirect(
      302,
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}/paymentSuccess?orderId=${req.query.orderId}&transId=${req?.body.tran_id}&cartType=${req?.body?.card_type}&status=${req?.body?.status}&amount=${req?.body?.amount}`
    );
  }
}
