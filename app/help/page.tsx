"use client";

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function HelpPage() {
  const faqs = [
    {
      question: 'What services does Mindspring offer?',
      answer: 'We provide parent coaching, child development support, family wellness planning, and guided emotional wellbeing sessions for children and families.',
    },
    {
      question: 'How do I book a consultation?',
      answer: 'Visit the contact page, share your details, and our team will reach out to schedule a session that fits your family’s needs.',
    },
    {
      question: 'Can Mindspring support my child’s emotional development?',
      answer: 'Yes. We work with caregivers to build practical strategies that support emotional growth, self-regulation, and age-appropriate communication.',
    },
    {
      question: 'Is support available for parents too?',
      answer: 'Absolutely. Our parent coaching includes guidance on routines, stress management, and building strong family relationships.',
    },
    {
      question: 'What can I expect from a first session?',
      answer: 'We begin with a compassionate discovery conversation, assess your goals, and recommend a supportive path tailored to your family.',
    },
    {
      question: 'How does Mindspring keep sessions safe?',
      answer: 'Our approach is warm, confidential, and designed to create a calm environment for both children and caregivers.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-sky-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-slate-900">Help & Support</h1>
            <p className="text-slate-600 mt-2">Answers to common questions about our family-centered mental health and child development services.</p>
          </div>
          <div className="relative w-full md:w-40 h-32 rounded-xl overflow-hidden shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80"
              alt="support"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="card mb-8 p-6">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-xl overflow-hidden">
                <button
                  className="w-full text-left px-5 py-4 flex justify-between items-center"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-medium text-slate-800">{faq.question}</span>
                  <span className="text-slate-500">{openIndex === index ? '−' : '+'}</span>
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-4 text-slate-700">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
          <p className="text-slate-700 mb-4">If you have a question about our programs or want to connect with our team, we’re here for you.</p>
          <Link href="/contact" className="btn btn-primary">Contact Support</Link>
        </div>
      </main>
    </div>
  );
}



