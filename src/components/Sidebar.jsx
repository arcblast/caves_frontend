import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { sample_type } from '@/constants'
import { Input } from './ui/input'
import { Separator } from './ui/separator'

const Sidebar = () => {
  return (
    <>
			<Card className='w-1/4 justify-end p-2'>
				<CardHeader className='font-semibold'>Filter Occurences</CardHeader>
				<CardContent className='grid gap-y-4'>
					<Input placeholder='Species' className='placeholder:text-zinc-950 bg-transparent' />
					<Input placeholder='Cave/Sampling site' className='placeholder:text-zinc-950 bg-transparent' />
					<Select >
						<SelectTrigger>
							<SelectValue placeholder="Sample type" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{ sample_type.map( ({name, value}) => (
									<SelectItem key={value} value={value}>{name}</SelectItem>
								))
								} 
							</SelectGroup>
						</SelectContent>
					</Select>
					<Input placeholder='Municity/Province' className='placeholder:text-zinc-950 bg-transparent' />
					<Separator />
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Category 1" />
						</SelectTrigger>
					</Select>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Category 2" />
						</SelectTrigger>
					</Select>
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Category 3" />
						</SelectTrigger>
					</Select>
				</CardContent>
			</Card>
		</>
  )
}

export default Sidebar