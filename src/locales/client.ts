'use client'

import { createI18nClient } from 'next-international/client'

export const { useI18n, useScopedI18n, I18nProviderClient, useChangeLocale, useCurrentLocale } = createI18nClient({
    en: () => import('./translations/en-US'),
    zh: () => import('./translations/zh-CN'),
    tc: () => import('./translations/zh-HK'),
})
