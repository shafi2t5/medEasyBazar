import usePrice from '@framework/product/use-price';
import { calculateTotal } from '@contexts/cart/cart.utils';

export const TotalPrice: React.FC<{ items?: any }> = ({ items }) => {
  // const { price } = usePrice({
  //   amount: Math.round(calculateTotal(items?.medicines) + items?.delivery_fee),
  //   currencyCode: 'USD',
  // });

  const price = Math.round(
    calculateTotal(items?.medicines) + items?.delivery_fee
  );
  return (
    <span className="total_price">
      <span className="mr-1 font-bold">৳</span>
      {price}
    </span>
  );
};

export const DiscountPrice = (discount: any) => {
  const { price } = usePrice({
    amount: discount?.discount,
    currencyCode: 'USD',
  });
  return <>-{price}</>;
};

export const DeliveryFee = (delivery: any) => {
  const { price } = usePrice({
    amount: delivery?.delivery,
    currencyCode: 'USD',
  });
  return <>{price}</>;
};

export const SubTotalPrice: React.FC<{ items?: any }> = ({ items }) => {
  // const { price } = usePrice({
  //   amount: calculateTotal(items),
  //   currencyCode: 'USD',
  // });
  const price = calculateTotal(items);
  return <>{price}</>;
};
