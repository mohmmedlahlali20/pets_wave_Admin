"use client"
import React, { useEffect, useState } from "react"
import { getAllPets } from "../server/GetAllPets"
import { Trash2, Edit } from "lucide-react"

export default function PetsManage() {
    const [pets, setPets] = useState([])

    useEffect(() => {
        const fetchPets = async () => {
            const fetchedPets = await getAllPets()
            console.log(fetchedPets);

            setPets(fetchedPets)
        }
        fetchPets()
    }, [])

    const handleDelete = (petId) => {
        console.log("Delete pet", petId)
    }

    const handleUpdate = (petId) => {
        console.log("Update pet", petId)
    }

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Pet Information</h2>
            <div>
                <div>
                    <button>add new pets</button>
                </div>
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
                                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {pets.map((pet) => (
                                <tr key={pet._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-700">{pet.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{pet.gender}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{pet.age} Weeks</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{pet.category?.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">${pet.Prix}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => handleUpdate(pet.id)}
                                                className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out p-2 rounded-md hover:bg-blue-200"
                                            >
                                                <Edit className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(pet.id)}
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
        </div>


    )
}
