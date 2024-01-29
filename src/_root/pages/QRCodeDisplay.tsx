import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useUserContext } from "@/context/useUserContext";


const QRCodeDisplay = ({ eventId }: { eventId: string }) => {
    const { user } = useUserContext();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  

    
const selectedEvent = user.eventsRegistered.find(
    (eventItem) => eventItem.eventId === eventId
);

    if (!selectedEvent) {
        return null; // Return null or another appropriate ``value
    }

    const qrCodeImageUrl = selectedEvent.qrCode;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const centerPosition = {
        top: screenHeight / 2,
        left: screenWidth / 2,
    };

    return (
        <div>
            <Button
                variant="contained"
                className="shad-button_primary"
                aria-describedby={id}
                onClick={handleClick}
                sx={{ marginTop: 0.5 }}
            >
                Show QR
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={centerPosition} // Adjust the position based on screen dimensions
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
            >
                <div
                    style={{
                        backgroundColor: "black",
                        color: "white",
                        padding: 16,
                    }}
                >
                    <Typography variant="h6">QR Code for Event</Typography>
                    <img src={qrCodeImageUrl} alt="QR Code" />
                </div>
            </Popover>
        </div>
    );
};

export default QRCodeDisplay;
