import usePrice from '@framework/product/use-price';
import { calculateTotalPrice } from '@contexts/cart/cart.utils';

export const TotalPrice: React.FC<{ items?: any }> = ({ items }) => {
  const price = calculateTotalPrice(items?.medicines) + items?.delivery_fee;

  return (
    <span className="total_price">
      <span className="mr-1 font-bold">৳</span>
      {price.toFixed(2)}
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
  return (
    <>
      <span className="mr-1 font-bold">৳</span>
      {delivery?.delivery}
    </>
  );
};

export const SubTotalPrice: React.FC<{ items?: any }> = ({ items }) => {
  const price = calculateTotalPrice(items);
  return <>{price}</>;
};
