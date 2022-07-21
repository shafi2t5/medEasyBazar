import { Table } from '@components/ui/table';
import { useEffect, useState } from 'react';
import Pagination from '@components/ui/pagination';
import ActionsButton from '@components/ui/action-button';
import { TotalPrice } from '@components/order/price';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { useUI } from '@contexts/ui.context';

export const CreatedAt: React.FC<{ createdAt?: any }> = ({ createdAt }) => {
  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return (
    <span className="whitespace-nowrap">
      {dayjs.utc(createdAt).tz(dayjs.tz.guess()).fromNow()}
    </span>
  );
};

export const Status: React.FC<{ item?: any }> = ({ item }) => {
  return (
    <span className={item?.status}>
      <span
        className="bullet"
        style={{
          backgroundColor:
            item?.status === 'Delivered'
              ? '#02B290'
              : item?.status === 'Confirmed'
              ? '#FED030'
              : item?.status === 'Cancelled'
              ? 'red'
              : item?.status === 'Pending'
              ? '#25a8d6'
              : 'yellow',
        }}
      />
      {item?.status}
    </span>
  );
};

const columns = [
  {
    title: 'Order Number',
    dataIndex: 'id',
    key: 'id',
    className: 'id-cell',
  },
  {
    title: 'Order Date',
    dataIndex: 'created_at',
    key: 'created_at',
    render: function createdAt(items: any) {
      return <CreatedAt createdAt={items} />;
    },
  },
  {
    title: 'Status',
    key: 'status',
    render: function status(item: any) {
      return <Status item={item} />;
    },
  },
  {
    title: 'Total Price',
    key: 'total',
    render: function totalPrice(items: any) {
      return <TotalPrice items={items} />;
    },
  },
  {
    dataIndex: '',
    key: 'operations',
    render: function actionsButton(item: any) {
      return <ActionsButton item={item} />;
    },
    className: 'operations-cell',
  },
];

const OrderTable: React.FC<{ orders?: any }> = ({ orders }) => {
  const { isCancelOrder } = useUI();
  const [currentPage, setCurrentPage] = useState(1);
  const countPerPage = 5;
  let [filterData, setDataValue] = useState([]);

  const updatePage = (p: any) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setDataValue(orders.slice(from, to));
  };

  useEffect(() => {
    setCurrentPage(1);
    setDataValue(orders.slice(0, countPerPage));
  }, [orders, isCancelOrder]);

  return (
    <>
      <div className="items-center mb-5 md:flex md:justify-between sm:mb-10">
        <h2 className="mb-4 text-sm font-semibold md:text-xl text-brand-dark md:mb-0">
          My order list
        </h2>
      </div>
      <div className="order-list-table-wraper">
        <Table
          className="order-list-table"
          columns={columns}
          data={filterData}
          rowKey="id"
          tableLayout={'auto'}
        />
      </div>
      <div className="mt-5 ltr:text-right rtl:text-left">
        <Pagination
          current={currentPage}
          onChange={updatePage}
          pageSize={countPerPage}
          total={orders?.length}
          prevIcon={<GrPrevious size={12} style={{ color: '#090B17' }} />}
          nextIcon={<GrNext size={12} style={{ color: '#090B17' }} />}
          className="order-table-pagination"
        />
      </div>
    </>
  );
};

export default OrderTable;
