'use client';

import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Mail, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import TopNotificationBar from '@/components/sections/top-notification-bar';
import HeaderTopInfo from '@/components/sections/header-top-info';
import MainHeader from '@/components/sections/main-header';
import MainNavigation from '@/components/sections/main-navigation';
import Footer from '@/components/sections/footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage('Failed to send enquiry. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const storeInfo = {
    name: 'Mulveer Jewellers',
    address: 'Jamboti Road, Piranwadi, Belagavi, Karnataka, PIN - 590011',
    phone: '+91 7204456583',
    whatsapp: '+917204456583',
    // Clean, query-based embed URL pointing to the Belagavi showroom
    mapEmbedUrl:
      'https://www.google.com/maps?q=Mulveer+Jewellers,+Jamboti+Road,+Piranwadi,+Belagavi,+Karnataka+590011&output=embed',
    timings: 'Daily, 10:00 AM – 9:00 PM',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f9f5f0]">
      <TopNotificationBar />
      <HeaderTopInfo />
      <MainHeader />
      <MainNavigation />
      <main className="w-full">
      {/* Header */}
      <div className="bg-[#3f0d1c] text-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Get in Touch</h1>
          <p className="mt-2 text-[#f6e2c7]">Visit our showroom or reach out to us. We're here to help!</p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Store Information Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Location Card */}
            <div className="rounded-lg border border-[#e8d7c3] bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-[#5a1024]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#3f0d1c] mb-2">Our Location</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{storeInfo.address}</p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Mulveer+Jewellers,+Jamboti+Road,+Piranwadi,+Belagavi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm font-semibold text-[#5a1024] hover:text-[#711533] hover:underline"
                  >
                    View in Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="rounded-lg border border-[#e8d7c3] bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-[#5a1024]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#3f0d1c] mb-2">Call Us</h3>
                  <a
                    href="tel:+917204456583"
                    className="inline-block text-lg font-semibold text-[#5a1024] hover:text-[#711533] hover:underline mb-3"
                  >
                    {storeInfo.phone}
                  </a>
                  <p className="text-sm text-gray-600">Available for calls and support</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="rounded-lg border border-[#e8d7c3] bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-[#5a1024]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#3f0d1c] mb-2">WhatsApp Us</h3>
                  <a
                    href={`https://wa.me/${storeInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Mulveer%20Jewellers`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Timings Card */}
            <div className="rounded-lg border border-[#e8d7c3] bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-[#5a1024]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#3f0d1c] mb-2">Showroom Timings</h3>
                  <p className="text-sm text-gray-600 font-semibold">{storeInfo.timings}</p>
                  <p className="text-xs text-gray-500 mt-2">We're open all days for your convenience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Map and Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Embedded Google Map */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-[#e8d7c3] bg-[#2a0714]">
              <iframe
                title="Mulveer Jewellers Location"
                className="w-full h-80 md:h-[420px]"
                src={storeInfo.mapEmbedUrl}
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Enquiry Form */}
            <div className="rounded-lg border border-[#e8d7c3] bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#3f0d1c] mb-6">Send us an Enquiry</h2>

              {submitStatus === 'success' && (
                <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-800">Success!</p>
                    <p className="text-sm text-green-700">Your enquiry has been sent. We'll contact you soon.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800">Error</p>
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#3f0d1c] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#d4c5b0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a1024] focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#3f0d1c] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#d4c5b0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a1024] focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#3f0d1c] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-[#d4c5b0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a1024] focus:border-transparent"
                    placeholder="+91 xxxxxxxxxx"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-[#3f0d1c] mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-[#d4c5b0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a1024] focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#3f0d1c] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-[#d4c5b0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5a1024] focus:border-transparent resize-none"
                    placeholder="Tell us more about your enquiry..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full bg-[#5a1024] text-white font-semibold py-3 rounded-lg hover:bg-[#711533] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'loading' ? 'Sending...' : 'Send Enquiry'}
                </button>
              </form>

              <p className="mt-4 text-xs text-gray-500 text-center">
                We'll get back to you within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 360° Showroom Experience */}
      <section className="bg-[#f3e5dc] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#7a4a3a]">
              Inside Mulveer Jewellers
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#3f0d1c] sm:text-4xl">
              360° Showroom Walkthrough
            </h2>
            <p className="mt-3 text-sm text-[#5f4840] max-w-2xl mx-auto">
              Take a virtual tour of our Belagavi showroom and explore the ambience,
              displays and jewellery experience before you visit in person.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl overflow-hidden shadow-lg border border-[#e0cbb7] bg-[#2a0714]">
              <iframe
                title="Mulveer Jewellers 360° View - Angle 1"
                src="https://www.google.com/maps/embed?pb=!4v1763127161017!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJREQydlNlSFE.!2m2!1d15.80235633536061!2d74.48186994380204!3f340!4f10!5f0.7820865974627469"
                className="w-full h-80 md:h-[420px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg border border-[#e0cbb7] bg-[#2a0714]">
              <iframe
                title="Mulveer Jewellers 360° View - Angle 2"
                src="https://www.google.com/maps/embed?pb=!4v1763127187397!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJREQydlNpVGc.!2m2!1d15.80235859920596!2d74.48188550475726!3f300!4f0!5f0.7820865974627469"
                className="w-full h-80 md:h-[420px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#3f0d1c] text-white py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Still have questions?</h2>
          <p className="text-[#f6e2c7] mb-6">Reach out to us in any way you prefer. We're here to help!</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`https://wa.me/917204456583?text=Hello%20Mulveer%20Jewellers`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
            <a
              href="tel:+917204456583"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#3f0d1c] transition-colors"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#f6e2c7] text-[#f6e2c7] font-semibold rounded-lg hover:bg-[#f6e2c7] hover:text-[#3f0d1c] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
