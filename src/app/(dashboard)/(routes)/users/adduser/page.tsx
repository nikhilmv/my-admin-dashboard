"use client";
import React, { useEffect, useRef } from 'react'; 
import { useState , useCallback} from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css'; 
import { useDropzone } from "react-dropzone";
import { json } from 'stream/consumers';

export default function AddUsers() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [role, setRole] = useState("");
const [gender, setGender] = useState("m");
const [dob, setDob] = useState(""); // We'll extract from flatpickr input
const [avatar, setAvatar] = useState<File | null>(null);
const [preview, setPreview] = useState<string | null>(null);

const [errors, setErrors] = useState({
  name: "",
  email: "",
  role: "",
  dob: "",
  gender: "",
  avatar: "",
});

 
  const handleNameChange = (value: string) => {
  setName(value);
  setErrors(prev => ({ ...prev, name: "" }));
};

const handleEmailChange = (value: string) => {
  setEmail(value);
  setErrors(prev => ({ ...prev, email: "" }));
};

const handleSelectChange = (value: string) => {
  setRole(value);
  setErrors(prev => ({ ...prev, role: "" }));
};

const handleRadioChange = (value: string) => {
  setGender(value);
  setErrors(prev => ({ ...prev, gender: "" }));

};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file && file.type.startsWith("image/")) {
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
    setErrors(prev => ({ ...prev, avatar: "" }));
  } else {
    setPreview(null);
    setAvatar(null);
    setErrors(prev => ({ ...prev, avatar: "Please upload a valid image." }));
  }
};


  const dateInputRef = useRef<HTMLInputElement>(null); 
  useEffect(() => {
    if (dateInputRef.current) {
      flatpickr(dateInputRef.current, {
        dateFormat: 'Y-m-d', // e.g. 2025-07-27
        defaultDate: new Date(), // optional
      });
    }
  }, []);


  const validateForm = () => {
  let isValid = true;
  const newErrors: any = {};

  if (!name.trim()) {
    newErrors.name = "Name is required.";
    isValid = false;
  }

  if (!email.trim()) {
    newErrors.email = "Email is required.";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Invalid email format.";
    isValid = false;
  }

  if (!role) {
    newErrors.role = "Role is required.";
    isValid = false;
  }

  const dateVal = dateInputRef.current?.value;
  if (!dateVal) {
    newErrors.dob = "Date of birth is required.";
    isValid = false;
  } else {
    setDob(dateVal);
  }

  if (!avatar) {
    newErrors.avatar = "Image is required.";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};
 

  const handleSubmit = (e: React.FormEvent) => {
   
  e.preventDefault();
  if (!validateForm()) return;

  const formData = new FormData();
  formData.set("name", name);
  formData.set("email", email);
  formData.set("gender", gender);
  formData.set("role", role);
  formData.set("dob", dob);
  if (avatar) {
    formData.set("avatar", avatar);
  }
 
 
};


return (
  <div>
    <PageBreadcrumb pageTitle="Add User" />
        <ComponentCard title="">
    {/* Two-column grid */}
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

      
      {/* Input Field */}
      <div>
        <label>Name</label>
        <div className="relative"> 
          <input
            type="text" 
            onChange={(e) =>  handleNameChange(e.target.value)}
            name="name"
            placeholder="name"
            className="dark:bg-dark-900 w-full h-11 rounded-lg border px-4 py-2.5 text-sm text-gray-900 dark:text-white"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

        </div>
      </div>

      {/* Input Field */}
      <div>
        <label>Email</label>
        <div className="relative"> 
          <input
            type="text"
            onChange={(e) => handleEmailChange(e.target.value)} 
            name="email"
            placeholder="info@gmail.com"
            className="dark:bg-dark-900 w-full h-11 rounded-lg border px-4 py-2.5 text-sm text-gray-900 dark:text-white"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

        </div>
      </div>

      {/* Select Field */}
      <div>
        <label>Role</label>
        <div className="relative">
          <select 
            name="role"
            onChange={(e) => handleSelectChange(e.target.value)}
            className="dark:bg-dark-900 w-full h-11 rounded-lg border px-4 py-2.5 text-sm text-gray-900 dark:text-white"
          >
            <option value="">select role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}

        </div>
      </div>
   

      <div>
        <label htmlFor="date">Date of birth:</label>
        <input
          id="date"
          type="text"
            className="dark:bg-dark-900 w-full h-11 rounded-lg border px-4 py-2.5 text-sm text-gray-900 dark:text-white"
          ref={dateInputRef}
          name="date"
          placeholder="Pick a date"
        />
          {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}

      </div> 

      <div className="flex flex-wrap items-center gap-8">

      <label>Gender</label>
        {/* Option 1 */}
        <label
          htmlFor="radio1"
          className="relative flex cursor-pointer select-none items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          <input
            id="radio1"
            type="radio"
            name="group1"
            value="m"
            checked={gender === "m"}
            onChange={() => handleRadioChange("m")}
            className="sr-only"
          />
          <span className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.25px] ${
            gender === "m"
              ? "border-brand-500 bg-brand-500"
              : "border-gray-400 bg-white"
          }`}>
            <span
              className={`h-2 w-2 rounded-full ${
                gender === "m" ? "bg-white" : ""
              } block`}
            ></span>
          </span>
          Male
        </label>

        {/* Option 2 */}
        <label
          htmlFor="radio2"
          className="relative flex cursor-pointer select-none items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          <input
            id="radio2"
            type="radio"
            name="group1"
            value="f"
            checked={gender === "f"}
            onChange={() => handleRadioChange("f")}
            className="sr-only"
          />
          <span className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.25px] ${
            gender === "f"
              ? "border-brand-500 bg-brand-500"
              : "border-gray-400 bg-white"
          }`}>
            <span
              className={`h-2 w-2 rounded-full ${
                gender === "f" ? "bg-white" : ""
              } block`}
            ></span>
          </span>
          Female
        </label>

        {/* Option 3 */}
        <label
          htmlFor="radio3"
          className="relative flex cursor-pointer select-none items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          <input
            id="radio3"
            type="radio"
            name="group1"
            value="o"
            checked={gender === "o"}
            onChange={() => handleRadioChange("o")}
            className="sr-only"
          />
          <span className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.25px] ${
            gender === "o"
              ? "border-brand-500 bg-brand-500"
              : "border-gray-400 bg-white"
          }`}>
            <span
              className={`h-2 w-2 rounded-full ${
                gender === "o" ? "bg-white" : ""
              } block`}
            ></span>
          </span>
          Other
        </label>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
     
      

       <div className="flex flex-col gap-4 mt-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />

          {preview && (
            <div className="flex flex-col items-start gap-2">
              <img
                src={preview}
                alt="Preview"
                className="w-48 h-48 object-cover rounded border border-gray-300"
              />
              <button
                onClick={() => setPreview(null)}
                className="text-red-500 text-sm underline"
              >
                Remove Image
              </button>
            </div>
          )}
          {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>}

        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>


      </div>


    </div>
     </ComponentCard>
  </div>
);

}
