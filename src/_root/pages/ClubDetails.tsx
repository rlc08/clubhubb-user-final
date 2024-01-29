import { useGetSingleClubMutation } from "@/store/api/clubApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Club = {
    clubName: string;
    clubUsername: string;
    clubEmail: string;
    clubTitle: string;
    description: string;
    phoneNumber: string;
};

const ClubDetails = () => {
    const [getClubDetails] = useGetSingleClubMutation(); // Use camelCase for function names
    const { clubId } = useParams();
    const [club, setClub] = useState<Club | null>(null); // Use null instead of undefined

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Error: Token not found"); // Use console.error for errors
            } else {
                if (clubId) {
                    const clubDetails = await getClubDetails({ clubId }); // Use camelCase for variable names
                    if ("data" in clubDetails) {
                        const details: Club = {
                            clubName: clubDetails.data.clubName,
                            clubUsername: clubDetails.data.clubUsername, // Fix typo in property name
                            clubEmail: clubDetails.data.clubEmail,
                            clubTitle: clubDetails.data.clubTitle,
                            description: clubDetails.data.description,
                            phoneNumber: clubDetails.data.phoneNumber,
                        };
                        setClub(details);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching club details:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="profile-container">
            <div className="profile-inner_container">
                <div className="flex items-center flex-col max-xl:items-center flex-1 ">
                    <div className="flex flex-row gap-3">
                        <img
                            src={"/public/assets/images/profile.png"}
                            alt="profile"
                            className="w-28 h-28 lg:h-36 lg:w-36 rounded-2xl"
                        />
                        <div className="flex flex-col w-full p-4">
                            <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                                {club?.clubName}
                            </h1>
                            <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                                @{club?.clubUsername}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 justify-between md:mt-2 ">
                        <div className="details-card mt-7 max-w-screen-sm">
                            <div className="details-label">Email </div>
                            <div className="details-info">
                                {club?.clubEmail}
                            </div>

                            <div className="details-label">Title </div>
                            <div className="details-info">
                                {club?.clubTitle}
                            </div>

                            <div className="details-label">Description </div>
                            <div className="details-info">
                                {club?.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClubDetails;
