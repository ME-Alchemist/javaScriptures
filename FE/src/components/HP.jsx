import styled from "styled-components";

const HP = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #e8d9af94;
  border-radius: 15px;
  padding: 10px;
`;

const HitPoints = () => {
  return (
    <>
      <HP className="flex-md-row align-items-center justify-content-center gap-1">
        <h2>HP: </h2>
        <img
          className="hp"
          src={`/images/decorations/heartDeco.webp`}
          alt=""
          style={{ width: "30px", height: "30px" }}
        />
        <img
          className="hp"
          src={`/images/decorations/heartDeco.webp`}
          alt=""
          style={{ width: "30px", height: "30px" }}
        />
        <img
          className="hp"
          src={`/images/decorations/heartDeco.webp`}
          alt=""
          style={{ width: "30px", height: "30px" }}
        />
      </HP>
    </>
  );
};

export default HitPoints;
