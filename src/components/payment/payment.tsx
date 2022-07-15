import { useModalState } from '@components/common/modal/modal.context';

const PaymentPage: React.FC = () => {
  const { data } = useModalState();
  return (
    <div className="w-full mx-auto p-5 sm:p-8 bg-white rounded-xl">
      <iframe
        src={data?.url}
        name="iframe_a"
        height="650"
        width="650"
        title="Iframe Example"
      ></iframe>
    </div>
  );
};

export default PaymentPage;
