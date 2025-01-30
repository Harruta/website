'use client'

import { StackVertical } from "@/components/layout/layout-stack/layout-stack";
import BaseContainer from "@/components/layout/container/base-container";
import { DynamicBreadcrumb } from "../components/ui/primitives/breadcrumb";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import TextHeading from "@/components/ui/text/text-heading";
import Text from "@/components/ui/text/text";
import { SectionFooter } from "@/components/layout/footer/SectionFooter";

export default function Projects() {
    return (
        <>
            <BaseContainer size="md" paddingX="md" paddingY="lg">
                <StackVertical gap="md">
                    <div className="flex items-center justify-between">
                        <DynamicBreadcrumb
                            items={[
                                { href: "/", label: "Home" },
                                { label: "Projects" }
                            ]}
                        />
                        <ThemeToggle />
                    </div>

                    <div>
                        <TextHeading as="h1" weight="bold">
                            Projects
                        </TextHeading>
                        <Text variant="muted" className="mb-8">
                            Most of my personal projects will revolve around Security/Privacy, Productivity and learning languages.
                        </Text>
                    </div>

                   
                </StackVertical>
            </BaseContainer>
            <SectionFooter color="purple" showToTop={false} />
        </>
    )
}