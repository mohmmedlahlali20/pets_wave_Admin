'use client'

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowBigLeft, ArrowBigRight, X } from 'lucide-react';
import { getAllcategories } from '@/app/redux/slice/categorySlice';
import { addPet } from '@/app/redux/slice/petSlice';

const AddPetPopup = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector((state) => state.category)

  const [currentStep, setCurrentStep] = useState(1);
  const [petData, setPetData] = useState({
    name: "",
    gender: "",
    age: "",
    category: "",
    images: [],
    description: "",
    Prix: "",
  });

  useEffect(() => {
    dispatch(getAllcategories());
  }, [dispatch]);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleInputChange = (e) => {
    setPetData({ ...petData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      setPetData({
        ...petData,
        images: [...petData.images, ...Array.from(files)],
      });
    }
  };

  const handleSubmit = async () => {
    try {
      await dispatch(addPet(petData)).unwrap();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your pet has been added successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      onClose();
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "There was an error adding the pet",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };


  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl w-1/3 p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition">
            <X size={24} />
          </button>

          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Add New Pet</h2>
          <hr className="mb-4 border-gray-300" />

          <div className="flex justify-between mb-6">
            <button
              onClick={handleBack}
              className={`p-2 text-gray-600 hover:text-gray-800 transition ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentStep === 1}
            >
              <ArrowBigLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className={`p-2 text-blue-600 hover:text-blue-800 transition ${currentStep === 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentStep === 3}
            >
              <ArrowBigRight size={24} />
            </button>
          </div>

          {currentStep === 1 && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={petData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 mb-4"
              />

              <label className="block text-gray-700 font-medium mb-1">Gender:</label>
              <select
                name="gender"
                value={petData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 mb-4"
              >
                <option value="">Select a gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <label className="block text-gray-700 font-medium mb-1">Age (weeks):</label>
              <input
                type="number"
                name="age"
                value={petData.age}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 mb-4"
              />

              <label className="block text-gray-700 font-medium mb-1">Category:</label>
              <select
                name="category"
                value={petData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 mb-4"
              >
                <option value="">Select a category</option>
                {categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>

              <label className="block text-gray-700 font-medium mb-1">Price ($):</label>
              <input
                type="number"
                name="Prix"
                value={petData.Prix}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 mb-4"
              />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Upload Pet Images</h3>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 mb-4"
              />
              {petData.images.length > 0 && (
                <div className="grid grid-cols-6 gap-2 mt-4">
                  {petData.images.map((image, index) => (
                    <img key={index} src={URL.createObjectURL(image)} alt={`pet-${index}`} className="w-20 h-20 object-cover rounded-md shadow-md" />
                  ))}
                </div>
              )}
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Description:</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none h-32"
                name="description"
                value={petData.description || ""}
                onChange={handleInputChange}
                placeholder="Enter pet description..."
              />
              <button
                onClick={handleSubmit}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          )}

        </div>
      </div>
    )
  );
};

export default AddPetPopup;
