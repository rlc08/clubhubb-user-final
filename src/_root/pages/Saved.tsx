import { useEffect, useState } from "react";
import { useGetClubListMutation } from "../../store/api/clubApi";
import { Link } from "react-router-dom";
type clubLogo = {
    secureUrl: string;
};

type club = {
    _id: string;
    clubName: string;
    clubUsername: string;
    clubLogo: clubLogo;
};

const ClubCard: React.FC<{ club: club }> = ({ club }) => {
    return (
        <>
            <Link to={`/club/${club._id}`} className="card_ bg-dark-4">
                <div className="card_section ">
                    <img
                        src={
                            club?.clubLogo?.secureUrl
                                ? club?.clubLogo?.secureUrl
                                : "data:image/png;base64,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"
                        }
                        alt={`${club.clubName} Logo`}
                        className="card_image"
                    />
                </div>
                <div className="card_section">
                    <h3 className="card_title h3-bold ">{club.clubName}</h3>
                    <p className="card_body">{club.clubUsername}</p>
                    {/* Add more details as needed */}
                </div>
            </Link>
        </>
    );
};

const Saved = () => {
    const [getClubList] = useGetClubListMutation();
    const [clubs, setClubs] = useState<club[]>([]);

    useEffect(() => {
        const fetchClubList = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found");
            }
            const session = await getClubList({ token });
            // Handle the result as needed
            if ("data" in session) {
                console.log(session);
                const updatedPosts = session.data.map((club: club) => ({
                    _id: club._id,
                    clubName: club.clubName,
                    clubLogo: club.clubLogo,
                }));
                setClubs(updatedPosts);
                console.log(clubs);
            }
        };

        fetchClubList();
    }, []);

    return (
        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    <h2 className="h3-bold md:h2-bold text-left w-full">
                        Clubs
                    </h2>

                    <ul className="flex flex-col flex-1 gap-9 w-full ">
                        {clubs?.map((club) => (
                            <ClubCard key={club._id} club={club} xs:m-5 />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Saved;
