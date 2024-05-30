import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BarGraph = ({data, title}) => {
  return (
    <Card className='bg-background/25'>
      <CardHeader>
        <CardTitle className='font-poppins text-lg'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} className='font-inter text-sm'>
          <XAxis
            dataKey="name"
            stroke="black"
            // fontSize={12}
            tickLine={false}
            axisLine={true}
            className=''
          />
          <YAxis
            stroke="black"
            // fontSize={12}
            tickLine={false}
            axisLine={true}
            // tickFormatter={(value) => `${value}`}
          />
          <Tooltip />
          <Bar
            dataKey="occurences"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
          
        </BarChart>
      </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default BarGraph