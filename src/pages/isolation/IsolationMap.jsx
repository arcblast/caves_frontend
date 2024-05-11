import { Card, CardContent } from '@/components/ui/card';
import React from 'react'
import { MapContainer, TileLayer,  } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

const IsolationMap = () => {
  return (
    <div className='w-full h-full'>
			<Card className="bg-background/25 m-4">
					<MapContainer center={[14.1651, 121.2402]} zoom={15} zoomControl className='rounded-sm'>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>

					</MapContainer>
			</Card>
			
    </div>
  )
}

export default IsolationMap