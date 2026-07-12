import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '../common/Button.jsx'
import Input from '../common/Input.jsx'

const schema = z.object({
  type: z.enum(['offer', 'request']),
  title: z.string().min(3),
  category: z.string().min(2),
  description: z.string().min(10),
  availability: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  radiusKm: z.number().min(1),
})

const ListingForm = ({ defaultValues = {}, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema), defaultValues })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Listing type
          <select className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm" {...register('type')}>
            <option value="offer">Offer</option>
            <option value="request">Request</option>
          </select>
        </label>
        <Input label="Title" type="text" {...register('title')} error={errors.title?.message} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Category" type="text" {...register('category')} error={errors.category?.message} />
        <Input label="Radius (km)" type="number" {...register('radiusKm', { valueAsNumber: true })} error={errors.radiusKm?.message} />
      </div>
      <Input label="Description" type="text" {...register('description')} error={errors.description?.message} />
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="City" type="text" {...register('city')} error={errors.city?.message} />
        <Input label="Neighborhood" type="text" {...register('neighborhood')} error={errors.neighborhood?.message} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Latitude" type="text" {...register('latitude')} error={errors.latitude?.message} />
        <Input label="Longitude" type="text" {...register('longitude')} error={errors.longitude?.message} />
      </div>
      <Input label="Availability" type="text" {...register('availability')} error={errors.availability?.message} />
      <Button className="w-full">Save listing</Button>
    </form>
  )
}

export default ListingForm
