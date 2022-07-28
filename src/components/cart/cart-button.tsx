import CartIcon from '@components/icons/cart-icon';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { fetchCartData } from '@framework/cart/cart';
import { useModalAction } from '@components/common/modal/modal.context';

type CartButtonProps = {
  className?: string;
  iconClassName?: string;
  hideLabel?: boolean;
  isShowing?: boolean;
};

const CartButton: React.FC<CartButtonProps> = ({
  className,
  iconClassName = 'text-brand-navColor text-opacity-100',
  hideLabel,
  isShowing,
}) => {
  const { t } = useTranslation('common');
  const { openDrawer, setDrawerView, isAuthorized } = useUI();
  const { totalItems, setItemsForCart } = useCart();
  const { openModal } = useModalAction();

  async function fetchCart() {
    const data: any = await fetchCartData();
    setItemsForCart(data?.data);
  }

  async function handleCartOpen() {
    if (!isAuthorized) {
      openModal('LOGIN_VIEW');
    } else {
      fetchCart();
      setDrawerView('CART_SIDEBAR');
      isShowing;
      return openDrawer();
    }
  }

  return (
    <button
      className={cn(
        'bg-brand-light rounded-xl flex items-center justify-center focus:outline-none transform',
        className
      )}
      onClick={handleCartOpen}
      aria-label="cart-button"
    >
      <div className="relative flex items-center p-1 md:p-2">
        <CartIcon className={cn(iconClassName)} width={22} height={22} />
        <span className="min-w-[20px] min-h-[20px] p-0.5 rounded-[20px] flex items-center justify-center bg-brand-info text-brand-light absolute -top-2.5 right-0 text-10px font-bold">
          {totalItems}
        </span>
      </div>
      {!hideLabel && (
        <span className="text-sm font-normal lg:text-15px text-brand-dark ltr:ml-2 rtl:mr-2">
          {t('text-cart')}
        </span>
      )}
    </button>
  );
};

export default CartButton;
