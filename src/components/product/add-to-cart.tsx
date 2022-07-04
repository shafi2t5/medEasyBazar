import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import PlusIcon from '@components/icons/plus-icon';
import useWindowSize from '@utils/use-window-size';

interface Props {
  data: any;
  variation?: any;
  disabled?: boolean;
}
const AddToCart = ({ data, variation, disabled }: Props) => {
  const { width } = useWindowSize();
  const {
    addItemToCart,
    removeItemFromCart,
    isInStock,
    getItemFromCart,
    isInCart,
  } = useCart();
  // const item = generateCartItem(data!, variation);
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation();
    addItemToCart(data, 1);
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(data.id);
  };
  // const outOfStock = isInCart(data?.id) && !isInStock(data.id);
  const iconSize = width! > 480 ? '19' : '17';
  return !isInCart(data?.id) ? (
    <button
      className="flex items-center justify-center w-8 h-8 text-4xl rounded-lg bg-brand-navColor lg:w-10 lg:h-10 text-brand-light focus:outline-none"
      aria-label="Count Button"
      onClick={handleAddClick}
      disabled={disabled}
    >
      <PlusIcon width={iconSize} height={iconSize} opacity="1" />
    </button>
  ) : (
    <div className="absolute right-2">
      <Counter
        value={getItemFromCart(data?.id).quantity}
        onDecrement={handleRemoveClick}
        onIncrement={handleAddClick}
        disabled={isInStock(data.id)}
        className="w-full"
      />
    </div>
  );
};

export default AddToCart;
