'use client'

import { Button } from "@/components/ui/button/Button"
import Field from "@/components/ui/field/Field"
import { getRandomFullName } from "@/utils/get-random-full-name.util"
import { AtSign, KeyRound } from "lucide-react"
import { signIn } from "next-auth/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { IAuthFormState } from "./auth.types"

interface IAuth {
  type?: 'Login' | 'Register'
}

export function Auth({ type }: IAuth) {

  const { register, handleSubmit } = useForm<IAuthFormState>({
    mode: 'onChange'
  })

  const onSubmit:SubmitHandler<IAuthFormState> = async (data) => {
    if(type === 'Login') {
      await signIn('credentials', {
        redirect: false,
        ...data,
      })
    } else {
      await signIn('credentials', {
        redirect: false,
        username: getRandomFullName(),
        ...data,
      })
    }
  }
  return <div className='flex w-screen h-full'>
    <form onSubmit={handleSubmit(onSubmit)} className='m-auto block w-96 border border-border p-8'>
      <h1 className='text-center mb-7'>{type}</h1>
      <Field
        {...register('email', {
          required: true,
          minLength: {
            value: 6,
            message: 'Min length 6 symbols'
          }
        })}
        placeholder='Enter email'
        type='email'
        Icon={AtSign}
        className='mb-7'
      />
      <Field
        {...register('password', {
          required: true,
        })}
        placeholder='Enter password'
        type='password'
        Icon={KeyRound}
        className='mb-12'
      />
      <div className='text-center'>
        <Button type='submit'>{type}</Button>
      </div>
    </form>
  </div>
}