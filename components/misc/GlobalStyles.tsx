import { createGlobalStyle, css } from 'styled-components'

export const GlobalStyles = createGlobalStyle<{transitionThemeColor: boolean, backgroundColor: string}>`
    :root {
        --theme-color: ${({backgroundColor}) => backgroundColor};
        --text-color: #fff;
        --reverse-text-color: #000;
        --text-dark-color: #ccc;
        --warning-color: #ffd600;
    }

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        border: 0;
    }

    body {
        background-color: var(--theme-color);
        color: var(--text-color);
        font-family: 'Inter', 'Roboto', sans-serif;

        ${({transitionThemeColor}) => transitionThemeColor && css`
            transition: background-color .2s;
        `}
    }

    @media only screen and (min-width: 800px) {
        html {
            font-size: 120%;
        }
    }

    html, body, #__next {
        height: 100%;
        overflow-x: clip;
    }
`
