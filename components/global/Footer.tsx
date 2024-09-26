import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'

import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const iconsStyle = 'text-black dark:text-white sm:w-6 sm:h-6'

type Links = {
  label: string
}

const links: Links[] = [
  {
    label: 'location',
  },
  {
    label: 'Social Media',
  },
  {
    label: 'About',
  },
  {
    label: 'Resources',
  },

  {
    label: 'Email us',
  },
]

export default function Footer() {
  return (
    <div className='w-full flex justify-center items-center m-auto mb-5'>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant='outline'
            size='lg'
          >
            More Info
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className='sm:text-2xl mb-5'>
              Customer Portal
            </DrawerTitle>
            <div>
              <Table>
                <TableCaption>
                  <Link
                    href='/'
                    className='sm:text-2xl font-bold capitalize'
                  >
                    Bazaar &copy; {new Date().getFullYear()} Bazaar. All rights
                    reserved.
                  </Link>
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    {links.map(({ label }) => {
                      if (label === 'location') {
                        return (
                          <TableHead
                            key={label}
                            className='capitalize text-xs sm:text-l text-green-400 hidden sm:block pt-3'
                          >
                            {label}
                          </TableHead>
                        )
                      }
                      return (
                        <TableHead
                          key={label}
                          className='capitalize text-xs sm:text-l text-green-400'
                        >
                          {label}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className='text-xs sm:text-l'>
                    <TableCell className='hidden sm:block mt-2'>
                      <Link
                        href='https://maps.app.goo.gl/XVPiq67GzhUXKds77'
                        target='_blank'
                        className='align-middle'
                      >
                        Singapore
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className='flex gap-1'>
                        <Button
                          variant='outline'
                          size='icon'
                        >
                          <FaFacebookF className={iconsStyle} />
                        </Button>
                        <Button
                          variant='outline'
                          size='icon'
                        >
                          <FaInstagram className={iconsStyle} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link
                        href='/about'
                        className='capitalize hover:underline text-start'
                      >
                        Bazaar
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div>
                        <Link
                          href='/terms'
                          className='capitalize hover:underline'
                        >
                          Terms
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`mailto:ninja.jutsu.way@gmail.com`}
                        className='hover:underline'
                      >
                        Email Us
                      </Link>
                      <p>+65 8951 7611</p>
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter></TableFooter>
              </Table>
            </div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
