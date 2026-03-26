'use client';

import { useState } from 'react';
import { Phone, MapPin, Mail, Clock, MapPinIcon, ChevronDown } from 'lucide-react';

export const metadata = {
  title: 'Contact Logoland Promos | Get In Touch',
  description:
    'Contact our team for quotes, orders, or design help. Based in NYC, serving brands nationwide. Fast response time guaranteed.',
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', company: '', subject: 'General Inquiry', message: '' });
    }, 3000);
  };

  const faqs = [
    {
      question: 'What are your minimum order quantities?',
      answer:
        'Our minimums vary by product type, typically ranging from 25 to 100 units. We understand budget constraints and work with you to find solutions that fit your needs. Contact us for specific product minimums.',
    },
    {
      question: 'How long does production typically take?',
      answer:
        'Standard production is 5-7 business days from design approval. Rush orders are available for an additional fee. Shipping times vary by location. We always provide estimated delivery dates upfront.',
    },
    {
      question: 'Can you help with design?',
      answer:
        'Absolutely! Our in-house design team is available to help create artwork or modify your existing designs. Design services are included in most orders, and our designers are skilled in ensuring your brand looks perfect on any product.',
    },
    {
      question: 'Do you offer samples?',
      answer:
        'Yes, we offer sample products so you can see and feel the quality before placing a full order. Sample costs are discounted and often waived with larger orders. Samples help ensure you\'re completely satisfied with your choice.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, bank transfers, and flexible payment terms for large orders. Net 30 and Net 60 accounts are available for qualified customers. Contact our sales team for payment plan options.',
    },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      detail: '245 5th Avenue, Suite 1200',
      subdetal: 'New York, NY 10016',
    },
    {
      icon: Phone,
      title: 'Phone',
      detail: '(212) 555-0187',
      subdetal: 'Mon-Fri 9am-6pm ET',
    },
    {
      icon: Mail,
      title: 'Email',
      detail: 'hello@logolandpromos.com',
      subdetal: 'We respond within 24 hours',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      detail: 'Mon - Fri: 9:00 AM - 6:00 PM',
      subdetal: 'Sat - Sun: Closed (Emergency line available)',
    },
  ];

  return (
    <div className="bg-dark-950">
      {/* Header */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-dark-900/50">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4">Get In Touch</h1>
          <p className="text-center text-lg text-dark-300">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-dark-200 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-900/50 border border-dark-700 rounded-lg px-4 py-2.5 text-white placeholder-dark-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-dark-200 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-900/50 border border-dark-700 rounded-lg px-4 py-2.5 text-white placeholder-dark-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-dark-200 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-dark-900/50 border border-dark-700 rounded-lg px-4 py-2.5 text-white placeholder-dark-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-dark-200 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-dark-900/50 border border-dark-700 rounded-lg px-4 py-2.5 text-white placeholder-dark-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition-colors"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-dark-200 mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-dark-900/50 border border-dark-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition-colors appearance-none bg-no-repeat bg-right"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239CA3AF' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem',
                    }}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Request Quote">Request Quote</option>
                    <option value="Order Status">Order Status</option>
                    <option value="Design Help">Design Help</option>
                    <option value="Bulk Order">Bulk Order</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-dark-200 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-dark-900/50 border border-dark-700 rounded-lg px-4 py-2.5 text-white placeholder-dark-500 focus:outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    submitted
                      ? 'bg-brand-500 text-dark-950 cursor-default'
                      : 'bg-gradient-to-r from-brand-400 to-brand-500 text-dark-950 hover:shadow-lg hover:shadow-brand-500/20'
                  }`}
                >
                  {submitted ? '✓ Message Sent!' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="glass-card p-6">
                    <div className="flex items-start gap-4">
                      <Icon className="w-6 h-6 text-brand-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-sm text-dark-300">{info.detail}</p>
                        <p className="text-xs text-dark-400">{info.subdetal}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Map Placeholder */}
              <div className="glass-card p-6 h-56 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-accent-500/10" />
                <div className="relative z-10 text-center">
                  <MapPinIcon className="w-12 h-12 text-brand-400 mx-auto mb-3" />
                  <p className="text-sm text-dark-300">NYC Location</p>
                  <p className="text-xs text-dark-400 mt-2">Visit us or schedule a call</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-dark-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-card overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 hover:bg-dark-800/30 transition-colors"
                >
                  <h3 className="font-semibold text-left">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-400 flex-shrink-0 transition-transform duration-300 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6 pt-0 border-t border-dark-700/30 text-dark-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
