import styled from "styled-components";



export const Main = styled.div.attrs(
    {
        className: "m-5 p-5 bg-white shadow-md rounded"
    }
)``;


export const HeadTable = styled.div.attrs(
    {
        className: "flex flex-row justify-end my-3"
    }
)``;


export const LogButton = styled.div.attrs({
    className: "bg-blue-500 p-3  text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center"

})``;

export const CustomStyles = {
    rows: {
        style: {
            minHeight: "45px", // override the row height
        },
    },
    headCells: {
        style: {
            backgroundColor: "#1b6fbb",
            textTransform: "uppercase",
            color: "white",
        },
    },
};