import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '../common/Button.jsx'
import Input from '../common/Input.jsx'

const schema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password required'),
})

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <Input label="Email" type="email" placeholder="you@example.com" {...register('email')} error={errors.email?.message} />
      <Input label="Password" type="password" placeholder="••••••" {...register('password')} error={errors.password?.message} />
      <Button className="w-full">Sign in</Button>
    </form>
  )
}

export default LoginForm
