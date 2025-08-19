import { useAuth } from '@/hooks/useAuth'
import { PencilSquareIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';
import EditPersonalData from '../modals/EditPersonalData';
import { myProfile } from '@/api/Auth';
import { useQuery } from '@tanstack/react-query';


const PersonalData = () => {


  const [openModal, setOpenModal] = useState(false)
 const { data: user, isLoading } = useQuery({
    queryKey: ["customer-profile"],
    queryFn: myProfile,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (!user) return null;


  const handleModal = () => {
    setOpenModal(true)
  }

  return (
    <>
      <div className='bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-gray-800'>Informacion Personal</h2>
          <button
          className='cursor-pointer'
          onClick={handleModal}
          >
            <PencilSquareIcon/>
            <span className='font-medium'>Editar</span>
          </button>

        </div>

        <div className='space-y-4'>
          <div className='flex items-center'>
            <p className='font-semibold text-fuchsia-600 w-32'>Nombre:</p>
            <p className='text-gray-800'>{user?.name}</p>
          </div>
          <div className='flex items-center'>
            <p className='font-semibold text-fuchsia-600 w-32'>Email:</p>
            <p className='text-gray-800'>{user?.email}</p>
          </div>
          <div className='flex items-center'>
            <p className='font-semibold text-fuchsia-600 w-32'>Teléfono:</p>
            <p className='text-gray-800'>{user?.telephone}</p>
          </div>
          <div className='flex items-center'>
            <p className='font-semibold text-fuchsia-600 w-32'>Direccion:</p>
            <p className='text-gray-800'>{user?.address}</p>
          </div>

        </div>

        { openModal && (
          <EditPersonalData
            openModal={openModal}
            user={user}
            setOpenModal={setOpenModal}
          />
        ) }

      </div>
    </>
  )
}

export default PersonalData
