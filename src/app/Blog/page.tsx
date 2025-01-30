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
                                { label: "Blog" }
                            ]}
                        />
                        <ThemeToggle />
                    </div>

                    <div>
                        <TextHeading as="h1" weight="bold">
                            Blog
                        </TextHeading>
                        <Text variant="muted" className="mb-8">
                           All my Yapping in here.
                        </Text>
                    </div>

                   
                </StackVertical>
            </BaseContainer>
            <SectionFooter color="purple" showToTop={false} />
        </>
    )
}