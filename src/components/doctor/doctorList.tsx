import Container from '@components/ui/container';
import { useUI } from '@contexts/ui.context';
import { fetchDoctorList } from '@framework/doctor/use-doctor';
import React, { useState, useEffect } from 'react';
import { DoctorGrid } from './doctor-grid';

const DoctorList = ({ dept }: { dept: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { doctorList, doctor_input, setDoctorList } = useUI();

  useEffect(() => {
    fetchMoreListItems();
  }, []);

  async function fetchMoreListItems() {
    const data = await fetchDoctorList({
      text: dept,
      setIsLoading,
    });

    setDoctorList(data?.doctors);
  }

  return (
    <Container>
      <div className="mb-2 md:mb-5 text-xl font-bold lg:ltr:-ml-4 xl:ltr:-ml-8 text-brand-dark">
        {doctor_input || dept} Doctors
      </div>
      <div
        id="productGrid"
        className="w-full lg:pt-4 lg:ltr:-ml-4 lg:rtl:-mr-2 xl:ltr:-ml-8 xl:rtl:-mr-8 lg:-mt-1"
      >
        <DoctorGrid
          isLoading={isLoading}
          error={false}
          data={doctorList || []}
        />
      </div>
    </Container>
  );
};

export default DoctorList;
