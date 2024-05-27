import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
  {
    name: "Bat Rinse",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Cave Water",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Fresh Guano",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Guano",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Gut",
    total: Math.floor(Math.random() * 5000) + 1000,
  }
];

const BarGraph = ({data, title}) => {
  return (
    <Card className='bg-background/25'>
      <CardHeader>
        <CardTitle className='font-poppins text-lg'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="fill-foreground"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="fill-foreground"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
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