import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

const BodyLayout = ({header, title, description, content, footer}) => {
  return (
    <>
    <div className='flex justify-center'>
      <Card className='!bg-background/20 lg:m-4 w-3/4' >
        <CardHeader>
          <CardTitle>
            { title? title : null }
          </CardTitle>
          <CardDescription>
            { description ? description :null }
          </CardDescription>
        </CardHeader>
        <CardContent>
          { content ? content : null }
        </CardContent>
        <CardFooter>
          { footer ? footer : null }
        </CardFooter>
      </Card>
      </div>
    </>
  )
}

export default BodyLayout