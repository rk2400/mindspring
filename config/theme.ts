import { mindspringTheme } from './themes/mindspring';

export type ThemeName = 'mindspring';

const defaultTheme: ThemeName = 'mindspring';

const envTheme = (process.env.NEXT_PUBLIC_THEME as ThemeName | undefined) ?? defaultTheme;

export const selectedThemeName: ThemeName = envTheme;

export const theme = mindspringTheme;
