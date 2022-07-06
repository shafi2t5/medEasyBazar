import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useModalState } from '@components/common/modal/modal.context';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import Heading from '@components/ui/heading';
import { useTranslation } from 'next-i18next';
import {
  AddApiAddress,
  updateApiAddress,
} from '@framework/address/address-add';

interface ContactFormValues {
  address_name: string;
  phone: string;
  address?: string;
}

const AddAddressForm: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useModalState();

  const { closeModal } = useModalAction();

  function onSubmit(values: ContactFormValues, e: any) {
    if (data) {
      updateApiAddress(data.id, values, closeModal);
    } else {
      AddApiAddress(values, closeModal);
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      address: data || data?.address ? data?.address : '',
      address_name: data || data?.address_name ? data?.address_name : '',
      phone: data || data?.phone ? data?.phone : '',
    },
  });

  return (
    <div className="w-full md:w-[600px] lg:w-[900px] xl:w-[1000px] mx-auto p-5 sm:p-8 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <Heading variant="title" className="mb-8 -mt-1.5">
        {t('common:text-add-delivery-address')}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6">
          <Input
            variant="solid"
            label="Address Title"
            {...register('address_name', { required: 'Title Required' })}
            error={errors.address_name?.message}
          />
        </div>
        <div className="mb-6">
          <TextArea
            label="Address"
            {...register('address', {
              required: 'forms:address-required',
            })}
            error={errors.address?.message}
            className="text-brand-dark"
            variant="solid"
          />
        </div>
        <div className="mb-6">
          <Input
            variant="solid"
            label="Phone Number"
            {...register('phone', { required: 'Phone Number Required' })}
            error={errors.phone?.message}
          />
        </div>
        <div className="flex justify-end w-full">
          <Button className="h-11 md:h-12 mt-1.5" type="submit">
            {t('common:text-save-address')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
