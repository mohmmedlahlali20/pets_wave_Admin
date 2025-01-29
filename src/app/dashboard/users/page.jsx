'use client'
import React, { useEffect, useState } from 'react'
import { GetAllUsers } from '../server/getAllUsers';

export default function manageUsers() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [itemsPerPage] = useState(5);
    
    const fetchUsers = async () => {
        try {
            const users = await GetAllUsers()
            setUsers(users)
            console.log(users)
        } catch (err) {
            console.error('cannot fetch', err);
        }
    };

    useEffect(() => {
        fetchUsers()
    }, []);

    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(users.length / itemsPerPage);

    return (
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">User Management</h2>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-left">Avatar</th>
                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-left">First Name</th>
                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-left">Last Name</th>
                            <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentUsers.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-700">IMG</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{user.firstName}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{user.lastName}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex justify-center space-x-3">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
                >
                    Previous
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
                    Next
                </button>
            </div>
        </div>
    );
}
