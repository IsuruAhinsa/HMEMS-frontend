import React, { useState } from 'react';
import userProfileImage from '../../../src/assets/imges/message.gif';
import * as Toast from '@radix-ui/react-toast';
import { Link } from 'react-router-dom';
const SentEmail = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email } = formData;

    // Validation checks
    if (!name || !email) {
      setResponseMessage('Please fill in both the name and email fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setResponseMessage(result.msg);

      // Show success toast message
      setToastMessage('Email sent successfully!');
      setOpen(true);

      // Reset form fields after successful submission
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: ''
      });

    } catch (error) {
      console.error('An error occurred:', error);
      setResponseMessage('An error occurred while sending the email');
      // Show error toast message
      setToastMessage('An error occurred while sending the email');
      setOpen(true);
    }
  };

  return (
    <div className="min-h-screen py-8 text-gray-800">
  
      <div className="container px-4 mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center text-white">
          <span className="text-blue-900 size-1/2">Quotation Confirmation Email</span>
        </h1>
        <Toast.Provider swipeDirection="right">
        <Toast.Root className="border border-green-400 rounded-md shadow-md bg-lime-400" open={open} onOpenChange={setOpen}>
          <Toast.Title className="p-3 font-semibold">{toastMessage}</Toast.Title>
          <Toast.Action asChild altText="Close toast">

            
          <Link to={"/vendor/quatation/setquatationList"}>
         
            <button className="p-3 text-xs text-gray-500 ">
             Move to DashBord
              </button>

           </Link>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-4 space-y-2 w-80 max-w-full m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
        <div className="grid grid-cols-1 gap-4 p-6 bg-white rounded-lg shadow-lg md:grid-cols-2">
          <div className="p-6 rounded-lg">
            <h3 className="mb-4 text-2xl font-semibold text-center">HMEMS</h3>
            <img src={userProfileImage} alt="User Profile" className="ml-20 w-96" />
          </div>
          <div className="p-6 bg-gray-100 rounded-lg">
            <h3 className="mb-4 text-2xl font-semibold">Fill the Form</h3>
            {responseMessage && <p className="mb-4 text-center">{responseMessage}</p>}
            <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
              <div className="col-span-1">
                <label className="block mb-2 font-medium">Vendor Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-blue-200 rounded" />
              </div>
              <div className="col-span-1">
                <label className="block mb-2 font-medium">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-blue-200 rounded" />
              </div>
              <div className="col-span-2">
                <label className="block mb-2 font-medium">Message</label>
                <textarea name="message" rows="5" value={formData.message} onChange={handleChange} className="w-full p-3 border border-blue-200 rounded"></textarea>
              </div>
              <div className="col-span-2">
                <button type="submit" className="w-full px-4 py-3 text-blue-800 transition bg-blue-200 border border-blue-200 rounded hover:bg-blue-300">
                  Sent
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentEmail;
