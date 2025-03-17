import styled from "styled-components";

export const Container = styled.div`
  max-width: 50%;
  margin: auto;
  text-align: center;

  /* Make it responsive */
  @media (max-width: 600px) {
    max-width: 95%;
    padding: 5px;
  }
`;

export const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 10px;
  min-height: 80vh;
  max-height: 80vh;
  overflow-y: auto;
  white-space: pre-wrap;
  scroll-behavior: smooth;
`;

export const Input = styled.input`
  width: 80%;
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ccc;
`;

export const Button = styled.button`
  padding: 8px;
  margin-left: 5px;
  cursor: pointer;
  background-color: #007bff; /* Blue background */
  color: white; /* White text */
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
`;

export const Speaker = styled.div`
  ${({ role }) => role === "user" && `color: blue;`}
  ${({ role }) => role === "assistant" && `color: green;`}
  margin-bottom: 8px;
  padding: 5px;

  strong {
    font-weight: bold;
  }

  p {
    margin: 0;
  }

  ul {
    padding-left: 20px;
  }

  pre {
    background: #f4f4f4;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
  }

  code {
    background: #f4f4f4;
    padding: 2px 5px;
    border-radius: 3px;
  }
`;
