import { useState } from 'react';
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
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import isEqual from 'lodash/isEqual';
import Dropdowns from '@components/common/dropdowns';
import CloseIcon from '@components/icons/close-icon';
import productGalleryPlaceholder from '@assets/placeholders/product-placeholder.png';

const ProductSingleDetails: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { query } = router;
  const { width } = useWindowSize();
  const { data, isLoading, error } = useProductQuery(query as any);
  console.log(data, 'akjgjgol');
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [favorite, setFavorite] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const [piece, setPiece] = useState<number | null>(null);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.PRODUCT}/${router.query.slug}`;
  // const { price, basePrice, discount } = usePrice(
  //   data && {
  //     amount: data.sale_price ? data.sale_price : data.price,
  //     baseAmount: data.price,
  //     currencyCode: 'USD',
  //   }
  // );
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };
  if (isLoading) return <p>Loading...</p>;
  const variations = getVariations(data?.variations);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;
  let selectedVariation: any = {};
  if (isSelected) {
    const dataVaiOption: any = data?.variation_options;
    selectedVariation = dataVaiOption?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }
  // const item = generateCartItem(data!, selectedVariation);
  // const outOfStock = isInCart(data.id) && !isInStock(data.id);
  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    // const item = generateCartItem(data!, selectedVariation);
    addItemToCart(data, quantity);
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
  function addToWishlist() {
    // to show btn feedback while product wishlist
    setAddToWishlistLoader(true);
    setFavorite(!favorite);
    const toastStatus: string =
      favorite === true ? t('text-remove-favorite') : t('text-added-favorite');
    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);
    toast(toastStatus, {
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
    <div className="pt-6 pb-2 md:pt-7 relative md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl">
      <div className="grid-cols-10 lg:grid gap-7 2xl:gap-8 max-w-3xl lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl">
        <div className="col-span-5 mb-6 overflow-hidden xl:col-span-6 md:mb-8 lg:mb-0">
          {!!data?.gallery?.length ? (
            <ThumbnailCarousel
              gallery={data?.gallery}
              thumbnailClassName="xl:w-[700px] 2xl:w-[900px]"
              galleryClassName="xl:w-[150px] 2xl:w-[170px]"
            />
          ) : (
            <div className="flex items-center justify-center w-auto">
              <Image
                src={data?.image?.original ?? productGalleryPlaceholder}
                alt={data?.name!}
                width={900}
                height={680}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col col-span-5 shrink-0 xl:col-span-4 xl:ltr:pl-2 xl:rtl:pr-2">
          <div className="pb-3 lg:pb-5">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2 className="text-brand-dark text-13px sm:text-18px lg:text-20px mb-1.5 font-bold">
                {data?.title || 'Product Name'}
              </h2>
              <div className="leading-5 sm:leading-6 mb-2">
                <h3 className="text-brand-genericName underline underline-offset-2 text-13px sm:text-sm lg:text-15px">
                  {'generic_name'}
                </h3>
                <h3 className="text-brand-manufacure text-13px sm:text-sm lg:text-15px mt-1">
                  {'manufacturer_name'}
                </h3>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-warp">
              <del className="mr-2 text-md text-brand-manufacure ">
                MRP ৳ 6.20
              </del>
              <div className="text-brand-navColor text-sm">20% Off</div>
            </div>
            <div className="flex flex-warp">
              <div className="mr-2 text-sm text-brand-dark font-bold">
                Best Price <span className="mr-2 text-lg font-bold">Tk 4</span>
              </div>
              <div className="text-brand-manufacure text-sm mt-1">
                /01 Tablet
              </div>
            </div>
          </div>
          <div>
            <Dropdowns setStateDropdown={setPiece} stateDropdown={piece} />
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
                  disabled={
                    isInCart(data?.id)
                      ? getItemFromCart(data?.id).quantity + selectedQuantity >=
                        Number(data?.stock)
                      : selectedQuantity >= Number(data?.stock)
                  }
                />
              </div>
              <div className="w-1/2">
                <Button
                  variant="border"
                  // onClick={addToWishlist}
                  loading={addToWishlistLoader}
                  className={`group w-full text-brand-ligh ${
                    favorite === true && 'text-brand'
                  }`}
                >
                  {t('Buy Now')}
                </Button>
              </div>
            </div>
            <Button
              onClick={addToCart}
              className="w-full px-1.5"
              disabled={!isSelected}
              loading={addToCartLoader}
            >
              {t('text-add-to-cart')}
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute mt-6 top-0 right-0 bg-brand-danger1 p-2 rounded-md">
        <CloseIcon color="#dc2626" />
      </div>
    </div>
  );
};

export default ProductSingleDetails;
