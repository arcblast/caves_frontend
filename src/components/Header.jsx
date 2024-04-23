import Logo from '../assets/caves.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ArrowRightIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const navigation = [
  { id: 1, name: 'Home', href: '/', value: 'home' },
  { id: 2, name: 'Taxonomy', href: '/login', value: 'taxonomy' },
  { id: 3, name: 'Isolation source', href: '/isolation-source', value: 'isolation' },
  { id: 4, name: 'About', href: '/signup', value: 'about' },
]

// const activeClassName = 'text-primary font-bold';



const Header = () => {
	const navigate = useNavigate()
	const [ navMenuOpen, setNavMenuOpen ] = useState(false);
	const activeStyleCallback = ({ isActive }) =>
  isActive ? 'text-primary font-bold' : 'text-secondary font-normal';
	const user = false

  return (
    <header className='sticky top-0 left-0 right-0 z-50 bg-background/25 lg:backdrop-blur-lg' >
			<div className='flex container py-2 justify-between items-center'>
				<Link to="/" className='flex lg:flex-1 items-center'>
          <img className="h-12" src={Logo} alt='Logo' />
					<h1 className='lg:font-bold lg:text-3xl lg:text-primary lg:ml-1 sm:hidden'>caves</h1>
        </Link>

				{/* Mobile and Tablet View */}
				<div className='flex lg:hidden'>
					{ navMenuOpen ? (
						<Button variant='ghost' size='icon' onClick={() => setNavMenuOpen(false)}>
							<XMarkIcon  />
						</Button>
					) : (
						<Button variant='ghost' size='icon' onClick={() => setNavMenuOpen(true)}>
							<Bars3Icon  />
						</Button>
					)}

					<div
						className={`${
							navMenuOpen ? 'right-0' : "-right-full"
						} lg:hidden transition-all duration-300 mt-[64px] z-50 flex flex-col w-full sm:w-full md:w-1/2 fixed top-0 bottom-0 gap-y-4 gap-x-9 justify-start bg-primary pt-10`}
					>
					 { navigation.map( (item) => (
							<>
							<Link
								key={item.id}
								type='button'
								to={item.href}
								// onClick={() => navigate(item.href)}
								onClick={() => {
									setActiveTab(item.value)
									console.log(item.value)
								}}
								className='text-background text-lg font-bold px-3 focus:text-secondary focus:font-bold flex justify-between mx-2 hover:bg-background'
							>
								<h2 className=' '>{item.name}</h2>
								<ArrowRightIcon className='h-4' />
							</Link>
							<Separator className='mx-2' />
							</>
            ))}
						<div>
							{ user ? (
								<div className='flex justify-center m-4'>
									<Button className='text-base w-1/2' onClick={() => navigate('/')} >
										Logout
									</Button>
								</div>
							) : (
								<div className='flex justify-between gap-x-2 mx-4 mt-4'>
									<Button variant='link' className='text-base w-full bg-background' onClick={() => navigate('/signup')} >
										Sign up
									</Button>
									<Button className='text-base w-full' onClick={() => navigate('/login')} >
										Log in  <span className='font-semibold text-xl ml-2'> &rarr;</span>
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
							key={item.id}
							to={item.href}
							className={activeStyleCallback}
						>
							{item.name}
						</NavLink>
          ))}
        </div>
			
				<div className='hidden lg:flex lg:flex-1 lg:justify-end gap-x-2'>
					{ user ? (
						<Button className='text-base' onClick={() => navigate('/')} >
							Logout
						</Button>
					) : (
						<div className='flex gap-y-2'>
							<Button variant='link' className='text-base' onClick={() => navigate('/signup')} >
								Sign up
							</Button>
							<Button className='text-base' onClick={() => navigate('/login')} >
								Log in  <span className='font-semibold text-xl ml-2'> &rarr;</span>
							</Button>
						</div>
					)}
				</div>
			
			</div>
    </header>
  )
}

export default Header