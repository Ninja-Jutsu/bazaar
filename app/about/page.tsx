import SectionTitle from '@/components/global/SectionTitle'

function AboutPage() {
  return (
    <section>
      <h1 className='flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl'>
        Welcome to Bazaar
        <span className='bg-primary py-2 px-4 rounded-lg tracking-widest text-white dark:text-black'>
          Your Marketplace, Your Way
        </span>
      </h1>
      <SectionTitle text='Introduction' />
      <Paragraph
        text={
          'Bazaar is more than just an online shop. It&apos;s a vibrant community where anyone can discover unique products, set up their own mini-store, and connect with buyers and sellers from around the world. '
        }
      />
      <SectionTitle text='Our Mission' />
      <Paragraph
        text={
          'We believe in the power of individual creativity and entrepreneurship. Our mission is to provide a platform that makes it easy for anyone to turn their passion into a thriving business.'
        }
      />
      <SectionTitle text='Key Features & Benefits' />
      <ul className='mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground'>
        {benefits.map(({ title, description }) => {
          return (
            <li key={title}>
              <strong>{title}: </strong>
              <span>{description}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
export default AboutPage

interface Benefits {
  title: string
  description: string
}

const benefits: Benefits[] = [
  {
    title: 'Diverse Product Range',
    description:
      "From handmade crafts to vintage finds, there's something for everyone at Bazaar.",
  },
  {
    title: 'Easy-to-Use Storefronts',
    description:
      'Create your own personalized store in minutes, no technical skills required.',
  },
  {
    title: 'Secure Transactions',
    description:
      'Our platform ensures safe and secure payments for both buyers and sellers.',
  },
  {
    title: 'Community & Connection',
    description:
      'Connect with fellow sellers, share ideas, and build your network.',
  },
]

function Paragraph({ text }) {
  return (
    <p className='mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto text-muted-foreground'>
      {text}
    </p>
  )
}
