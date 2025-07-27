"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function ListUsers() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
    setSelectedValue(value);
  };

return (
  <div>
    <PageBreadcrumb pageTitle="List Users" />
    
    {/* Two-column grid */}
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      
      {/* Input Field */}
      <div>
        <label>Input with Placeholder</label>
        <div className="relative"> 
          <input
            type="text"
            placeholder="info@gmail.com"
            className="dark:bg-dark-900 w-full h-11 rounded-lg border px-4 py-2.5 text-sm text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Select Field */}
      <div>
        <label>Select Input</label>
        <div className="relative">
          <select
            onChange={(e) => handleSelectChange(e.target.value)}
            className="dark:bg-dark-900 w-full h-11 rounded-lg border px-4 py-2.5 text-sm text-gray-900 dark:text-white"
          >
            <option value="">Select an option</option>
            <option value="one">Option One</option>
            <option value="two">Option Two</option>
          </select>
        </div>
      </div>

    </div>
  </div>
);

}
