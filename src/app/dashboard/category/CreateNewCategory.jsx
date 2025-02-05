"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { X } from "lucide-react";
import Swal from "sweetalert2";
import { addCategory } from "@/app/redux/slice/categorySlice";

export default function CreateNewCategory({ isOpen, onClose }) {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);

        try {
            await dispatch(addCategory(formData)).unwrap();

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Category has been added successfully",
                showConfirmButton: false,
                timer: 1500,
            });

            setName(""); 
            onClose();
        } catch (err) {
            console.error("Error:", err);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error adding category",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold text-gray-800">Add New Category</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter category name"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Add Category
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
