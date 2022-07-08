import { useState } from 'react';
import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import Logo from '@components/ui/logo';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import { useModalAction } from '@components/common/modal/modal.context';
import Switch from '@components/ui/switch';
import CloseButton from '@components/ui/close-button';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import cn from 'classnames';
import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  FacebookAuthProvider,
} from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useLoginMutation } from '@framework/auth/use-login';

interface LoginFormProps {
  isPopup?: boolean;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ isPopup = true, className }) => {
  const { t } = useTranslation();
  const { closeModal } = useModalAction();
  const { mutate: login, isLoading, data } = useLoginMutation();
  const [error, setError] = useState('');
  const [number, setNumber] = useState('');
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState('');
  const [result, setResult] = useState<any>('');

  const { openModal } = useModalAction();

  const getOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (number === '' || number === undefined)
      return setError('Please enter a valid phone number!');
    try {
      const response: any = await setUpRecaptha(`+880${number}}`);
      setResult(response);
      setFlag(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  console.log(data);

  const verifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (otp === '' || otp === null)
      return setError('Please enter a valid Otp!');
    try {
      const token = await result?.confirm(otp);
      login({ token: token?.user?.accessToken });
      console.log(data, 'tokenData');
      if (data?.isRegi) {
        closeModal();
        openModal('SIGN_UP_VIEW', token);
      } else {
        closeModal();
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  function setUpRecaptha(number: any) {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  const handleGoogleSignIn = async () => {
    try {
      const user: any = await googleSignIn();
      login({ token: user?.user?.accessToken });
      console.log(user?.user?.accessToken, 'fhh');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  const handleFacebookSignIn = async () => {
    try {
      const user: any = await facebookSignIn();
      login({ token: user?.user?.accessToken });
      console.log(user, 'fhh');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  function facebookSignIn() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  }

  return (
    <div
      className={cn(
        'w-full md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}

      <div className="flex mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="md:w-1/2 lg:w-[55%] xl:w-[60%] registration hidden md:block relative">
          <Image
            src="/assets/images/login.png"
            alt="signin Image"
            layout="fill"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md flex flex-col justify-center">
          <div className="mb-6 text-center">
            <div onClick={closeModal}>
              <Logo />
            </div>
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              {t('common:text-welcome-back')}
            </h4>
          </div>
          <form
            onSubmit={getOtp}
            className="flex flex-col justify-center"
            style={{ display: !flag ? 'block' : 'none' }}
          >
            <div className="flex flex-col space-y-3.5">
              <Input
                label={t('forms:label-contact-phone')}
                type="text"
                variant="solid"
                name="phone"
                onChange={(e) => setNumber(e.target.value)}
                placeholder={t('forms:label-contact-phone')}
                error={error}
              />
              <div id="recaptcha-container"></div>
              <div className="relative">
                <Button
                  type="submit"
                  // loading={isLoading}
                  // disabled={isLoading}
                  className="w-full mt-1 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  {
                    // t('common:text-sign-in')
                    'Contunue'
                  }
                </Button>
              </div>
            </div>
          </form>
          <form
            onSubmit={verifyOtp}
            className="flex flex-col justify-center"
            style={{ display: flag ? 'block' : 'none' }}
          >
            <div className="flex flex-col space-y-3.5">
              <Input
                label={'Enter Otp'}
                type="text"
                name="otp"
                variant="solid"
                onChange={(e) => setOtp(e.target.value)}
                placeholder={
                  // t('forms:label-contact-phone')
                  'Enter Otp'
                }
                error={error}
              />
              <div className="relative">
                <Button
                  type="submit"
                  // loading={isLoading}
                  // disabled={isLoading}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  Verify Otp
                </Button>
              </div>
            </div>
          </form>
          <div className="relative flex flex-col items-center justify-center text-sm">
            <span className="mt-6 text-sm text-brand-dark opacity-70">
              {t('common:text-or')}
            </span>
          </div>

          <div className="flex justify-center mt-5 space-x-2.5">
            <button
              className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one hover:border-brand focus:border-brand focus:outline-none"
              onClick={handleFacebookSignIn}
            >
              <FaFacebook className="w-4 h-4 text-opacity-50 transition-all text-brand-dark group-hover:text-brand " />
            </button>
            <button
              className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one hover:border-brand focus:border-brand focus:outline-none"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle className="w-4 h-4 text-opacity-50 transition-all text-brand-dark group-hover:text-brand" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
