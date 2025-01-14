"use client";
import { useState } from 'react';
import FormAlert from '../../../components/FormAlert';

export default function EditDoctorPage() {
  const [formData, setFormData] = useState({
    name: 'Dr Daniel Smith',
    specialization: 'Dentist',
    age: 29,
    email: 'email@yourdomain.com',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    dob: '1989-12-12',
    experience: '10 years',
    phone: '+91 12345 67890',
    gender: 'Male',
    address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    file: null,
    confirm: false,
  });

  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.confirm) {
      setAlert({ type: 'error', message: 'Please confirm to submit.' });
    } else {
      setAlert({ type: 'success', message: 'Updated Successfully! Please Check in doctors list.' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="p-6 w-[80vw] text-black">
      <h1 className="text-3xl font-semibold">Edit Doctor</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm">Doctor Name</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm">Date of Birth</label>
            <input
              className="w-full p-2 border rounded"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm">Specialization</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm">Experience</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm">Age</label>
            <input
              className="w-full p-2 border rounded"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm">Phone</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm">Email</label>
            <input
              className="w-full p-2 border rounded"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm">Gender</label>
            <select
              className="w-full p-2 border rounded"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm">Doctor Details</label>
            <textarea
              className="w-full p-2 border rounded"
              name="details"
              value={formData.details}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm">Address</label>
            <textarea
              className="w-full p-2 border rounded"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        <div>
          <label className="block text-sm">File</label>
          <input
            className="w-full p-2 border rounded"
            type="file"
            name="file"
            onChange={(e) => setFormData({ ...formData, file: e.target.files ? e.target.files[0] : null })}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="confirm"
            checked={formData.confirm}
            onChange={handleChange}
          />
          <span className="ml-2 text-sm">Please Confirm</span>
        </div>

        <button className="bg-pink-500 text-white p-2 rounded" type="submit">
          Update
        </button>
      </form>

      {alert && <FormAlert type={alert.type} message={alert.message} />}
    </div>
  );
}
