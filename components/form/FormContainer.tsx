'use client'

import { useFormState } from 'react-dom'
import { useEffect, useMemo } from 'react'
import { useToast } from '@/hooks/use-toast'
import { actionFunction } from '@/utils/types'

const initialState = {
  message: '',
}

function FormContainer({
  action,
  children,
  classNames,
}: {
  action: actionFunction
  children: React.ReactNode
  classNames?: string
}) {
  const [state, formAction] = useFormState(action, initialState)
  const { toast } = useToast()
  console.log('From COntainer')
  useEffect(() => {
    if (state.message) {
      console.log(state.message)
      toast({ description: state.message })
    }
  }, [state, toast])
  return (
    <form
      className={classNames}
      action={formAction}
    >
      {children}
    </form>
  )
}
export default FormContainer
