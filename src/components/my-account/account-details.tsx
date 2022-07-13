import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
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

const defaultValues = {};

const AccountDetails: React.FC = () => {
  const { mutate: createUser, isLoading, data } = useUpdateUserMutation();
  const [gender, setGender] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    address: '',
    avatar: '',
    phone: '',
  });

  useEffect(() => {
    async function getUserProfile() {
      const user = await fetchProfile();
      setUser(user);
    }

    getUserProfile();
  }, [data]);

  console.log(data);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<UpdateUserType>({
    defaultValues: useMemo(() => {
      return user;
    }, [user]),
  });

  useEffect(() => {
    reset(user);
    setGender(user?.gender);
  }, [user]);

  function onSubmit(input: UpdateUserType) {
    createUser({ ...input, gender: gender, phone: `+88${input.phone}` });
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
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.name?.message}
              />
              <Input
                label={t('forms:label-email-star')}
                {...register('email', {
                  required: 'forms:label-email-star',
                })}
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

              <div className="w-full px-1.5 md:w-1/2 md:ml-3">
                <Dropdowns
                  name="Gender"
                  stateDropdown={gender}
                  setStateDropdown={setGender}
                  dList={[{ unit: 'Male' }, { unit: 'Female' }]}
                  className="font-bold"
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
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.phone?.message}
              />
            </div>
          </div>
        </div>
        {/* <Heading
          variant="titleLarge"
          className="pt-6 mb-5 xl:mb-8 md:pt-7 lg:pt-8"
        >
          {t('common:text-account-details-account')}
        </Heading> */}
        {/* <div className="border-b border-border-base pb-7 md:pb-9 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                type="email"
                label={t('forms:label-email-star')}
                {...register('email', {
                  required: 'forms:email-required',
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'forms:email-error',
                  },
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.email?.message}
              />
            </div>
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <PasswordInput
                type="tel"
                label={t('forms:label-password')}
                {...register('password', {
                  required: 'forms:password-required',
                })}
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.password?.message}
              />
              <PasswordInput
                label={t('forms:label-confirm-password')}
                {...register('confirmPassword', {
                  required: 'forms:password-required',
                })}
                error={errors.confirmPassword?.message}
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
              />
            </div>
          </div>
        </div>
        <div className="relative flex pt-6 md:pt-8 lg:pt-10">
          <div className="ltr:pr-2.5 rtl:pl-2.5">
            <Heading className="mb-1 font-medium">
              {t('common:text-share-profile-data')}
            </Heading>
            <Text variant="small">
              {t('common:text-share-profile-data-description')}
            </Text>
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <Controller
              name="shareProfileData"
              control={control}
              defaultValue={true}
              render={({ field: { value, onChange } }) => (
                <Switch onChange={onChange} checked={value} />
              )}
            />
          </div>
        </div>
        <div className="relative flex mt-5 mb-1 md:mt-6 lg:mt-7 sm:mb-4 lg:mb-6">
          <div className="ltr:pr-2.5 rtl:pl-2.5">
            <Heading className="mb-1 font-medium">
              {t('common:text-ads-performance')}
            </Heading>
            <Text variant="small">
              {t('common:text-ads-performance-description')}
            </Text>
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <Controller
              name="setAdsPerformance"
              control={control}
              defaultValue={true}
              render={({ field: { value, onChange } }) => (
                <Switch onChange={onChange} checked={value} />
              )}
            />
          </div>
        </div> */}
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
