import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root {
        --inter: 'Inter', sans-serif;
        --corBotao: #3B97D9;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    ::-webkit-scrollbar{
        width: 10px;
        background-color: #2B2B36;
        border-radius: 6px;
        border-bottom-right-radius: 5px;
    } 

    ::-webkit-scrollbar-thumb{
        background-color: #40404F;
        border-radius: 6px;
        border: 1px solid #2B2B36;
    }

    body {
        font-family: var(--inter);
        background-color: var(--preto);
        color: var(--branco);
    }

    header {
        position: fixed;
        top: 0;
        background-color: #191A23;
        height: 100vh;
        box-shadow: 0 30px 60px rgb(0, 0, 0, 0.3);
        min-width: 60px;
        z-index: 5;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active{
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: var(--branco) !important;
    }
`;
