// di pa maayos -> backend/redux connect

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form'
import { useForm } from 'react-hook-form'
import { Input } from '../../components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/caves.svg'
import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signup } from '@/services/auth/authSlice'
import { useToast } from '@/components/ui/use-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import LoadingSkeleton from '@/components/LoadingSkeleton'

const UserSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  institution: z.string(),
  address: z.string(),
  email: z.string().email({required_error: 'Email is required.'}),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirm_password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  user_level: z.string({ required_error: 'Please select a user level.'}),
}).refine( (data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password']
});

const Signup = () => {
  const form = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      // name: '',
      email: '',
      password: '',
      institution: '',
      address: '',
      // user_level: ''
    },
    mode: 'onChange',
  })


  const { user, loading, error } = useSelector( (state) => state.auth )
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { toast } = useToast()

  useEffect(() => {
    if(user) {
      navigate('/')
      toast({
        title: "Welcome to Caves!",
        description: "Enjoy browsing.",
      })
    }

    if(error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      })
    }
    // dispatch(reset())
  }, [ navigate, user, error ])

  if(loading) {
    return <LoadingSkeleton />
  }

  function onSubmit(data) {
    try {
      // const userData = {
      //   name: data.name,
      //   email: data.email,
      //   password: data.password,
      //   institution: data.institution,
      //   address: data.address,
      //   user_level: data.user_level,
      //   miso_categories: miso_categories
      // }

      dispatch(signup(data))   
    } catch(error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: {error},
      })
    }
  }
  
  return (
    <>
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
          <CardTitle className='flex justify-center'>Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
              <FormField 
                control={form.control}
                name='name'
                render={ ({field}) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your full name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name='institution'
                render={ ({field}) => (
                  <FormItem>
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your institution' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name='address'
                render={ ({field}) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your city/province' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name='email'
                render={ ({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='your_email@gmail.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                control={form.control}
                name='password'
                render={ ({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='At least 8 characters' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                name='confirm_password'
                render={ ({field}) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Confirm your password' {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                        <SelectItem value="GUEST">GUEST</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='mt-4'>Sign up</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Label>Already have an account?</Label>
          <Button variant='secondary' className='w-full' onClick={() => navigate('/login')} >Log in</Button>
        </CardFooter>
      </Card>
      </div>
    </>
  )
}

export default Signup