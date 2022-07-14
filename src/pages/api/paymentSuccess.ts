import NextCors from 'nextjs-cors';

export default async function handler(req: any, res: any) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  });
  if (req.method === 'POST') {
    res.redirect(
      `http://localhost:3000/my-account/orders?transId=${req?.body.tran_id}&valId=${req?.body.val_id}&cartType=${req?.body?.card_type}&storeAmount=${req?.body?.store_amount}&status=${req?.body?.status}&amount=${req?.body?.amount}`
    );
  }
}
