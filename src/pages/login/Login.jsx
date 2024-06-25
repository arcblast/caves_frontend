import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/caves.svg'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '@/services/auth/authSlice'
import LoadingSkeleton from '@/components/LoadingSkeleton'

const Login = () => {
  const { user, loading, error } = useSelector( (state) => state.auth )
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { toast } = useToast()
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    if(user) {
      navigate('/')
      toast({
        title: "Welcome back!",
        description: 'Enjoy browsing.'
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

  const onSubmit = (data) => {
    try {
      dispatch(login(data))
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: {error},
      })
    }
  }

  return (
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
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4'>
            <div className='grid gap-2'>
              <Label>Email</Label>
              <Input required name='email' placeholder='your_email@gmail.com' {...register('email')} />
            </div>

            <div className='grid gap-2'>
              <Label>Password</Label>
              <Input required name='password' type='password' placeholder='At least 8 characters' {...register('password')} />
            </div>

            <Button type='submit' className='mt-4'>Log in</Button>
          </form>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <Label>Not a member?</Label>
          <Button variant='secondary' className='w-full' onClick={() => navigate('/signup')} >Sign up</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login