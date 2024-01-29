import  { z } from "zod";
 import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
 import {
    Form,
    FormControl,
     FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotpasswordValidationSchema} from "@/lib/validation"
import Loader from "@/components/shared/Loader";
import { useForgotpasswordMutation } from "@/store/api/authApi";
import { Link } from "react-router-dom";
 


const ForgotPasswordForm = () => {
  const[forgotpassword ,{data,isLoading}]=useForgotpasswordMutation();
  console.log(data)
  
  const form = useForm<z.infer<typeof forgotpasswordValidationSchema>>({
      resolver: zodResolver(forgotpasswordValidationSchema ),
      defaultValues: {
        
        clubEmail:""
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof forgotpasswordValidationSchema>) {
        console.log(values);
       const ResetCode=await  forgotpassword({...values});
       console.log(ResetCode)
    }
  return (
    <Form {...form}>
    <div className="sm:w-420 flex-center flex-col" >
{/*        <img src="/public/assets/images/logo.svg" width={300}  alt="ClubHubb" />*/}
<h1 className="font-bold text-2xl md:text-4xl">Clubhubb</h1>
        
    <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
        Forgot Password
     </h2>
    
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-full mt-4">
       
 
      <FormField
        control={form.control}
        name="clubEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Enter email to RESET</FormLabel>
            <FormControl>
              <Input type="text" className="shad-input" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="shad-button_primary">
          {isLoading?(
            <div className="flex-center gap-2">
                <Loader/> Loading...
             </div>
          ):"Send email"}
      </Button>
      <p className="text-small-regular text-light-2 text-center mt-2">
          
           <Link
             to="/sign-in"
             className="text-primary-500 text-small-semibold ml-1">
             Log in
           </Link>
          
         </p>
   
    </form>

</div>
</Form>
  )
}

export default ForgotPasswordForm;
