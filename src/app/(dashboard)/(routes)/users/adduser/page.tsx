"use client";
import React, { useEffect, useRef } from 'react'; 
import { useState , useCallback} from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css'; 
import { useDropzone } from "react-dropzone";
import { json } from 'stream/consumers'; 
import { useDispatch } from 'react-redux'; 
import { useRouter } from 'next/navigation';
import Link from "next/link"; 
import axios from 'axios'; 
import api from '@/lib/axios'; // Adjust the import path as necessary
import { log } from 'util';

  
export default function AddUsers() {

const dispatch = useDispatch();
const router = useRouter();


const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [role, setRole] = useState("");
const [gender, setGender] = useState("m");
const [dob, setDob] = useState(""); // We'll extract from flatpickr input
const [avatar, setAvatar] = useState<File | null>(null);
const [base64Image, setBase64Image] = useState<string | null>(null);
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
  if (!file) {
    setErrors(prev => ({ ...prev, avatar: "Please select a file." }));
    setPreview(null);
    return;
  }
  if (!file.type.startsWith("image/")) {
    setErrors(prev => ({ ...prev, avatar: "Only image files are allowed." }));
    setPreview(null);
    return;
  }

  // Show preview
  const previewUrl = URL.createObjectURL(file);
  setPreview(previewUrl);

  // Clear only avatar error
  setErrors(prev => ({ ...prev, avatar: "" }));

    // Convert to Base64
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64 = reader.result as string;
    setBase64Image(base64); 
  };
  reader.readAsDataURL(file);
};


  const dateInputRef = useRef<HTMLInputElement>(null); 
  useEffect(() => {
    if (dateInputRef.current) {
      flatpickr(dateInputRef.current, {
        dateFormat: 'Y-m-d', // e.g. 2025-07-27
        defaultDate:  '', // optional
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
    isValid = true;

  }

  if (!base64Image) {
    newErrors.avatar = "Image is required.";
    isValid = false;
  }
    
  setErrors(newErrors);
  return isValid;
};
 

  const handleSubmit = async (e: React.FormEvent) => { 
  
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("gender", gender);
    formData.set("role", role);
    formData.set("dob", dob);
    if (base64Image) {
      formData.set("avatar", base64Image);
    }
    
 
    try { 
      const res =  await api.post('/user/addadminuser', formData);  
      console.log('Login successful', res);
        if (res.data.success) {
            router.push('/users/listusers'); 
        } else {
         console.log('Failed to add user', res.data.message);
         
        }
    } catch (err) {      
        console.log('Login failed', err);
    }
 
};


return (
<div>
  <PageBreadcrumb pageTitle="Add User" />
  <ComponentCard title="">
    {/* Two-column grid */}
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* Name Field */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Name</label>
        <div className="relative">
          <input
            type="text"
            onChange={(e) => handleNameChange(e.target.value)}
            name="name"
            placeholder="name"
            className="input-style"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Email</label>
        <div className="relative">
          <input
            type="text"
            onChange={(e) => handleEmailChange(e.target.value)}
            name="email"
            placeholder="info@gmail.com"
            className="input-style"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Role Select */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Role</label>
        <div className="relative">
          <select
            name="role"
            onChange={(e) => handleSelectChange(e.target.value)}
            className="input-style"
          >
            <option value="">select role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>
      </div>

      {/* DOB Field */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Date of birth</label>
        <input
          id="date"
          type="text"
          className="input-style"
          ref={dateInputRef}
          name="date"
          placeholder="Pick a date"
        />
        {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
      </div>

      {/* Gender Radio Buttons */}
      <div className="flex flex-wrap items-center gap-8">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Gender</label>

        {['m', 'f', 'o'].map((val, index) => (
          <label
            key={val}
            htmlFor={`radio${index + 1}`}
            className="relative flex cursor-pointer select-none items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            <input
              id={`radio${index + 1}`}
              type="radio"
              name="group1"
              value={val}
              checked={gender === val}
              onChange={() => handleRadioChange(val)}
              className="sr-only"
            />
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full border-[1.25px] ${
                gender === val ? "border-brand-500 bg-brand-500" : "border-gray-400 bg-white"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  gender === val ? "bg-white" : ""
                } block`}
              ></span>
            </span>
            {val === 'm' ? 'Male' : val === 'f' ? 'Female' : 'Other'}
          </label>
        ))}

        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
      </div>

      {/* Image Upload */}
      <div className="flex flex-col gap-4 mt-6">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Image</label>

        <input
          type="file"
          name="avatar" 
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
                onClick={() => {
                  setPreview(null);
                  setBase64Image(null);
                  setErrors(prev => ({ ...prev, avatar: "" }));
                }}
              className="text-red-500 text-sm underline"
            >
              Remove Image
            </button>
          </div>
        )}

        {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>}
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex justify-end gap-4 mt-8">
      <button
        onClick={handleSubmit}
        className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300"
      >
        Save Changes
      </button>
 
      <Link
          href="/users/listusers"
          className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
        >
          Cancel
      </Link>

    </div>
  </ComponentCard>
</div>

);

}
