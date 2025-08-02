"use client";

import {useEffect, useMemo, useState } from "react";
 import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table/index";
import Image from 'next/image';
import moment from 'moment';

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import axios from 'axios'; 
import api from '@/lib/axios'; // Adjust the import path as necessary


export default function ListUsers() {
 
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await api.post(`/user/getadminusers?page=${currentPage}`);
        if (res.data.success) {
          setUsers(res.data.users);
          setTotalUsers(res.data.filteredUsersCount); // You can also use `usersCount` if no filters
          setUsersPerPage(res.data.resultPerPage);
        } else {
          setError("Failed to fetch users");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const totalPages = Math.ceil(totalUsers / usersPerPage);

return (
    <div>
      <PageBreadcrumb pageTitle="List Users" />

      <div className="space-y-6">
        <ComponentCard title="Admin Users Table">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <div className="min-w-[1102px]">
                <Table>
                  {/* Table Header */}
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell
                        
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        User
                      </TableCell>
                      <TableCell
                        
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                       Email
                      </TableCell>
                      <TableCell
                        
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Created At
                      </TableCell>
            
              
                    </TableRow>
                  </TableHeader>

                  {/* Table Body */}
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {users.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <div className="flex items-center gap-3">
                            <div className="w-10   overflow-hidden rounded-full">
                            
                               <img alt="Avatar" width={40} height={'auto'}  decoding="async" data-nimg="1"   src={user.avatar?.url}>
                              </img>
                            </div>
                            <div>
                              <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                {user.name}
                              </span>
                              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                                {user.role}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {user.email}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {moment(user.createdAt).format("DD MMM YYYY")} 
                        </TableCell>
 
         
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                
                <div className="px-6 py-4 border-t border-gray-200 dark:border-white/[0.05]"  >
                 <div className="flex items-center justify-between"  > 
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Showing {users.length} of {totalUsers} users
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                      >
                        Previous
                      </button>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className="px-3 py-1 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                      >
                        Next
                      </button>
                    </div>
                       
                  </div>
                </div>
              </div>
  
            </div>
          </div>  
        </ComponentCard>
      </div>
    </div>
  );

}
