export { useI18n, useScopedI18n, useChangeLocale, useCurrentLocale } from './client'
import { enUS, zhCN, zhHK } from "date-fns/locale"

export const LANGUAGES = ['en', 'tc', 'sc'] as const;

export type Language = (typeof LANGUAGES)[number];

export const LANGUAGE_LOCALE = {
    en: enUS,
    tc: zhHK,
    sc: zhCN,
} as const;
