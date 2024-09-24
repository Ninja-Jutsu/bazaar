import { Label } from '../ui/label'
import { Input } from '../ui/input'

function ImageInput() {
  return (
    <div>
      <Label
        htmlFor='image'
        className='capitalize lg:hidden'
      >
        Image
      </Label>
      <Input
        id='image'
        name='image'
        type='file'
        required
        accept='image/*'
        className='text-center text-xl w-[250px] '
      />
    </div>
  )
}
export default ImageInput
