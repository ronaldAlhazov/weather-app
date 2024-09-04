import styled from "styled-components";

export const MainWrapper = styled.div`
  background: linear-gradient(to right, #c7c7eb, #ccf2dd);
  display: flex; /* Use flex to align children */
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center children horizontally */
  padding: 1rem; /* Optional: padding for spacing */
  .container {
    margin-top: 40px;

    background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white */
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    color: rgba(0, 0, 0, 0.8);
    background-blend-mode: overlay;
    display: flex; /* Make it a flex container */
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%; /* Full width of the parent */
    max-width: 600px; /* Optional: set a max width for the container */
    position: relative;
  }
  .searchArea {
    margin-top: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    position: relative;
  }

  .searchArea > input {
    outline: none;
    border: none;
    border: 2px solid grey;
    padding: 8px;
    border-radius: 20px;
    text-align: center;
    width: 80%;
    background: transparent;
    font-size: 1.5rem;
  }
  .searchArea > ul {
    position: absolute; /* Position it relative to the parent */
    top: calc(100% + 1px); /* Place the dropdown just below the input */
    left: 0; /* Align the dropdown with the input */
    width: 100%; /* Same width as the input */
    background-color: white; /* Set a background color */
    border-radius: 0 0 12px 12px; /* Rounded bottom corners */
    list-style: none; /* Remove default list styling */
    padding: 0; /* Remove default padding */
    margin: 0; /* Remove default margin */
    max-height: 200px; /* Optional: max height with scroll */
    overflow-y: auto; /* Scroll if items overflow */
    z-index: 1000; /* Ensure it's above other content */
  }

  .searchArea > ul > li {
    padding: 8px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .searchArea > ul > li:hover {
    background-color: #f0f0f0; /* Hover effect */
  }

  .searchIcon {
    color: Black;
    margin-left: 10px; /* Space between input and icon */
    cursor: pointer; /* Change cursor to pointer to indicate clickability */
    font-size: 2em; /* Size of the icon */
    transition: color 0.3s, transform 0.3s; /* Smooth transition */
  }

  .searchIcon:hover {
    color: #ff4500; /* Color on hover */
    transform: scale(1.1); /* Slightly enlarge the icon on hover */
  }

  .weatherArea {
    display: flex;
    align-items: center;
    flex-direction: column;

    > .icon {
      font-size: 7rem;
    }

    > h1 {
      font-size: 3rem;
      font-family: "Bebas Neue", sans-serif;
      margin-bottom: 5px;
      margin-top: 20px;
    }

    > span {
      margin-bottom: 30px;
      font-size: 2rem;
      font-family: "Inter", sans-serif;
    }

    > h2 {
      font-size: 1rem;
      font-family: "Inter", sans-serif;
      margin-top: 5px; /* Reduce space above h2 */
    }
    > p {
      font-size: 1.5rem;
      font-family: "Inter", sans-serif;
      margin-top: 20px;
      text-align: center;
    }
  }

  .bottomInfoArea {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-family: "Josefin Sans", sans-serif;
    margin: 10px;
    background: linear-gradient(
      90deg,
      rgba(243, 255, 253, 1) 0%,
      rgba(253, 255, 232, 1) 100%
    );
    border-radius: 12px;
    padding: 10px;
  }
  .humidityLevel,
  .wind {
    display: flex;
    align-items: center;
    margin: 0 40px;

    > .humidIcon {
      font-size: 3rem;
    }
  }

  .windIcon {
    font-size: 3rem;
    margin-right: 3px;
  }
  .humidInfo {
    display: flex;
    flex-direction: column; /* Stack items vertically */
    align-items: center; /* Center items horizontally */
    margin: 0 10px;
  }
  .humidInfo h1 {
    margin: 2px 0; /* Reduce the space around the heading */
    font-size: 1.5rem; /* Adjust font size as needed */
  }

  .humidInfo p {
    margin: 0; /* Remove margin to reduce space below the heading */
    font-size: 1rem; /* Adjust font size as needed */
  }
`;
