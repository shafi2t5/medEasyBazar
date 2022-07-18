import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import Logo from '@components/ui/logo';
import { useTranslation } from 'next-i18next';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import cn from 'classnames';
import {
  useOderWithImageMutation,
  orderType,
} from '@framework/order/order-with-imagee';
import Address from '@components/checkout/address';
import { useUI } from '@contexts/ui.context';

interface OrderWithImageProps {
  isPopup?: boolean;
  className?: string;
}

const OrderWithImage: React.FC<OrderWithImageProps> = ({
  isPopup = true,
  className,
}) => {
  const { t } = useTranslation();
  const { mutate: orderWithImage, isLoading } = useOderWithImageMutation();
  const { closeModal } = useModalAction();
  const { selectedAddress } = useUI();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<orderType>({
    defaultValues: {
      file: '',
    },
  });

  async function onSubmit(values: orderType) {
    orderWithImage({
      ...values,
      selectedAddress,
      deliveryFee: 30,
      coupon_id: 1,
    });
  }

  return (
    <div
      className={cn(
        'flex bg-brand-light mx-auto rounded-lg md:w-[720px]',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
      <div className="flex w-full mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="w-full py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 pt-2.5">
            <div onClick={closeModal}>
              <Logo />
            </div>
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              Order With Prescriptions
            </h4>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              <Input
                label={'Prescription Image'}
                type="file"
                variant="solid"
                {...register('file', {
                  required: 'Prescription image is required',
                })}
                error={errors.file?.message}
              />

              <Address />

              <div className="relative">
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  {t('button-order-now')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderWithImage;
