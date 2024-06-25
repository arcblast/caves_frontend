import Logo from '../assets/caves.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ArrowRight, MenuIcon, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/services/auth/authSlice';
import { useToast } from './ui/use-toast';
import { navigation } from '@/constants';


const Header = () => {
	const { user } = useSelector( (state) => state.auth )
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [ navMenuOpen, setNavMenuOpen ] = useState(false);
	const activeStyleCallback = ({ isActive }) =>
  	isActive ? 'text-primary font-bold' : 'text-foreground font-normal';
	const { toast } = useToast()

	const onLogout = async (e) => {
    e.preventDefault()

    try {
      dispatch(logout());
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error,
      })
    }
  }

  return (
		<header className='sticky top-0 left-0 right-0 z-50 bg-background/25 lg:backdrop-blur-lg shadow shadow-lime-300 font-inter' >
			<div className='flex container py-2 justify-between items-center'>
				<Link to="/" className='flex lg:flex-1 items-center'>
					<img className="h-12" src={Logo} alt='Logo' />
					{/* <h1 className='lg:font-bold lg:text-3xl lg:text-primary lg:ml-1 sm:hidden'>caves</h1> */}
				</Link>

				{/* Mobile and Tablet View */}
				<div className='flex lg:hidden'>
					{ navMenuOpen ? (
						<Button variant='ghost' size='icon' onClick={() => setNavMenuOpen(false)}>
							<X/>
						</Button>
					) : (
						<Button variant='ghost' size='icon' onClick={() => setNavMenuOpen(true)}>
							<MenuIcon/>
						</Button>
					)}

					<div
						className={`${
							navMenuOpen ? 'right-0' : "-right-full"
						} lg:hidden transition-all duration-300 mt-[64px] z-50 flex flex-col w-full sm:w-full md:w-1/2 fixed top-0 bottom-0 gap-y-4 gap-x-9 justify-start bg-primary pt-10`}
					>
						{ navigation.map( (item) => (
							<>
							<NavLink
								key={'mobileview:'+item.id}
								type='button'
								to={item.href}
								// onClick={() => navigate(item.href)}
								onClick={() => {
									setActiveTab(item.value)
								}}
								className='text-background text-lg font-bold px-3 focus:text-secondary focus:font-bold flex justify-between mx-2 hover:bg-background'
							>
								<h2 className=' '>{item.name}</h2>
								<ArrowRight className='h-4' />
							</NavLink>
							<Separator className='mx-2' />
							</>
						))}
						{ user?.user_level === 'ADMIN' ? (
							<NavLink
								key={'strain-collection'}
								type='button'
								to={'/strain-collection'}
								// onClick={() => navigate(item.href)}
								onClick={() => {
									setActiveTab('/strain-collection')
								}}
								className='text-background text-lg font-bold px-3 focus:text-secondary focus:font-bold flex justify-between mx-2 hover:bg-background'
							>
								<h2 className=' '>Collection</h2>
								<ArrowRight className='h-4' />
							</NavLink>
						) : null }
						<div>
							{ user ? (
								<div className='flex justify-center m-4'>
									<Button className='text-base w-1/2' onClick={onLogout} >
										Logout
									</Button>
								</div>
							) : (
								<div className='flex justify-between gap-x-2 mx-4 mt-4'>
									<Button variant='link' className='text-base w-full bg-background' onClick={() => navigate('/signup')} >
										Sign up
									</Button>
									<Button className='text-base w-full' onClick={() => navigate('/login')} >
										{/* Log in  <span className='font-semibold text-xl ml-2'> &rarr;</span> */}
										Log in <ArrowRight className='h-4' />
									</Button>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* Desktop */}
				<div className='hidden lg:flex lg:flex-row lg:gap-x-12'>
		  		{ navigation.map( (item) => (
						<NavLink
							key={'desktop:' + item.id}
							to={item.href}
							className={activeStyleCallback}
						>
							{item.name}
						</NavLink>
		  		))}
					{ user?.user_level === 'ADMIN' ? (
						<NavLink
							key={'strain-collection'}
							to={'/strain-collection'}
							className={activeStyleCallback}
						>
							Collection
						</NavLink>
					) : null }
				</div>
			
				<div className='hidden lg:flex lg:flex-1 lg:justify-end gap-x-2'>
					{ user ? (
						<Button className='text-base' onClick={onLogout} >
							Logout
						</Button>
					) : (
						<div className='flex gap-y-2'>
							<Button variant='link' className='text-base' onClick={() => navigate('/signup')} >
								Sign up
							</Button>
							<Button className='text-base pr-1.5' onClick={() => navigate('/login')} >
								{/* Log in  <span className='font-semibold text-xl ml-2'> &rarr;</span> */}
								Log in <ArrowRight className='h-4' />
							</Button>
						</div>
					)}
				</div>
			</div>
		</header>
  )
}

export default Header