import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
function SectionTitle({
  text,
  moreStyles,
}: {
  text: string
  moreStyles?: string
}) {
  return (
    <div>
      <h2
        className={cn(
          'text-3xl font-medium tracking-wider capitalize my-8',
          moreStyles
        )}
      >
        {text}
      </h2>
      <Separator />
    </div>
  )
}
export default SectionTitle
