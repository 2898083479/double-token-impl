'use client'

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, useChangeLocale, useCurrentLocale, useScopedI18n } from "@/locales";
import { GrLanguage } from "react-icons/gr";


export const ToggleLanguage = () => {
    const t = useScopedI18n("config.language");
    const changeLanguage = useChangeLocale({
        preserveSearchParams: true,
    });
    const language = useCurrentLocale();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className="size-5 min-w-5 min-h-5 text-[20px]"
            >
                <GrLanguage />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                    LANGUAGES.map((lang, index) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={index}
                                checked={language === lang}
                                onClick={() => changeLanguage(lang as any)}
                            >
                                {t(lang as any)}
                            </DropdownMenuCheckboxItem>
                        )
                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )

}