import Link from 'next/link';
// import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import Text from '@components/ui/text';
import Button from '@components/ui/button';
import { CheckoutItem } from '@components/checkout/checkout-card-item';
import { CheckoutCardFooterItem } from './checkout-card-footer-item';
import { useTranslation } from 'next-i18next';
// import Router from 'next/router';
import { ROUTES } from '@utils/routes';
import { useOrderMutation } from '@framework/order/post-order';
import { useUI } from '@contexts/ui.context';
import { toast } from 'react-toastify';

const CheckoutCard: React.FC = () => {
  const { t } = useTranslation('common');
  const { items, total, isEmpty } = useCart();

  const { mutate: orderPostApi, isLoading, data } = useOrderMutation();
  const { selectedAddress, isAuthorized, cartList } = useUI();

  //const discount = items.reduce((total, data) => total + data.discountValue, 0);

  const deliveryAmount = cartList?.charge_free_order_amount
    ? cartList?.charge_free_order_amount > total
      ? cartList?.delivery_fee
      : 0
    : total < 1000
    ? 30
    : 0;

  function orderHeader() {
    // !isEmpty && Router.push(ROUTES.ORDER);
    if (total < cartList?.minimum_order) {
      return toast(`Minimum order amount ${cartList?.minimum_order}`);
    }
    let orderData = {
      medicines: items.map((data) => {
        return {
          id: data?.id,
          name: data?.medicine_name,
          quantity: data?.quantity,
          unit: data?.unit,
          price: data?.price,
        };
      }),
      coupon_id: cartList?.coupons?.[0]?.id || 1,
      address_id: selectedAddress?.id,
      delivery_fee: deliveryAmount,
      payment_method: 'cash',
    };
    !isEmpty && orderPostApi(orderData);
  }
  const checkoutFooter = [
    {
      id: 1,
      name: t('text-sub-total'),
      price: Math.round(total),
    },
    {
      id: 2,
      name: t('text-shipping'),
      price: deliveryAmount,
    },
    // {
    //   id: 3,
    //   name: t('text-discount'),
    //   price: discount,
    // },
    {
      id: 4,
      name: t('text-total'),
      price: Math.round(total + deliveryAmount),
    },
  ];
  return (
    <>
      <div className="px-4 py-1 border rounded-md border-border-base text-brand-light xl:py-6 xl:px-7">
        <div className="flex pb-2 text-sm font-semibold rounded-md text-heading">
          <span className="font-medium text-15px text-brand-dark">
            {t('text-product')}
          </span>
          <span className="font-medium ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
            {t('text-sub-total')}
          </span>
        </div>
        {!isEmpty ? (
          items.map((item) => <CheckoutItem item={item} key={item.id} />)
        ) : (
          <p className="py-4 text-brand-danger text-opacity-70">
            {t('text-empty-cart')}
          </p>
        )}
        {checkoutFooter.map((item: any) => (
          <CheckoutCardFooterItem item={item} key={item.id} />
        ))}
        <Button
          variant="formButton"
          className={`w-full mt-8 mb-5 bg-brand text-brand-light rounded font-semibold px-4 py-3 transition-all 
          }`}
          loading={isLoading}
          disabled={
            items?.length < 1 ||
            !isAuthorized ||
            !selectedAddress?.id ||
            isLoading
          }
          onClick={orderHeader}
        >
          {t('button-order-now')}
        </Button>
      </div>
      <Text className="mt-8">
        {t('text-by-placing-your-order')}{' '}
        <Link href={ROUTES.TERMS}>
          <a className="font-medium underline text-brand">
            {t('text-terms-of-service')}{' '}
          </a>
        </Link>
        {t('text-and')}{' '}
        <Link href={ROUTES.PRIVACY}>
          <a className="font-medium underline text-brand">
            {t('text-privacy')}
          </a>
        </Link>
        . {t('text-credit-debit')}
      </Text>
      <Text className="mt-4">{t('text-bag-fee')}</Text>
    </>
  );
};

export default CheckoutCard;
