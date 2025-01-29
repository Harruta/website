import { StackVertical } from "@/components/layout/layout-stack/layout-stack"
import Text from "@/components/ui/text/text"
import TextHeading from "@/components/ui/text/text-heading"
import { DynamicBreadcrumb } from "@/app/components/ui/primitives/breadcrumb"
import { ThemeToggle } from "@/components/ui/theme/theme-toggle" 

export function ReferenceHeader() {
    return (
        <StackVertical gap="md">
            <title>Notes | sumit.ml</title>

            <div className="flex items-center justify-between">
                <DynamicBreadcrumb 
                    items={[
                        { href: '/', label: 'Home' },
                        { label: 'Notes' }
                    ]}
                />
                <ThemeToggle />
            </div>

            <div>
                <TextHeading as="h1" weight="bold">
                    Notes
                </TextHeading>
                <Text variant="muted" size="sm">
                    A place where I dump all my knowlege.
                </Text>
            </div>
        </StackVertical>
    )
} 