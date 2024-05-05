import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'

const BodyLayout = ({header, title, description, content, footer}) => {
  return (
    <>
      <Card className='!bg-background/20 lg:m-4' >
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
    </>
  )
}

export default BodyLayout