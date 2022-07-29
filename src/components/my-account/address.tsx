import Layout from '@components/layout/layout';
import AddressGrid from '@components/address/address-grid';

export default function AccountDetailsPage() {
  return (
    <div className="pt-4">
      <AddressGrid />
    </div>
  );
}

AccountDetailsPage.Layout = Layout;
