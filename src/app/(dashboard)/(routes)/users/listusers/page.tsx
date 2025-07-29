"use client";

import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";

export default function ListUsers() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
    setSelectedValue(value);
  };

return (
  <div>
    <PageBreadcrumb pageTitle="List Users" />
    
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          dwdwsd
        </ComponentCard>
      </div>

  </div>
);

}
