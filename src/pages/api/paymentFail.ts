export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    res.redirect(302, `${process.env.NEXT_PUBLIC_WEBSITE_URL}/paymentFail`);
  }
}
