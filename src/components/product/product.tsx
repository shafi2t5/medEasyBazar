import { useEffect, useState } from 'react';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import useWindowSize from '@utils/use-window-size';
import { useProductQuery } from '@framework/product/get-product';
import { getVariations } from '@framework/utils/get-variations';
import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import { toast } from 'react-toastify';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import Dropdowns from '@components/common/dropdowns';
import CloseIcon from '@components/icons/close-icon';
import productGalleryPlaceholder from '@assets/placeholders/product-placeholder.png';
import { useUI } from '@contexts/ui.context';
import { discountCalculate } from '@utils/discount';

const ProductSingleDetails: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { query } = router;
  const { width } = useWindowSize();
  const { data, isLoading, error } = useProductQuery(query as any);
  const { addItemToCart, getItemFromCart } = useCart();
  const { selectedProduct } = useUI();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [piece, setPiece] = useState<number | null | string>(null);
  const [productPrice, setProductPrice] = useState<any>(null);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);

  const medPrice =
    selectedProduct?.unit_prices?.filter(
      (data: any) => data.unit === piece
    )[0] || selectedProduct?.unit_prices[0];
  // const medicineDetails = data?.medicine_details;
  const cartitems = getItemFromCart(selectedProduct.id);

  // console.log(medPrice, 'cartitems');
  useEffect(() => {
    if (cartitems) {
      setSelectedQuantity(cartitems?.quantity || 1);
    }

    setPiece(medPrice?.unit);
  }, [cartitems?.quantity]);

  useEffect(() => {
    if (selectedProduct?.is_discountable) {
      const { afterDiscount } = discountCalculate(
        medPrice?.price,
        selectedProduct?.discount_value
      );
      setProductPrice({ ...medPrice, price: afterDiscount * selectedQuantity });
    } else {
      setProductPrice({
        ...medPrice,
        price: medPrice?.price * selectedQuantity,
      });
    }
  }, [medPrice, selectedQuantity]);

  let cartData = { ...selectedProduct, productPrice };

  // console.log(cartData, 'cartitems');

  if (isLoading) return <p>Loading...</p>;

  function addToCart() {
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    addItemToCart(cartData, selectedQuantity);
    toast('Added to the bag', {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  return (
    <div className="pt-6 pb-2 md:pt-7 relative ">
      <div className="grid-cols-10 lg:grid gap-7 2xl:gap-8 ">
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
                `https://medeasy.health:5000${selectedProduct?.medicine_image}` ??
                productGalleryPlaceholder
              }
              alt={data?.medicine_name!}
              width={900}
              height={680}
            />
          </div>
          {/* )} */}
        </div>

        <div className="flex flex-col col-span-5 shrink-0 xl:col-span-4 xl:ltr:pl-2 xl:rtl:pr-2">
          <div className="pb-3 lg:pb-5">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2 className="text-brand-dark text-13px sm:text-18px lg:text-20px mb-1.5 font-bold">
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
                    MRP ৳ {productPrice?.price}
                  </del>
                  <div className="text-brand-navColor text-sm">
                    {selectedProduct?.discount_value}% Off
                  </div>
                </div>
              </>
            )}
            <div className="flex flex-warp">
              <div className="mr-2 text-sm text-brand-dark font-bold">
                Best Price
                <span className="mr-2 text-lg font-bold">
                  Tk {productPrice?.price}
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
                  // onClick={addToWishlist}
                  loading={addToWishlistLoader}
                  className={`group w-full text-brand-ligh`}
                >
                  {t('Buy Now')}
                </Button>
              </div>
            </div>
            <Button
              onClick={addToCart}
              className="w-full px-1.5"
              disabled={!selectedProduct?.is_available || cartitems}
              loading={addToCartLoader}
            >
              {t('text-add-to-cart')}
            </Button>
          </div>
        </div>
      </div>
      {/* <div className="absolute mt-6 top-0 right-0 bg-brand-danger1 p-2 rounded-md">
        <CloseIcon color="#dc2626" />
      </div> */}
    </div>
  );
};

export default ProductSingleDetails;
