import RegisterEvent from "@/components/shared/RegisterEvent";
import { useGetEventByIdMutation } from "@/store/api/eventApi";
import Loader from "@/components/shared/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QRCodeDisplay from "./QRCodeDisplay";

type Timings = {
    startTime: string;
    endTime: string;
};

type Post = {
    imageUrl: string;
    eventName: string;
    eventDescription: string;
    timings: Timings;
    cheifGuests: string[];
    amount: number;
    requiredInfoOfStudent:string[];
    
};

type DateTimeFormatOptions = {
    weekday?: "short" | "long" | "narrow";
    day?: "numeric" | "2-digit";
    month?: "short" | "long" | "numeric" | "2-digit";
    hour?: "numeric" | "2-digit";
    minute?: "numeric" | "2-digit";
    hour12?: boolean;
};

const PostDetails = () => {
    const [GetEventById] = useGetEventByIdMutation();
    const [posts, setPosts] = useState<Post>();

    const { eventId } = useParams();

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("Error: Token not found");
            } else {
                if (eventId) {
                    const events = await GetEventById({ eventId });
                    if ("data" in events) {
                        const updatedPosts = {
                            imageUrl: events.data.eventPoster.secureUrl,
                            eventName: events.data.eventName,
                            timings: events.data.timings,
                            eventDescription: events.data.eventDescription,
                            cheifGuests: [events.data.cheifGuests],
                            amount: events.data.amount,
                            requiredInfoOfStudent: events.data.requiredInfoOfStudent
                        };
                        setPosts(updatedPosts);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const formatDateTime = (dateTimeString?: string) => {
        if (!dateTimeString) {
            return ""; // or some default value if needed
        }
        const options: DateTimeFormatOptions = {
            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };

        const dateTime = new Date(dateTimeString);
        const formattedDateTime = new Intl.DateTimeFormat(
            "en-US",
            options
        ).format(dateTime);

        return formattedDateTime;
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {eventId && posts?.imageUrl ? (
                <div className="flex flex-col md:flex-row m-10">
                    <div className="md:w-8/12">
                        <img
                            className="rounded-2xl"
                            src={posts?.imageUrl}
                            alt="Event Poster"
                            style={{ maxWidth: "100%", height: "auto" }}
                        />
                    </div>
                    <div className="md:flex flex-col md:m-5 md:w-8/12">
                        <div className="flex flex-row  gap-7">
                            <div className="m-2">
                                <h1
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "24px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    {posts?.eventName}
                                </h1>
                            </div>
                            <div className="m-3">
                                <RegisterEvent eventId={eventId} amount={posts.amount} requiredInfoOfStudent={posts.requiredInfoOfStudent} />
                                <QRCodeDisplay eventId={eventId}/>
                            </div>
                        </div>
                        <div>
                            <p>
                                <b>Start Time :</b>{" "}
                                {formatDateTime(posts?.timings.startTime)}
                            </p>
                            <p>
                                <b>End Time :</b>{" "}
                                {formatDateTime(posts?.timings.endTime)}
                            </p>
                        </div>
                        <div>
                            <h3
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    margin: "10px 0",
                                }}
                            >
                                Description
                            </h3>
                            <p>{posts?.eventDescription}</p>
                        </div>
                        <div className="m-b-10">
                        <h3
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    margin: "10px 0",
                                }}
                            >
                                Amount
                            </h3>
                            <p>{posts?.amount}</p>
                             
                        </div>
                    </div>
                    <div
                        className="m-5 p-6 bottom-0 md:hidden "
                        style={{ color: "black" }}
                    >
                        <p>bottom bar</p>
                    </div>
                </div>
            ) : (
                <div>
                    <Loader />
                </div>
            )}
        </>
    );
};

export default PostDetails;
