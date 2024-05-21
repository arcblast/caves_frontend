import React from 'react'
import { Skeleton } from './ui/skeleton'

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center h-screen w-screen bg-primary/50 justify-center z-50">
			<div className='grid gap-4'>
				<div className='flex space-x-4 items-center justify-center'>
					<Skeleton className="h-12 w-12 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
				<div className='flex space-x-4 items-center justify-center'>
					<Skeleton className="h-12 w-12 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
				<div className='flex space-x-4 items-center justify-center'>
					<Skeleton className="h-12 w-12 rounded-full" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
			</div>
    </div>
  )
}

export default LoadingSkeleton