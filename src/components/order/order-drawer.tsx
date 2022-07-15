import { OrderDetailsContent } from './order-details-content';
// import { formatAddress } from '@utils/format-address';
import Heading from '@components/ui/heading';
import { IoClose } from 'react-icons/io5';
// import OrderStatus from './order-status';
import { useTranslation } from 'next-i18next';
import {
  DiscountPrice,
  DeliveryFee,
  TotalPrice,
  SubTotalPrice,
} from '@components/order/price';
// import { useRouter } from 'next/router';
import { useUI } from '@contexts/ui.context';
import { useDeleteOrderMutation } from '@framework/order/order-delete';
import OrderStatus from './order-status';
import axios from 'axios';
import { calculateTotal } from '@contexts/cart/cart.utils';
import { useModalAction } from '@components/common/modal/modal.context';
import { getToken } from '@framework/utils/get-token';
// import { useEffect } from 'react';

const OrderDrawer: React.FC = () => {
  const { t } = useTranslation('common');
  const { data, closeDrawer } = useUI();
  const { closeModal, openModal } = useModalAction();

  const { mutate: deleteOrder, data: order } = useDeleteOrderMutation();

  const removeItem = async (id: any, title: string) => {
    var result = confirm(`Want to delete? ${title} Order`);
    if (result) {
      await deleteOrder(id);
    }
  };

  console.log(data, 'data');
  const price = calculateTotal(data?.medicines) + data?.delivery_fee;
  const transId = `medEasy-${data?.id}`;
  const token = getToken();

  async function onlinePaymentOption() {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/payment`,
      {
        ...data,
        price,
        transId: transId,
        token: token,
      }
    );
    // closeDrawer();
    // openModal('PAYMENT', { url: res?.data.GatewayPageURL, transId: transId });
    window.location.replace(res?.data.GatewayPageURL);
  }

  return (
    <>
      {data !== '' && (
        <>
          <div className="block">
            <div className="relative flex items-center justify-between w-full border-b ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 border-border-base">
              <Heading variant="titleMedium">
                {t('text-order-details')}:
              </Heading>
              <button
                className="flex items-center justify-center px-4 py-6 text-2xl transition-opacity md:px-6 lg:py-7 focus:outline-none text-brand-dark hover:opacity-60"
                onClick={closeDrawer}
                aria-label="close"
              >
                <IoClose />
              </button>
            </div>
            <div className="p-5 md:p-8">
              <div className="text-[14px] opacity-70 mb-3 text-brand-dark">
                {t('text-delivery-address')}
              </div>
              <div className="rounded border border-solid min-h-[90px] bg-fill-base p-4 border-border-two text-[12px] md:text-[14px]">
                <p className="text-brand-dark opacity-70">
                  {data?.address?.address}
                </p>
              </div>
              {data?.status === 'Cancelled' ? (
                <div className="my-3">
                  <div className="text-brand-dark">Order Status :</div>
                  <div className="mt-1 text-brand-danger">{data?.status}</div>
                </div>
              ) : (
                <OrderStatus
                  status={
                    data?.status === 'Pending'
                      ? 1
                      : data?.status === 'Delivering'
                      ? 2
                      : 3
                  }
                />
              )}
              <div className="grid grid-cols-12 bg-fill-base py-3 rounded-[3px] text-brand-dark/70 text-[12px] md:text-[14px]">
                <div className="col-span-2"></div>
                <div className="col-span-5">Items Name</div>
                <div className="col-span-3 text-center md:ltr:text-left md:rtl:text-right">
                  Quantity
                </div>
                <div className="col-span-2">Price</div>
              </div>
              {data?.medicines?.map((item: any, index: string) => (
                <OrderDetailsContent key={index} item={item} />
              ))}
              <div className="mt-3 ltr:text-right rtl:text-left">
                <div className="text-black inline-flex flex-col text-[12px] md:text-[14px]">
                  <div className="pb-1 mb-2 border-b border-border-base ltr:pl-20 rtl:pr-20">
                    <p className="flex justify-between mb-1">
                      <span className="ltr:mr-8 rtl:ml-8">Sub total: </span>
                      <span className="font-medium">
                        <SubTotalPrice items={data?.medicines} />
                      </span>
                    </p>
                    {typeof data?.discount === 'number' && (
                      <p className="flex justify-between mb-2">
                        <span className="ltr:mr-8 rtl:ml-8">Discount: </span>
                        <span className="font-medium">
                          <DiscountPrice discount={data?.discount} />
                        </span>
                      </p>
                    )}
                    <p className="flex justify-between mb-2">
                      <span className="ltr:mr-8 rtl:ml-8">Delivery Fee:</span>
                      <span className="font-medium">
                        <DeliveryFee delivery={data?.delivery_fee} />
                      </span>
                    </p>
                  </div>
                  <p className="flex justify-between mb-2 ltr:pl-20 rtl:pr-20">
                    <span className="ltr:mr-8 rtl:ml-8">Total Cost:</span>
                    <span className="font-medium">
                      <TotalPrice items={data} />
                    </span>
                  </p>
                </div>
              </div>
              {data?.status !== 'Cancelled' && (
                <div className="mt-12 ltr:text-right rtl:text-left">
                  {/* {data?.status === 'Delivering' && ( */}
                  <span
                    onClick={onlinePaymentOption}
                    className="py-3 px-5 cursor-pointer inline-block text-[12px] md:text-[14px] text-black font-medium bg-white rounded border border-solid border-[#DEE5EA] ltr:mr-4 rtl:ml-4 hover:bg-[#F35C5C] hover:text-white hover:border-[#F35C5C] transition-all capitalize"
                  >
                    Online Payment
                  </span>
                  {/* )} */}
                  <span
                    onClick={() => removeItem(data?.id, data?.id)}
                    className="py-3 px-5 cursor-pointer inline-block text-[12px] md:text-[14px] text-white font-medium bg-[#F35C5C] rounded border border-solid border-[#F35C5C]  hover:bg-white hover:text-black hover:border-[#DEE5EA] transition-all capitalize"
                  >
                    Cancel order
                  </span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDrawer;
