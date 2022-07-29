import { useEffect, useState } from 'react';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import { useProductQuery } from '@framework/product/get-product';
import { useCart } from '@contexts/cart/cart.context';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import Dropdowns from '@components/common/dropdowns';
import productGalleryPlaceholder from '@assets/placeholders/product-placeholder.png';
import { useUI } from '@contexts/ui.context';
import { discountCalculate } from '@utils/discount';
import { useModalAction } from '@components/common/modal/modal.context';
import RelatedProductFeed from './feeds/related-product-feed';
import { useCartMutation } from '@framework/cart/cart-add';

const breakpoints = {
  '1536': {
    slidesPerView: 6,
  },
  '1280': {
    slidesPerView: 5,
  },
  '1024': {
    slidesPerView: 4,
  },
  '640': {
    slidesPerView: 3,
  },
  '360': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

const ProductSingleDetails: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { selectedProduct, setSearchInput } = useUI();
  const { data, isLoading, error } = useProductQuery(selectedProduct as any);
  const { getItemFromCart, setItemsForCart } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [piece, setPiece] = useState<number | null | string>(null);
  const [productPrice, setProductPrice] = useState<any>(null);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [addToBuyoader, setAddToBuyLoader] = useState<boolean>(false);
  const { closeModal, openModal } = useModalAction();
  const { mutate: addtoCartData } = useCartMutation();
  const { isAuthorized } = useUI();

  const medPrice =
    selectedProduct?.unit_prices?.filter(
      (data: any) => data.unit === piece
    )[0] || selectedProduct?.unit_prices?.[0];

  const cartitems = getItemFromCart(selectedProduct.id);

  useEffect(() => {
    if (cartitems) {
      setPiece(cartitems?.unit);
      setSelectedQuantity(cartitems?.quantity || 1);
    } else {
      setPiece(medPrice?.unit);
    }
  }, [cartitems?.quantity, selectedProduct?.id]);

  useEffect(() => {
    if (selectedProduct?.is_discountable) {
      const { afterDiscount } = discountCalculate(
        medPrice?.price,
        selectedProduct?.discount_value
      );

      setProductPrice({
        ...medPrice,
        discountValue: medPrice?.price - afterDiscount,
        totalPrice: afterDiscount * selectedQuantity,
        price: afterDiscount,
      });
    } else {
      setProductPrice({
        ...medPrice,
        discountValue: 0,
        totalPrice: medPrice?.price * selectedQuantity,
        price: medPrice?.price,
      });
    }
  }, [medPrice, selectedQuantity, selectedProduct?.id]);

  // if (isLoading) return <p>Loading...</p>;

  function addToCart() {
    if (isAuthorized) {
      setAddToCartLoader(true);
      setTimeout(() => {
        setAddToCartLoader(false);
      }, 1500);
      let data = {
        cart_medicines: [
          {
            id: selectedProduct?.id,
            name: selectedProduct?.medicine_name,
            quantity: selectedQuantity,
            unit: medPrice?.unit,
            unit_size: medPrice?.unit_size,
            isIncDrc: false,
          },
        ],
      };

      addtoCartData(data);
    } else {
      openModal('LOGIN_VIEW');
      if (router.pathname !== '/products/[slug]') {
        router.push('/?page=PRODUCT_VIEW', undefined, { shallow: true });
      }
    }
  }

  function addToBuyNow() {
    if (isAuthorized) {
      setAddToBuyLoader(true);
      setTimeout(() => {
        setAddToBuyLoader(false);
      }, 1500);

      let data = {
        ...selectedProduct,
        quantity: selectedQuantity,
        unit: medPrice?.unit,
        unit_size: medPrice?.unit_size,
      };
      let buyNow = {
        medicines: [data],
      };

      setItemsForCart(buyNow);
      closeModal();
      router.push('/checkout');
    } else {
      openModal('LOGIN_VIEW');
      if (router.pathname !== '/products/[slug]') {
        router.push('/?page=PRODUCT_VIEW', undefined, { shallow: true });
      }
    }
  }

  function navigateToProductPage() {
    closeModal();
    setSearchInput('');
    router.push(
      `${ROUTES.PRODUCT}/${selectedProduct?.medicine_name}?generic_name=${selectedProduct?.generic_name}&category_name=${selectedProduct?.category_name}&id=${selectedProduct?.id}&strength=${selectedProduct?.strength}`
    );
  }

  return (
    <div className="pt-6 pb-2 md:pt-7 relative ">
      <div className="grid-cols-10 lg:grid gap-7 2xl:gap-8 max-w-5xl mx-auto">
        <div className="col-span-5 mb-6 overflow-hidden xl:col-span-6 md:mb-8 lg:mb-0">
          {/* {!!data?.gallery?.length ? (
            <ThumbnailCarousel
              gallery={data?.gallery}
              thumbnailClassName="xl:w-[700px] 2xl:w-[900px]"
              galleryClassName="xl:w-[150px] 2xl:w-[170px]"
            />
          ) : ( */}
          <div className="flex items-center justify-center w-auto">
            <Image
              src={
                selectedProduct?.medicine_image
                  ? `${process?.env?.NEXT_PUBLIC_ASSETS_API_ENDPOINT}${selectedProduct?.medicine_image}`
                  : productGalleryPlaceholder
              }
              alt={data?.medicine_name!}
              width={650}
              height={390}
            />
          </div>
          {/* )} */}
        </div>

        <div className="flex flex-col col-span-5 shrink-0 xl:col-span-4 xl:ltr:pl-2 xl:rtl:pr-2">
          <div className="pb-3 lg:pb-5">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2
                onClick={navigateToProductPage}
                className="text-brand-dark text-13px sm:text-18px cursor-pointer lg:text-20px mb-1.5 font-bold"
              >
                {selectedProduct?.medicine_name}
              </h2>
              <div className="leading-5 sm:leading-6 mb-2">
                <h3 className="text-brand-genericName underline underline-offset-2 text-13px sm:text-sm lg:text-15px">
                  {selectedProduct?.generic_name}
                </h3>
                <h3 className="text-brand-manufacure text-13px sm:text-sm lg:text-15px mt-1">
                  {selectedProduct?.manufacturer_name}
                </h3>
              </div>
            </div>
          </div>
          <div>
            {selectedProduct?.is_discountable && (
              <>
                <div className="flex flex-warp">
                  <del className="mr-2 text-md text-brand-manufacure ">
                    MRP ৳ {medPrice?.price.toFixed(2) || ''}
                  </del>
                  <div className="text-brand-navColor text-sm">
                    {selectedProduct?.discount_value + '' || ''}% Off
                  </div>
                </div>
              </>
            )}
            <div className="flex flex-warp">
              <div className="mr-2 text-sm text-brand-dark font-bold">
                Best Price
                <span className="mr-2 text-lg font-bold">
                  Tk {productPrice?.totalPrice.toFixed(2) || ''}
                </span>
              </div>
              <div className="text-brand-manufacure text-sm mt-1">/{piece}</div>
            </div>
          </div>
          <div>
            <Dropdowns
              setStateDropdown={setPiece}
              stateDropdown={piece}
              dList={selectedProduct?.unit_prices}
            />
          </div>
          <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
            <div className="flex justify-between flex-warp gap-2 md:gap-4 2xl:gap-5">
              <div className="w-1/2">
                <Counter
                  variant="single"
                  value={selectedQuantity}
                  onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
                  onDecrement={() =>
                    setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                  }
                  disabled={!selectedProduct?.is_available}
                />
              </div>
              <div className="w-1/2">
                <Button
                  variant="border"
                  onClick={addToBuyNow}
                  disabled={!selectedProduct?.is_available}
                  loading={addToBuyoader}
                  className={`group w-full text-brand-ligh`}
                >
                  {t('Buy Now')}
                </Button>
              </div>
            </div>
            <Button
              onClick={addToCart}
              className="w-full px-1.5"
              disabled={!selectedProduct?.is_available}
              loading={addToCartLoader}
            >
              {t('text-add-to-cart')}
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-7">
        <RelatedProductFeed
          data={data?.related_medicines}
          carouselBreakpoint={breakpoints}
          className="mb-0.5 md:mb-2 lg:mb-3.5 xl:mb-4 2xl:mb-6"
        />
      </div>
    </div>
  );
};

export default ProductSingleDetails;
