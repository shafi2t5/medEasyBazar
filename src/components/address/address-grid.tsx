import { useEffect, useState } from 'react';
import { TiDelete, TiPencil } from 'react-icons/ti';
import { AiOutlinePlus } from 'react-icons/ai';
import { RadioGroup } from '@headlessui/react';
import { useModalAction } from '@components/common/modal/modal.context';
// import { formatAddress } from '@utils/format-address';
// import Button from '@components/ui/button';
import { useTranslation } from 'next-i18next';
import { useAddressQuery } from '@framework/address/address';
import { useUI } from '@contexts/ui.context';
import { useAddressDeleteMutation } from '@framework/address/address-add';

const AddressGrid: React.FC = () => {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  let { data, isLoading } = useAddressQuery();

  function handlePopupView(item: any) {
    openModal('ADDRESS_VIEW_AND_EDIT', item);
  }

  const { setSlectedAddress } = useUI();

  const [selected, setSelected] = useState(data?.data?.address[0]);

  const { mutate: deleteAddress } = useAddressDeleteMutation();

  const removeItem = async (id: any, title: string) => {
    var result = confirm(`Want to delete? ${title} Address`);
    if (result) {
      deleteAddress(id);
    }
  };

  useEffect(() => {
    setSlectedAddress(selected);
  }, [selected]);

  return (
    <div className="flex flex-col justify-between h-full -mt-4 text-15px md:mt-0">
      <RadioGroup
        value={selected}
        onChange={setSelected}
        className="space-y-4 md:grid md:grid-cols-2 md:gap-5 auto-rows-auto md:space-y-0"
      >
        <RadioGroup.Label className="sr-only">{t('address')}</RadioGroup.Label>
        {data?.data?.address?.length > 0 ? (
          data?.data?.address?.map((item: any, index: any) => (
            <RadioGroup.Option
              key={index}
              value={item}
              className={({ checked }) =>
                `${checked ? 'border-brand' : 'border-border-base'}
                  border-2 relative focus:outline-none rounded-md p-5 block cursor-pointer min-h-[112px] h-full group address__box`
              }
            >
              <RadioGroup.Label
                as="h3"
                className="mb-2 -mt-1 font-semibold text-brand-dark "
              >
                {item?.address_name}
              </RadioGroup.Label>
              <RadioGroup.Description
                as="div"
                className="leading-6 text-brand-muted"
              >
                {item?.address}
                {/* {formatAddress(item?.address)} */}
              </RadioGroup.Description>
              <div className="absolute z-10 flex transition-all ltr:right-3 rtl:left-3 top-3 lg:opacity-0 address__actions">
                <button
                  onClick={() => handlePopupView(item)}
                  className="flex items-center justify-center w-6 h-6 text-base rounded-full bg-brand text-brand-light text-opacity-80"
                >
                  <span className="sr-only">{t(item?.address_name)}</span>
                  <TiPencil />
                </button>
                <button
                  onClick={() => removeItem(item?.id, item?.address)}
                  className="flex ml-1 items-center justify-center w-6 h-6 text-base rounded-full bg-brand-danger text-brand-light text-opacity-80"
                >
                  <span className="sr-only">{t(item?.address_name)}</span>
                  <TiDelete />
                </button>
              </div>
            </RadioGroup.Option>
          ))
        ) : (
          <div className="border-2 border-border-base rounded font-semibold p-5 px-10 text-brand-danger flex justify-start items-center min-h-[112px] h-full">
            {t('text-no-address-found')}
          </div>
        )}
        <button
          className="w-full border-2 transition-all border-border-base rounded font-semibold p-5 px-10 cursor-pointer text-brand flex justify-start hover:border-brand items-center min-h-[112px] h-full"
          onClick={handlePopupView}
        >
          <AiOutlinePlus size={18} className="ltr:mr-2 rtl:ml-2" />
          {t('text-add-address')}
        </button>
      </RadioGroup>

      {/* <div className="flex mt-5 sm:justify-end md:mt-10 lg:mt-20 save-change-button">
        <Button className="w-full sm:w-auto">{t('button-save-changes')}</Button>
      </div> */}
    </div>
  );
};

export default AddressGrid;
