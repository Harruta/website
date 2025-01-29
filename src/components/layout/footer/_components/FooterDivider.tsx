import { cn } from "@/lib/utils";

interface FooterDividerProps {
    vertical?: boolean;
}

export function FooterDivider({vertical = true }: FooterDividerProps) {
    return (
        <div 
            className={cn(
                vertical ? "h-4 sm:h-4.5 w-[1.5px]" : "h-[1.5px] w-4 sm:w-4.5",
                "mx-3 sm:mx-4",
                "bg-purple-400/40 dark:bg-purple-300/40"
            )} 
        />
    )
} 