import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
 import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';
 import { Button } from '../ui/button';
import { useUserContext } from '@/context/useUserContext';
import { INITIAL_USER } from '@/context/AuthContext';
 

const LeftSideBar = () => {
     const { pathname} =useLocation();
    const navigate = useNavigate();
    const { user, setUser, setIsAuthenticated } = useUserContext();

 
    const signOut = () => {
        console.log("signout");
        localStorage.removeItem('token');
        navigate("/sign-in");
 
      };

      const handleSignOut = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
      ) => {
        e.preventDefault();
        signOut();
        setIsAuthenticated(false);
        setUser(INITIAL_USER);
        navigate("/sign-in");
      };
     

 

        
    return (
        <nav className='leftsidebar'>
            <div className='flex flex-col gap-11'>
                <Link to="/" className='flex gap-3 items-center'>
                    <h3 style={{ fontSize: '2rem', color: '#877EFF', fontWeight: 'bold' }}>ClubHubb</h3>
                    {/*<img src="logo" alt="logo" width={130} height={325}/> */}
                </Link>

                <div className='flex gap-3'>
                    <img
                        src="/public/assets/images/profile.png"
                        alt="profile"
                        className='h-11 w-11 rounded-full'
                    />
                    <div className='flex flex-col'>
                        <p className='body-bold'>
                            {user.name}
                        </p>
                        <p className='small-regular text-lighnt-3'>
                            @{user.username}
                        </p>
                    </div>
                </div>
                <ul className='flex flex-col gap-6'>
                    {sidebarLinks.map((link: INavLink) => {
                         const isActive=pathname==link.route;
                        return (
                            <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>

                                <NavLink
                                    to={link.route}
                                    className='flex gap-4 items-center p-2'
                                >
                                    <img 
                                       src={link.imgURL}
                                       alt={link.label}
                                       className={`group-hover:invert-white ${isActive && 'invert-white'}` }                                    />
                                    {link.label}

                                </NavLink>
                            </li>
                        )
                    })}

                </ul>

            </div>
            <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={(e)=>handleSignOut(e)}>
            <img src="/public/assets/icons/logout.svg" alt="logout" />
            <p  className='small-medium'>Logout</p>
          </Button>
        </nav>
    )
}

export default LeftSideBar
