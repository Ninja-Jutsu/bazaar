import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { HiBellAlert } from 'react-icons/hi2'
import { fetchAdminOrders } from '@/utils/actions'
import { formatCurrency, formatDate } from '@/utils/format'
async function SalesPage() {
  const orders = await fetchAdminOrders()
  const hiddenOnSmallDevices = 'hidden md:block'
  return (
    <div>
      <Alert
        variant='destructive'
        className='md:hidden'
      >
        <HiBellAlert className='h-4 w-4' />
        <AlertTitle>Notice!</AlertTitle>
        <AlertDescription>
          Hidden table fields on small devices. For full table switch to bigger
          screens
        </AlertDescription>
      </Alert>
      <Table>
        <TableCaption>Total orders : {orders.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className={hiddenOnSmallDevices}>Email</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead className={hiddenOnSmallDevices}>
              Tax + Shipping
            </TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const {
              id,
              products,
              orderTotal,
              tax,
              shipping,
              createdAt,
              email,
            } = order

            return (
              <TableRow key={id}>
                <TableCell className={hiddenOnSmallDevices}>{email}</TableCell>
                <TableCell>{products}</TableCell>
                <TableCell>{formatCurrency(Number(orderTotal))}</TableCell>
                <TableCell className={hiddenOnSmallDevices}>
                  {formatCurrency(Number(tax) + Number(shipping))}
                </TableCell>

                <TableCell>{formatDate(createdAt)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
export default SalesPage
