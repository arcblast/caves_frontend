import React from 'react'
import Header from '../../components/Header'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '../../components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/caves.svg'
import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'

const Login = () => {
  const form = useForm()
  const navigate = useNavigate()

  return (
    <>
      {/* <Header /> */}
      <div className='flex justify-center my-10'>
      <Card className="lg:w-1/3 w-[350px] bg-background/25">
        <CardHeader>
          <Link to='/' >
            <img
              className='mx-auto my-2 h-12 w-auto'
              src={Logo}
              alt='CAVES'
            />
          </Link>
          <CardTitle className='flex justify-center'>Log in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className='grid gap-4'>
              <FormField 
                name='email'
                render={ ({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='your_email@gmail.com' />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField 
                name='password'
                render={ ({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='At least 8 characters' />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button className='mt-4'>Log in</Button>
            </div>
          </Form>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Label>Not a member?</Label>
          <Button variant='secondary' className='w-full' onClick={() => navigate('/signup')} >Sign up</Button>
        </CardFooter>
      </Card>
      </div>
    </>
  )
}

export default Login