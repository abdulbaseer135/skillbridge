import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '../components/common/Button.jsx'
import Input from '../components/common/Input.jsx'
import apiClient from '../services/apiClient.js'

const schema = z.object({
  reason: z.string().min(5),
  details: z.string().optional(),
})

const ReportPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  const handleReport = async (data) => {
    await apiClient.post('/reports', data)
    alert('Report submitted')
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-semibold text-slate-900">Report user or listing</h1>
      <form onSubmit={handleSubmit(handleReport)} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <Input label="Reason" type="text" {...register('reason')} error={errors.reason?.message} />
        <Input label="Details" type="text" {...register('details')} error={errors.details?.message} />
        <Button className="w-full">Submit report</Button>
      </form>
    </main>
  )
}

export default ReportPage
