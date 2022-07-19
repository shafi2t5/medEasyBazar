import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm } from 'react-hook-form';
import {
  useUpdateUserMutation,
  UpdateUserType,
  fetchProfile,
} from '@framework/customer/use-update-customer';
import { useTranslation } from 'next-i18next';
import Dropdowns from '@components/common/dropdowns';
import { useEffect, useMemo, useState } from 'react';
import { useUI } from '@contexts/ui.context';

const AccountDetails: React.FC = () => {
  const { mutate: createUser, isLoading, data } = useUpdateUserMutation();
  const [gender, setGender] = useState('');
  const { profileInfo, setProfileInfo } = useUI();

  useEffect(() => {
    getUserProfile();
  }, [data]);

  async function getUserProfile() {
    const user = await fetchProfile();
    setProfileInfo(user);
  }

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<UpdateUserType>({
    defaultValues: useMemo(() => {
      return profileInfo;
    }, [profileInfo]),
  });

  useEffect(() => {
    reset(profileInfo);
    setGender(profileInfo?.gender);
  }, [profileInfo]);

  function onSubmit(input: UpdateUserType) {
    createUser({ ...input, gender: gender, phone: input.phone });
  }
  return (
    <div className="flex flex-col w-full">
      <Heading variant="titleLarge" className="mb-5 md:mb-6 lg:mb-7 lg:-mt-1">
        {t('common:text-account-details-personal')}
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full mx-auto"
        noValidate
      >
        <div className="border-b border-border-base pb-7 md:pb-8 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                label={
                  // t('forms:label-first-name')
                  'Name'
                }
                {...register('name', {
                  required: 'forms:first-name-required',
                })}
                placeholder="Enter Name"
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.name?.message}
              />
              <Input
                label={t('forms:label-email-star')}
                {...register('email', {
                  required: 'forms:label-email-star',
                })}
                placeholder="Enter Email"
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.email?.message}
              />
            </div>
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                type="number"
                label={
                  // t('forms:contact-age')
                  'Age'
                }
                {...register('age', {
                  required: 'forms:contact-age-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.age?.message}
              />

              <div className="w-full md:w-1/2 px-1.5 md:px-2.5">
                <div className="text-sm">Gender</div>
                <Dropdowns
                  name="Gender"
                  stateDropdown={gender}
                  setStateDropdown={setGender}
                  dList={[{ unit: 'Male' }, { unit: 'Female' }]}
                  className="font-normal py-2"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                type="text"
                label={t('forms:label-address')}
                {...register('address', {
                  required: 'forms:address-required',
                })}
                placeholder="Enter Address"
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.address?.message}
              />
              <Input
                type="file"
                label={
                  //  t('forms:label-phone')
                  'Avatar'
                }
                {...register('avatar', {
                  required: 'Avatar is required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.avatar?.message}
              />
            </div>
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                type="tel"
                label={t('forms:label-phone')}
                {...register('phone', {
                  required: 'forms:phone-required',
                  pattern: {
                    value: /^(?:\+?88|0088)?01[15-9]\d{8}$/,
                    message: 'Please enter a valid number',
                  },
                })}
                placeholder="Enter phone number(+88)"
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.phone?.message}
              />
            </div>
          </div>
        </div>
        <div className="relative flex pb-2 mt-5 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0">
          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            variant="formButton"
            className="w-full sm:w-auto"
          >
            {t('common:button-save-changes')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
