import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
function SectionTitle({
  text,
  moreStyles,
  useSeparator = true,
}: {
  text: string
  moreStyles?: string
  useSeparator?: boolean
}) {
  return (
    <div>
      <h2
        className={cn(
          'text-3xl font-medium tracking-wider capitalize mt-8',
          moreStyles
        )}
      >
        {text}
      </h2>
      {useSeparator && <Separator />}
    </div>
  )
}
export default SectionTitle
