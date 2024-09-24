import { Separator } from '@/components/ui/separator'
import Sidebar from './Sidebar'
import SectionTitle from '@/components/global/SectionTitle'

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SectionTitle text='Admin Dashboard' />
      <section className='grid lg:grid-cols-12 gap-12 mt-12'>
        <div className='lg:col-span-2'>
          <Sidebar />
        </div>
        <div className='lg:col-span-10 px-4'>{children}</div>
      </section>
    </>
  )
}
export default DashboardLayout
