import BundleCard from '@components/cards/bundle-card';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
interface Props {
  className?: string;
}

const BundleGrid: React.FC<Props> = ({ className = 'mb-12 pb-0.5' }) => {
  const data = [
    {
      id: 1,
      slug: 'Chat-with-us',
      image: '/assets/images/bundle/1.png',
      title: 'Chat with us',
      description: 'Chat now',
      bgColor: '#83ccdd',
      cb: () => {},
    },
    {
      id: 2,
      slug: 'your-pet-choice-for-fresh-healthy-food',
      image: '/assets/images/bundle/2.png',
      title: 'Upload prescriptions',
      description: 'Upload now',
      bgColor: '#39adaa',
      cb: () => console.log('hello pres'),
    },
    {
      id: 3,
      slug: 'washing-item-with-discount-product',
      image: '/assets/images/bundle/3.png',
      title: 'Doctor Cnsultation',
      description: 'Call Now',
      bgColor: '#3c6382',
      cb: () => {},
    },
  ];

  return (
    <div className={cn('', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.map((item: any) => (
          <BundleCard
            key={`bundle-key-${item.id}`}
            bundle={item}
            href={`${ROUTES.BUNDLE}/${item.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BundleGrid;
