import styled from "styled-components";

export const HeaderWrapper = styled.header`
  background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white */
  color: Black;
  padding: 10px 20px;
  text-align: center;
  font-size: 2em;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  margin: 0 auto;
  border-radius: 8px;
`;

export const AppName = styled.h1`
  margin: 0;
  font-family: "Arial", sans-serif;
  margin-right: 8px; /* Adjusted spacing between the icon and text */
  font-size: 1.2em; /* Reduced font size */
`;

export const AppIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;
