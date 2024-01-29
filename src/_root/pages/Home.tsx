import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/Postcard"
import { useGetEventsMutation } from "@/store/api/eventApi";
import { useEffect } from "react";

type eventPoster={
  publicId:string;
  secureUrl:string;
}
type Timings={
  startTime:string,
  endTime:string
}
type Document={
  eventName:string;
  timings:Timings;
  _id:string;
  eventPoster:eventPoster;
}
const Home =  () => {

  const [getEvents,{data:events} ] = useGetEventsMutation();

  const fetchData = async () => {
    try {
      // Call the mutate function to trigger the mutation
      const token=localStorage.getItem('token');
      if (!token) {
        throw new Error("Token not found");
    }
      const events = await getEvents({token});
      if ('data' in events) {
        console.log(events.data); // Access the data property
      }
      else{
        alert('Error while loading Events')
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const isEventLoading=true;
  
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">
                Events
          </h2>
          {isEventLoading && !events?(
            <Loader/>

          ):(
            <ul className="flex flex-col flex-1 gap-9 w-full">
            
            {events?.map((event: Document) => (
               <PostCard key={event._id}  post={event} />
              ))}

            </ul>
          )}
        </div>
      </div>
      
    </div>
   )
}

export default Home
