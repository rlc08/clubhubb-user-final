import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Define keyframes for animation
const missionHoverAnimation = keyframes`
  0%, 100% {
    font-size: 4rem;
    color: white;
  }
  50% {
    color: #bffcff;
    letter-spacing: 5px;
    text-shadow: 0px 0px 30px rgba(191, 252, 255, 1);
  }
`;

// Styled components

const MainContainer = styled.div`
    position: absolute;
    width: 80%;
    height: 50%;
    top: 100; /* Adjust as needed */
    right: 100; /* Adjust as needed */
    background: rgba(0, 0, 0, 1);
    z-index: 1;
    pointer-events: auto;
`;

const ContentContainer = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    min-height: 24px;
    height: 100%;
    position: relative;
    text-align: center;
    top: 33%;
`;

const Title = styled.div`
    color: white;
    font-family: "Quicksand", sans-serif;
    font-size: 4rem;
    text-transform: uppercase;
    padding-bottom: 0px;
    margin-bottom: 0px;

    span {
        font-size: 4rem;
        cursor: pointer;
    }

    &:hover {
        animation: ${missionHoverAnimation} 1.5s infinite;
        animation-direction: alternate;
        animation-timing-function: ease;
    }
`;

const StyledParagraph = styled.p`
    color: #e6dbae;
    font-family: "Quicksand", sans-serif;
    font-size: 1.5rem;
    margin: 0 auto;
    padding: 0;
    letter-spacing: 0.5rem;
    text-transform: uppercase;

    &:last-child {
        font-size: 0.75rem;
        font-weight: 700;
        margin: 3em auto;
        padding: 0;
        letter-spacing: 0.1rem;

        > a {
            text-decoration: none;
            color: inherit;
            transition: all 0.2s ease-in;

            &:hover {
                color: #fff;
            }
        }
    }
`;

const Explore = () => {
    const setHeights = () => {
        const windowHeight = window.innerHeight;
        const slideElements = document.querySelectorAll(".slide");

        slideElements.forEach((slideElement) => {
            (slideElement as HTMLElement).style.height = `${windowHeight}px`;
        });
    };

    const addSticky = () => {
        const slideElements = document.querySelectorAll(".slide");

        slideElements.forEach((slideElement) => {
            const scrollerAnchor = (slideElement as HTMLElement).offsetTop;
            if (window.scrollY >= scrollerAnchor) {
                (slideElement as HTMLElement).classList.add("fix-it");
            } else {
                (slideElement as HTMLElement).classList.remove("fix-it");
            }
        });
    };

    useEffect(() => {
        setHeights();
        window.addEventListener("resize", setHeights);

        return () => {
            window.removeEventListener("resize", setHeights);
        };
    }, []);

    useEffect(() => {
        addSticky();
        window.addEventListener("scroll", addSticky);

        return () => {
            window.removeEventListener("scroll", addSticky);
        };
    }, []);

    return (
        <>
            <MainContainer>
                <ContentContainer>
                    <Title>
                        <span>EXPLORE</span>
                    </Title>
                    <StyledParagraph>COMING SOON!</StyledParagraph>
                    <StyledParagraph>
                        OUR SITE IS CURRENTLY ON MAINTENANCE.
                        <br />
                        <br />
                        WE'LL BE BACK WITH OUR NEW DESIGNED WEBSITE SOON!
                    </StyledParagraph>
                </ContentContainer>
            </MainContainer>
        </>
    );
};

export default Explore;
