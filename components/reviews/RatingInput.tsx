import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const numbersArray = ['5', '4', '3', '2', '1']

//Or:
// const numbers = Array.from({ length: 5 }, (_, i) => {
//   const value = i + 1
//   return value.toString()
// }).reverse()

const RatingInput = ({
  name,
  labelText,
}: {
  name: string
  labelText?: string
}) => {
  return (
    <div className='mb-2 max-w-xs'>
      <Label
        htmlFor={name}
        className='capitalize'
      >
        {labelText || name}
      </Label>
      <Select
        defaultValue={numbersArray[0]}
        name={name}
        required
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {numbersArray.map((number) => {
            return (
              <SelectItem
                key={number}
                value={number}
              >
                {number}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}

export default RatingInput
