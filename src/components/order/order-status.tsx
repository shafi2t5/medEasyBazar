import ProgressBox from './progress-box';

interface Props {
  status: number;
}

const OrderStatus = ({ status }: Props) => {
  const data = [
    {
      id: 1,
      name: 'Pending',
      serial: 1,
      color: '#02B290',
      created_at: 'Thu Jun 17 2021 22:12:50 GMT+0600',
      updated_at: 'Thu Jun 17 2021 22:12:35 GMT+0600',
    },
    {
      id: 2,
      name: 'Delivering',
      serial: 2,
      color: '#02B290',
      created_at: 'Thu Jun 17 2021 22:12:50 GMT+0600',
      updated_at: 'Thu Jun 17 2021 22:12:35 GMT+0600',
    },
    {
      id: 3,
      name: 'Delivered',
      serial: 3,
      color: '#FED030',
      created_at: 'Thu Jun 17 2021 22:12:50 GMT+0600',
      updated_at: 'Thu Jun 17 2021 22:12:35 GMT+0600',
    },
  ];
  return <ProgressBox data={data} status={status} />;
};

export default OrderStatus;
