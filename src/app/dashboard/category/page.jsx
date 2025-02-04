"use client"
import { useEffect, useState } from "react"
import { Edit, Trash2, Plus } from "lucide-react"
import CreateNewCategory from "./CreateNewCategory"
import { useDispatch, useSelector } from "react-redux"
import { getAllcategories } from "@/app/redux/slice/categorySlice"

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {loading, error, categories} = useSelector((state) => state.category)
 const dispatch = useDispatch()








  useEffect(() => {
    dispatch(getAllcategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    console.log("Delete category", id)
  }

  const handleUpdate = (id) => {
    console.log("Update category", id)
  }

  const indexOfLastCategory = currentPage * itemsPerPage
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage
  const currentCategory = categories.slice(indexOfFirstCategory, indexOfLastCategory)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const totalPages = Math.ceil(categories.length / itemsPerPage)

  return (
    <div className="container mx-auto px-4 sm:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Category Management</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center"
        >
          <Plus className="mr-2" size={20} />
          Add Category
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-left">Category Name</th>
              <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentCategory.map((cat) => (
              <tr key={cat._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{cat.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleUpdate(cat._id)}
                      className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out p-2 rounded-md hover:bg-blue-100"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-600 hover:text-red-800 transition duration-150 ease-in-out p-2 rounded-md hover:bg-red-100"
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

      <div className="mt-4 flex justify-center space-x-3">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50 hover:bg-gray-400 transition duration-300 ease-in-out"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 rounded-md transition duration-300 ease-in-out ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50 hover:bg-gray-400 transition duration-300 ease-in-out"
        >
          Next
        </button>
      </div>

      <CreateNewCategory isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

