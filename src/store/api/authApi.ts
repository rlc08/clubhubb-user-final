// Need to use the React-specific entry point to import createApi
import { createApi} from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery';


// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery ,
  endpoints: (builder) => ({
        signinUser:builder.mutation({
            query:(body:{emailOrUsername:string; password:string})=>{
                return {
                    url:"/api/v1/user-auth/signin",
                    method:"post",
                    body,
                }
            }
        }),
        signupUser:builder.mutation({
            query:( body:{name:string; username:string;email:string;collegeName:string;phoneNumber:string;password:string})=>{

                return {
                    url:"/api/v1/user-auth/signup",
                    method:"post",
                    body
                    
                }
            }
        }),
        forgotpassword:builder.mutation({
            query:(body:{clubEmail:string})=>{
                return{
                    url:'api/v1/admin-auth/forgot-password',
                    method:"post",
                    body

                }
            }

        }),
        verifyuser: builder.mutation({
            query: (body:{token:string}) => ({
              url: 'api/v1/user-auth/protected',
              method: 'get',
              headers: {
                Authorization: `${body.token}`,
              },
            }),
          }),  
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {  useSigninUserMutation, useSignupUserMutation, useForgotpasswordMutation, useVerifyuserMutation
 } = authApi