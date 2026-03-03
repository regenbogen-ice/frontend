import type { CSSProp } from 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
        themeColor: string;
        changeThemeColor: (newThemeColor: string) => void;
    }
}

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface DOMAttributes<T> {
        css?: CSSProp;
    }
}
