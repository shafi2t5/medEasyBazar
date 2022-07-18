import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { IoIosCloseCircle } from 'react-icons/io';
import { useCart } from '@contexts/cart/cart.context';
import { ROUTES } from '@utils/routes';
import Counter from '@components/ui/counter';

type CartItemProps = {
  item: any;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { isInStock, addItemToCart, removeItemFromCart, clearItemFromCart } =
    useCart();

  const outOfStock = isInStock(item.id);

  return (
    <div
      className={`group w-full h-auto flex justify-start items-center text-brand-light py-4 md:py-7 border-b border-border-one border-opacity-70 relative last:border-b-0`}
      title={item?.medicine_name}
    >
      <div className="relative flex rounded overflow-hidden shrink-0 cursor-pointer w-[90px] md:w-[100px] h-[90px] md:h-[100px]">
        <Image
          src={
            `${process.env.NEXT_PUBLIC_ASSETS_API_ENDPOINT}${item?.medicine_image}` ??
            '/assets/images/empty-cart.png'
          }
          width={100}
          height={100}
          loading="eager"
          alt={item.name || 'Product Image'}
          className="object-cover bg-fill-thumbnail"
        />
        <div
          className="absolute top-0 flex items-center justify-center w-full h-full transition duration-200 ease-in-out bg-black ltr:left-0 rtl:right-0 bg-opacity-30 md:bg-opacity-0 md:group-hover:bg-opacity-30"
          onClick={() => clearItemFromCart(item.id)}
          role="button"
        >
          <IoIosCloseCircle className="relative text-2xl text-white transition duration-300 ease-in-out transform md:scale-0 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="ltr:pl-3 rtl:pr-3 md:ltr:pl-4 md:rtl:pr-4">
          <Link
            href={`${ROUTES.PRODUCT}/${item?.slug}`}
            className="block leading-5 transition-all text-brand-dark text-13px sm:text-sm lg:text-15px hover:text-brand"
          >
            {item?.medicine_name}
          </Link>
          <div className="text-13px sm:text-sm text-brand-muted mt-1.5 block mb-2">
            {item.unit} X {item.quantity}
          </div>
          <Counter
            value={item.quantity}
            onIncrement={() => addItemToCart(item, item.quantity + 1)}
            onDecrement={() => removeItemFromCart(item.id)}
            variant="cart"
            disabled={!outOfStock}
          />
        </div>

        <div className="flex font-semibold text-sm md:text-base text-brand-dark leading-5 shrink-0 min-w-[65px] md:min-w-[80px] justify-end">
          ৳ {item?.itemTotal.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
