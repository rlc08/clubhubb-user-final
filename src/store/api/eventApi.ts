// Need to use the React-specific entry point to import createApi
import { createApi} from '@reduxjs/toolkit/query/react'
 
import { baseQuery } from './baseQuery';

// Define a service using a base URL and expected endpoints
export const eventApi = createApi({
  reducerPath: 'postApi',
  baseQuery,
  endpoints: (builder) => ({
        GetEvents:builder.mutation({
            query:(body:{token:string})=>{
                 return{
                    url:'/api/v1/event/event-list',
                    method:"get",
                    headers:{
                        Authorization:`${body.token}`
                    }
                }
            }
        }),
        GetEventByIds:builder.mutation({
            query:(body:{token: string})=>{
                 return{
                    url:`/api/v1/event/registerd/events`,
                    method:"post",
                    headers:{
                        Authorization:`${body.token}`
                    }

                }
            }

        }),
        GetEventById:builder.mutation({

            query:(body:{eventId: string})=>{
                const token=localStorage.getItem('token')
                 return{
                    url:`/api/v1/event/${body.eventId}`,
                    method:"get",
                    headers:{
                        Authorization:`${token}`
                    }

                }
            }

        }),
        RegisterEvent: builder.mutation({
            query: (body: { eventId: string; additionalInfo: Record<string, string> }) => {
              const token = localStorage.getItem("token");
              console.log(body.additionalInfo)
          
              return {
                url: `/api/v1/event/${body.eventId}`,  // Use a generic endpoint without eventId in the URL
                method: "put",
                headers: {
                  Authorization: `${token}`,
                },
                body,
              };
            },
          }),
          
    }),


})

  export const { useGetEventsMutation, useGetEventByIdsMutation ,useRegisterEventMutation, useGetEventByIdMutation
 } = eventApi


 