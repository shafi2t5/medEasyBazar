import Container from '@components/ui/container';
import { useUI } from '@contexts/ui.context';
import { fetchDoctorList } from '@framework/doctor/use-doctor';
import React, { useState, useEffect } from 'react';
import { DoctorGrid } from './doctor-grid';

const DoctorList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { doctorList, doctor_input, setDoctorList } = useUI();

  useEffect(() => {
    fetchMoreListItems();
  }, [doctor_input]);

  async function fetchMoreListItems() {
    const data = await fetchDoctorList({
      text: doctor_input,
      setIsLoading,
    });

    setDoctorList(data?.doctors);
  }

  return (
    <Container>
      <div
        id="productGrid"
        className="w-full lg:pt-4 lg:ltr:-ml-4 lg:rtl:-mr-2 xl:ltr:-ml-8 xl:rtl:-mr-8 lg:-mt-1"
      >
        <DoctorGrid isLoading={false} error={false} data={doctorList || []} />
      </div>
    </Container>
  );
};

export default DoctorList;
