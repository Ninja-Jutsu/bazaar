import SectionTitle from '@/components/global/SectionTitle'
import React from 'react'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Acceptance of Terms',
}

type Section = {
  title: string
  para: string
}

const sections: Section[] = [
  {
    title: '1. Acceptance of Terms',
    para: 'By accessing or using Bazaar, you acknowledge that you have read,understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, you may not access or use the application.',
  },
  {
    title: '2. User Accounts',
    para: 'By accessing or using Bazaar, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, you may not access or use the application.',
  },
  {
    title: '3. Product Information',
    para: 'We strive to provide accurate product descriptions, images, and pricing information. However, we do not warrant that the product descriptions, images, or other content on Bazaar are accurate, complete, reliable, current, or error-free.',
  },
  {
    title: '4. Orders and Payments',
    para: 'By placing an order through Bazaar, you agree to pay the specified price for the products or services. We accept various payment methods, and allpayments are processed securely.',
  },
  {
    title: '5. Shipping and Delivery',
    para: 'We will make reasonable efforts to deliver your order within the estimated timeframe. However, we are not responsible for any delays or damages caused by shipping carriers or events beyond our control.',
  },
  {
    title: '6. Returns and Refunds',
    para: 'We offer a 30-day return policy for eligible products. Please refer to our Returns Policy</Link> for detailed information on how to initiate a return and receive a refund.',
  },
]

export default function TermsPage() {
  return (
    <section className='mt-5'>
      <h1 className='flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-3xl font-bold leading-none tracking-wide sm:text-6xl'>
        Bazaar Terms and Conditions
      </h1>
      <Paragraph
        text={
          ' Welcome to Bazaar! By using our application, you agree to be bound by these terms and conditions. Please read them carefully before using our services. '
        }
      />
      {sections.map(({ title, para }) => (
        <article key={title}>
          <SectionTitle text={title} />
          <Paragraph text={para} />
        </article>
      ))}
    </section>
  )
}

function Paragraph({ text }: { text: string }) {
  return (
    <p className='mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground'>
      {text}
    </p>
  )
}
