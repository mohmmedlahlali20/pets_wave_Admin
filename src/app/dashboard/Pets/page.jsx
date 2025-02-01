"use client"
import React, { useState, useEffect } from 'react';
import { getAllPets } from '../server/GetAllPets';
import { Trash2, Edit, ArrowBigLeft, ArrowBigRight,  CheckCircle, XCircle } from 'lucide-react';
import AddPetPopup from './addPet';

export default function PetsManage() {
  const [pets, setPets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchPets = async () => {
      const fetchedPets = await getAllPets();
      setPets(fetchedPets);
    };
    fetchPets();
  }, [pets]);

  const handleDelete = (petId) => {
    console.log('Delete pet', petId);
  };

  const handleUpdate = (petId) => {
    console.log('Update pet', petId);
  };

  const indexOfLastPet = currentPage * itemsPerPage;
  const indexOfFirstPet = indexOfLastPet - itemsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(pets.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Pet Information</h2>
      <div className="mb-4 text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add New Pet
        </button>
      </div>
      {pets.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-left">Name</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-left">Gender</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-left">Age</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-left">Category</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-left">Price</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-left">IsAvaliable</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentPets.map((pet) => (
                <tr key={pet._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">{pet.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{pet.gender}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{pet.age} Weeks</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{pet.category?.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">${pet.Prix}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 flex items-center gap-2">
                    {pet.isAvailable ? (
                      <>
                        <CheckCircle className="text-green-500 w-5 h-5 ml-8 mt-2" size={16} />
                      </>
                    ) : (
                      <>
                        <XCircle className="text-red-500 w-5 h-5 ml-8 mt-2" size={16} />
                      </>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleUpdate(pet._id)}
                        className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out p-2 rounded-md hover:bg-blue-200"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(pet._id)}
                        className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out p-2 rounded-md hover:bg-red-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Loading pet details...</p>
      )}

      <div className="mt-4 flex justify-center space-x-3">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
        >
          <ArrowBigLeft size={24} />
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
        >
          <ArrowBigRight size={24} />
        </button>
      </div>

      <AddPetPopup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
