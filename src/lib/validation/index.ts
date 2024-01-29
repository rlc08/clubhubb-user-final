import * as z from "zod";


export const SignupValidationSchema= z.object({
    name:z.string().min(2,{message:'Too short'}),
    username: z.string().min(2,{message:'Too short'}),
    email:z.string().email(),
    collegeName:z.string(),
     phoneNumber: z.string().refine(value => value.length === 10, {
      message: 'Phone number must be 10 digits long',
    }),
    password:z.string().min(8,{message:"Password must be at least 8 charecters "}),
 

  })

  
export const SigninValidationSchema= z.object({
   
  emailOrUsername:z.string().email(),
  password:z.string().min(8,{message:"Password must be at least 8 charecters "})

})
export const forgotpasswordValidationSchema= z.object({
   
  clubEmail:z.string().email(),
 
})

export const RegisterValidationSchema= z.object({
   
  email:z.string().email(),
  name:z.string()

})


  
