
  import { useUserContext } from '@/context/useUserContext';
import { Outlet, Navigate } from 'react-router-dom';
 
const AuthLayout = () => {
    const {isAuthenticated}=useUserContext();
    console.log(isAuthenticated)
    
    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <>
                    <section className='flex flex-1 justify-center items-center flex-col py-10'>
                        <Outlet />
                    </section>
                    <div className='flex items-center justify-center'>
                        <img
                            src="/assets/images/side-image.png"
                            alt="image"
                            className="hidden xl:block w-[80%]"
                        />
                    </div>
                </>
            )}
        </>
    );
}

export default AuthLayout;