"use client";

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { theme } from '@/config/theme';

export default function HelpPage() {
  const faqs = [
    {
      question: 'What services does Mindspring offer?',
      answer: 'We provide child development support, mental health therapy, and expert guidance for children and caregivers.',
    },
    {
      question: 'How do I book a consultation?',
      answer: 'Visit the contact page, share your details, and our team will reach out to schedule a session that fits your child’s needs.',
    },
    {
      question: 'Can Mindspring support my child’s emotional development?',
      answer: 'Yes. We work with caregivers to build practical strategies that support emotional growth, self-regulation, and age-appropriate communication.',
    },
    {
      question: 'Is support available for parents too?',
      answer: 'Absolutely. Our parent coaching includes guidance on routines, stress management, and practical support for child development.',
    },
    {
      question: 'What can I expect from a first session?',
      answer: 'We begin with a compassionate discovery conversation, assess your goals, and recommend a supportive path tailored to your child.',
    },
    {
      question: 'How does Mindspring keep sessions safe?',
      answer: 'Our approach is warm, confidential, and designed to create a calm environment for both children and caregivers.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-sky-50">
      <PageHero
        backgroundImage={theme.help.hero.backgroundImage}
        alt={theme.help.hero.alt}
        tagline={theme.help.hero.tagline}
        title={theme.help.hero.title}
        subtitle={theme.help.hero.subtitle}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-slate-900">Help & Support</h1>
            <p className="text-slate-600 mt-2">Answers to common questions about our child-focused mental health and development services.</p>
          </div>
          <div className="relative w-full md:w-40 h-32 rounded-xl overflow-hidden shadow-sm">
            <Image
              src="https://plus.unsplash.com/premium_photo-1683865775849-b958669dca26?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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



