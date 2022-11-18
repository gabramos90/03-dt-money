import "styled-components"
import { defaultTheme } from "../styles/themes/default"

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
    declare interface DefaultTheme extends ThemeType {}
}