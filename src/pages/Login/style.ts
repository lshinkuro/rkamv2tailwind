import styled from "styled-components";



export const Container = styled.div.attrs(
    {
        className:"flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900"
    }
)``;

export const SubContainer = styled.div.attrs(
    {
        className:"flex-1 h-full max-w-4xl mx-auto overflow-hidden  dark:bg-gray-800"
    }
)``;

export const TextHeader = styled.h1.attrs(
    {
        className:"mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
    }
)``;

export const MainDiv = styled.div.attrs(
    {
        className:"flex flex-col overflow-y-auto md:flex-row"
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