import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import ProductSingleDetails from './product';

export default function ProductPopup() {
  const { closeModal } = useModalAction();
  return (
    <>
      <div className="md:w-[600px] lg:w-[940px] xl:w-[1180px] 2xl:w-[1360px] mx-auto p-1 lg:p-0 xl:p-3 bg-brand-light rounded-md">
        <CloseButton onClick={closeModal} />
        <div className="overflow-hidden">
          <div className="px-4">
            <ProductSingleDetails />
          </div>
        </div>
      </div>
    </>
  );
}
