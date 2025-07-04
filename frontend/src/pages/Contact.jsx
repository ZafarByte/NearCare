import React, { useState } from 'react'
import { assets } from '../assets/assets'
import Footer from '../components/Footer'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    // Here you would typically send the form data to your backend or an email service
  }

  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>CONTACT <span className="text-gray-700 font-medium">US</span></p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12 items-center justify-center">
        <img className="w-full md:max-w-[360px] rounded-lg shadow-lg" src={assets.contact_image} alt="Contact" />
        <div className="flex flex-col justify-center gap-6 w-full md:w-2/4 text-sm text-gray-600">
          <p className="text-lg text-gray-700 font-medium mb-2">We'd love to hear from you!</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow border">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#0f172a]"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#0f172a]"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows={4}
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-[#0f172a] resize-none"
              required
            />
            <button
              type="submit"
              className="bg-[#0f172a] text-white text-sm font-light px-8 py-3 rounded-full hover:scale-105 transition-all duration-300"
            >
              Send Message
            </button>
            {submitted && <p className="text-green-600 text-center mt-2">Thank you for contacting us!</p>}
          </form>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-10 my-16 md:mx-10">
        <div className="flex items-center gap-4 border px-8 py-6 rounded-lg text-gray-600 bg-white shadow hover:bg-[#0f172a] hover:text-white transition-all duration-300">
          <img src={assets.location} alt="Location" className="w-8 h-8" />
          <div>
            <b>Address</b>
            <p>123 Main Street, City, Country</p>
          </div>
        </div>
        <div className="flex items-center gap-4 border px-8 py-6 rounded-lg text-gray-600 bg-white shadow hover:bg-[#0f172a] hover:text-white transition-all duration-300">
          <img src={assets.chats_icon} alt="Email" className="w-8 h-8" />
          <div>
            <b>Email</b>
            <p>nearCare@mail.com</p>
          </div>
        </div>
        <div className="flex items-center gap-4 border px-8 py-6 rounded-lg text-gray-600 bg-white shadow hover:bg-[#0f172a] hover:text-white transition-all duration-300">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5.75C3 4.23122 4.23122 3 5.75 3h12.5C19.7688 3 21 4.23122 21 5.75v12.5c0 1.5188-1.2312 2.75-2.75 2.75H5.75C4.23122 21 3 19.7688 3 18.25V5.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 11h8m-8 4h4" /></svg>
          <div>
            <b>Phone</b>
            <p>+12-345-678</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact