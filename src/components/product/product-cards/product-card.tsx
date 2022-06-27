import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import PlusIcon from '@components/icons/plus-icon';
import { useCart } from '@contexts/cart/cart.context';
// import { AddToCart } from '@components/product/add-to-cart';
import { useTranslation } from 'next-i18next';
import { productPlaceholder } from '@assets/placeholders';
import dynamic from 'next/dynamic';
const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});

interface ProductProps {
  product: Product;
  className?: string;
}
function RenderPopupOrAddToCart({ data }: { data: Product }) {
  const { t } = useTranslation('common');
  const { id, quantity, product_type } = data ?? {};
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const iconSize = width! > 1024 ? '19' : '17';
  const outOfStock = isInCart(id) && !isInStock(id);
  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }
  if (Number(quantity) < 1 || outOfStock) {
    return (
      <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand-danger rounded-lg px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        {t('text-out-stock')}
      </span>
    );
  }
  if (product_type === 'variable') {
    return (
      <button
        className="inline-flex items-center justify-center w-8 h-8 text-4xl rounded-lg bg-brand-navColor lg:w-10 lg:h-10 text-brand-light focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handlePopupView}
      >
        <PlusIcon width={iconSize} height={iconSize} opacity="1" />
      </button>
    );
  }
  return <AddToCart data={data} />;
}
const ProductCard: React.FC<ProductProps> = ({ product, className }) => {
  const { name, image, unit, product_type } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');
  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.price,
    baseAmount: product?.price,
    currencyCode: 'USD',
  });
  const { price: minPrice } = usePrice({
    amount: product?.min_price ?? 0,
    currencyCode: 'USD',
  });
  const { price: maxPrice } = usePrice({
    amount: product?.max_price ?? 0,
    currencyCode: 'USD',
  });

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }
  return (
    <article
      className={cn(
        'bg-brand-sidebarColor flex flex-col group rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full',
        className
      )}
      onClick={handlePopupView}
      title={name}
    >
      <div className="relative shrink-0">
        <div className="flex max-w-[260px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            src={image?.thumbnail ?? productPlaceholder}
            alt={name || 'Product Image'}
            width={260}
            height={200}
            quality={100}
            className="object-cover bg-fill-thumbnail"
          />
        </div>
        <div className="w-full h-full pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          {discount && (
            <span className="absolute top-2 -left-2 text-[11px] md:text-xs font-bold text-brand-light inline-block bg-brand-percent rounded-md px-2.5 pt-1 pb-[3px]">
              {'10% Off'}
            </span>
          )}
        </div>
      </div>

      <div className="px-3 md:px-4 lg:px-[18px] pb-4 lg:pt-2 h-full">
        <h2 className="text-brand-dark text-13px sm:text-18px lg:text-18px mb-1.5 font-bold">
          {name}
        </h2>
        <div className="leading-5 sm:leading-6 mb-2">
          <h3 className="text-brand-genericName text-13px sm:text-sm lg:text-15px">
            {'generic_name'}
          </h3>
          <h3 className="text-brand-dark text-13px sm:text-sm lg:text-15px">
            {'manufacturer_name'}
          </h3>
        </div>
        <div className="flex justify-between relative">
          <div className="mb-1.5">
            <div className="block text-13px sm:text-20px lg:text-20px font-bold text-brand-dark">
              {'$100'}
            </div>
            {basePrice && (
              <del className="text-sm text-brand-dark text-opacity-70">
                {basePrice}
              </del>
            )}
          </div>
          <RenderPopupOrAddToCart data={product} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
