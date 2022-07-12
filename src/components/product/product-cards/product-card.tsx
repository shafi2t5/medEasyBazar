import cn from 'classnames';
import Image from '@components/ui/image';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
// import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
// import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
// import PlusIcon from '@components/icons/plus-icon';
// import { useCart } from '@contexts/cart/cart.context';
// import { AddToCart } from '@components/product/add-to-cart';
import { useTranslation } from 'next-i18next';
import productPlaceholder from '@assets/placeholders/product-placeholder.png';
import dynamic from 'next/dynamic';
import { discountCalculate } from '@utils/discount';
import { useUI } from '@contexts/ui.context';
import { useModalAction } from '@components/common/modal/modal.context';
const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});
import PlusIcon from '@components/icons/plus-icon';

interface ProductProps {
  product: Product;
  className?: string;
}
function RenderPopupOrAddToCart({ data }: { data: Product }) {
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  // const { openModal } = useModalAction();
  // const { isInCart, isInStock } = useCart();
  // const iconSize = width! > 1024 ? '19' : '17';
  // const outOfStock = isInCart(id) && !isInStock(id);
  // function handlePopupView() {
  //   openModal('PRODUCT_VIEW', data);
  // }
  const iconSize = width! > 480 ? '19' : '17';

  if (!data?.is_available) {
    return (
      <span className="text-[11px] md:text-xs font-bold text-brand-danger uppercase inline-block rounded-lg px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        {t('text-out-stock')}
      </span>
    );
  }

  return (
    <button
      className="flex items-center justify-center w-8 h-8 text-4xl rounded-lg bg-brand-navColor lg:w-10 lg:h-10 text-brand-light focus:outline-none"
      aria-label="Count Button"
      // onClick={handleAddClick}
      // disabled={disabled}
    >
      <PlusIcon width={iconSize} height={iconSize} opacity="1" />
    </button>
  );

  return <AddToCart data={data} />;
}
const ProductCard: React.FC<ProductProps> = ({ product, className }) => {
  const router = useRouter();
  // const { openModal } = useModalAction();
  // const { t } = useTranslation('common');
  // const { price, basePrice, discount } = usePrice({
  //   amount: product?.sale_price ? product?.sale_price : product?.price,
  //   baseAmount: product?.price,
  //   currencyCode: 'USD',
  // });
  // const { price: minPrice } = usePrice({
  //   amount: product?.min_price ?? 0,
  //   currencyCode: 'USD',
  // });
  // const { price: maxPrice } = usePrice({
  //   amount: product?.max_price ?? 0,
  //   currencyCode: 'USD',
  // });

  const { openModal } = useModalAction();

  const { afterDiscount } = discountCalculate(
    product?.unit_prices[0]?.price,
    product?.discount_value
  );

  let productInfo = {
    ...product,
    price: product.is_discountable
      ? afterDiscount
      : product?.unit_prices[0]?.price,
  };

  const {
    id,
    medicine_image,
    generic_name,
    manufacturer_name,
    is_available,
    medicine_name,
    is_discountable,
    unit_prices,
    discount_value,
    strength,
    category_name,
    price,
  } = productInfo ?? {};

  const { setSelectedProduct } = useUI();

  function handlePopupView() {
    openModal('PRODUCT_VIEW', productInfo);
    setSelectedProduct(productInfo);
  }

  return (
    <article
      className={cn(
        'bg-brand-sidebarColor flex flex-col group rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full max-w-xs',
        className
      )}
      onClick={handlePopupView}
      title={medicine_name}
    >
      <div className="relative shrink-0">
        <div className="flex max-w-[260px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            src={
              `https://medeasy.health:5000${medicine_image}` ??
              productPlaceholder
            }
            alt={'Product Image'}
            width={260}
            height={200}
            quality={100}
            className="object-cover bg-fill-thumbnail"
          />
        </div>
        <div className="absolute top-3 -left-2">
          {is_discountable && (
            <span className="ribbon text-[11px] md:text-xs font-bold text-brand-light bg-brand-percent">
              {discount_value} % Off
            </span>
          )}
        </div>
      </div>

      <div className="px-3 md:px-4 lg:px-[18px] pt-2">
        <h2 className="text-brand-dark text-13px sm:text-18px lg:text-18px mb-1.5 font-bold">
          {medicine_name}
        </h2>
        <div className="leading-5 sm:leading-6 mb-2">
          <h3 className="text-brand-genericName text-13px sm:text-sm lg:text-15px mb-1">
            {generic_name}
          </h3>
          <h3 className="text-brand-manufacure text-13px sm:text-sm lg:text-15px">
            {manufacturer_name}
          </h3>
        </div>
      </div>
      <div className="flex flex-row justify-between relative mt-auto px-3 md:px-4 lg:px-[18px] pb-4">
        <div className="mb-1.5">
          <div className="block text-13px sm:text-20px lg:text-20px font-extrabold text-brand-dark">
            <span className="mr-1 font-extrabold">৳</span>
            {is_discountable
              ? price.toFixed(2)
              : (unit_prices[0]?.price).toFixed(2)}
          </div>
          {is_discountable ? (
            <del className="text-sm text-brand-dark ">
              <span className="mr-1">৳</span>
              {(unit_prices[0]?.price).toFixed(2)}
            </del>
          ) : (
            <div className="opacity-0" style={{ width: '0', height: '0' }}>
              Loading...
            </div>
          )}
        </div>
        <RenderPopupOrAddToCart data={productInfo} />
      </div>
    </article>
  );
};

export default ProductCard;
