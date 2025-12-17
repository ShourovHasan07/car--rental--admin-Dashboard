"use client"

import React, { useState } from 'react';

interface AddCarFormProps {
  token: string;
}

interface CarFormData {
  image: File | null;
  brand: string;
  model: string;
  year: number;
  dailyPrice: number;
  category: string;
  transmission: string;
  fuelType: string;
  seatingCapacity: number;
  location: string;
  description: string;
}

const AddCarForm: React.FC<AddCarFormProps> = ({ token }) => {

  const [formData, setFormData] = useState<CarFormData>({
    image: null,
    brand: '',
    model: '',
    year: 2025,
    dailyPrice: 100,
    category: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seatingCapacity: 5,
    location: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'dailyPrice' || name === 'seatingCapacity' 
        ? parseInt(value) || 0 
        : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
      setFileName(e.target.files[0].name)
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload a car image");
      return;
    }

    const data = new FormData();
    data.append("carImage", formData.image);
    data.append("brand", formData.brand);
    data.append("model", formData.model);
    data.append("year", String(formData.year));
    data.append("dailyPrice", String(formData.dailyPrice));
    data.append("category", formData.category);
    data.append("transmission", formData.transmission);
    data.append("fuelType", formData.fuelType);
    data.append("seatingCapacity", String(formData.seatingCapacity));
    data.append("location", formData.location);
    data.append("description", formData.description);

    const res = await fetch("http://localhost:3000/admin/cars/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to add car");
    }

    alert("Car added successfully 🚗");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Add New Car
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Fill in details to list a new car for booking, including pricing, availability, and car specifications.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                Upload a picture of your car
              </label>

              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors relative">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 mb-3 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-300 text-center">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">PNG, JPG, GIF up to 10MB</p>

                    {fileName && (
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-200 text-center">
                        Selected File: <span className="font-medium">{fileName}</span>
                      </p>
                    )}
                  </div>
                  <input
                    type="file"
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            {/* Brand & Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  placeholder="e.g. BMW, Mercedes, Audi..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  placeholder="e.g. X5, E-Class, M4..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={formData.model}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Year, Daily Price & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={formData.year}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="dailyPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Daily Price ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                  <input
                    type="number"
                    id="dailyPrice"
                    name="dailyPrice"
                    className="w-full pl-8 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={formData.dailyPrice}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Truck">Truck</option>
                  <option value="Van">Van</option>
                </select>
              </div>
            </div>

            {/* Transmission, Fuel Type & Seating Capacity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Transmission
                </label>
                <select
                  id="transmission"
                  name="transmission"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={formData.transmission}
                  onChange={handleChange}
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div>
                <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Fuel Type
                </label>
                <select
                  id="fuelType"
                  name="fuelType"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={formData.fuelType}
                  onChange={handleChange}
                >
                  <option value="Diesel">Diesel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label htmlFor="seatingCapacity" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Seating Capacity
                </label>
                <input
                  type="number"
                  id="seatingCapacity"
                  name="seatingCapacity"
                  min="1"
                  max="12"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  value={formData.seatingCapacity}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g. San Francisco, CA"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Describe your car, its condition, and any notable details..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                List Your Car
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCarForm;
