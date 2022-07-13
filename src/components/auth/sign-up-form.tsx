import { useState } from 'react';
import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import Logo from '@components/ui/logo';
import { SignUpInputType, useSignUpMutation } from '@framework/auth/use-signup';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import cn from 'classnames';
import Dropdowns from '@components/common/dropdowns';

interface SignUpFormProps {
  isPopup?: boolean;
  className?: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  isPopup = true,
  className,
}) => {
  const { t } = useTranslation();
  const { mutate: signUp, isLoading } = useSignUpMutation();
  const { closeModal, openModal } = useModalAction();
  const { data } = useModalState();
  const [gender, setGender] = useState('');
  const [genderError, setGenderError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputType>();

  async function onSubmit(values: SignUpInputType) {
    if (gender === '') {
      setGenderError('Gender is required');
      return;
    }
    signUp({
      ...values,
      gender,
      token: data?.token,
      phone: data?.phoneNumber,
    });
  }
  return (
    <div
      className={cn(
        'flex bg-brand-light mx-auto rounded-lg md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px]',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
      <div className="flex w-full mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="md:w-1/2 lg:w-[55%] xl:w-[60%] registration hidden md:block relative">
          <Image
            src="/assets/images/registration.png"
            alt="sign up"
            layout="fill"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 pt-2.5">
            <div onClick={closeModal}>
              <Logo />
            </div>
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              {t('common:text-sign-up-for-free')}
            </h4>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              <Input
                label={t('forms:label-name')}
                type="text"
                variant="solid"
                {...register('name', {
                  required: 'forms:name-required',
                })}
                error={errors.name?.message}
              />
              <div className="w-full">
                <Dropdowns
                  name="Gender"
                  stateDropdown={gender}
                  setStateDropdown={setGender}
                  dList={[{ unit: 'Male' }, { unit: 'Female' }]}
                  className=""
                />
                {genderError && (
                  <div className="text-brand-danger mt-1">
                    <span className="">{genderError}</span>
                  </div>
                )}
              </div>
              <Input
                label={
                  //t('forms:label-name')
                  'Age'
                }
                type="number"
                variant="solid"
                {...register('age', {
                  required: 'Age is required',
                })}
                error={errors.name?.message}
              />
              <Input
                label={
                  // t('forms:label-name')
                  'Address'
                }
                type="text"
                variant="solid"
                {...register('address', {
                  required: 'Address is required',
                })}
                error={errors.name?.message}
              />

              <div className="relative">
                <Button
                  type="submit"
                  // loading={isLoading}
                  // disabled={isLoading}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  {t('common:text-register')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
