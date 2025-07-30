import styled from "styled-components";

const StyledSection = styled.section`
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    align-items: center !important;
    flex-direction: row !important;
    max-height: 600px;
    overflow-y: auto;
    font-size: 1.1rem;

    & article {
        color: white;
        text-shadow: 2px 4px 3px black;
        margin: 5px;
        border: 2px solid black;
        border-radius: 15px;
        border-style: inset;
        padding: 5px;
        height: 300px;
        width: 300px;
        overflow-y: auto;
    }
`;

const Credits = () => {
    return (
        <>
        <h1>Credits</h1>
        
        <StyledSection className="">
                <article className="bg-dark bg-opacity-50">
                    <h2>Tools</h2>
                    <hr />
                    <ul>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>React</li>
                        <li>Bootstrap</li>
                        <li>Aiven</li>
                        <li>MySQL</li>
                        <li>Visual Studio Code</li>
                        <li>Express</li>
                        <li>React Router</li>
                        <li>React Context</li>
                        <li>Zustand</li>
                        <li>AOS</li>
                        <li>styled-components</li>
                        <li>DnD Kit</li>
                    </ul>
                </article>

                <article className="bg-dark bg-opacity-50" >
                    <h2>Resources</h2>
                    <hr />
                    <ul>
                        <li>W3Schools</li>
                        <li>MDN</li>
                        <li>Pixabay</li>
                        <li>Stack Overflow</li>
                        <li>YouTube</li>
                        <li>GitHub</li>
                        <li>Google</li>
                        <li>SORA AI</li>
                    </ul>
                </article>

                <article className="bg-dark bg-opacity-50">
                    <h2>Sounds</h2>
                    <hr />
                    <ul>
                        <li>Freesound.org for its sound effects and music</li>
                        <li>Artist name and sound name #1</li>
                        <li>Artist name and sound name #2</li>
                        <li>Artist name and sound name #3</li>
                        <li>Artist name and sound name #4</li>
                        <li>Artist name and sound name #5</li>
                        <li>Artist name and sound name #6</li>
                    </ul>
                </article>

                <article className="bg-dark bg-opacity-50">
                    <h2>Special Thanks</h2>
                    <hr />
                    <ul>
                        <li>IT Hogskolan Gothenburg / Higher Vocational Education of Gothenburg</li>
                        <li>The teachers</li>
                        <li>School colleagues</li>
                        <li>Resource Point AB for giving me the chance to work with them and web development in a working environment</li>
                        <li>My family and friends</li>
                    </ul>
                </article>
            
        </StyledSection>
        </>

    )

};

export default Credits;