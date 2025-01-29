import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'My Notes | code by haru',
    description: 'My knowlege dump',
    openGraph: {
        title: 'My Notes | code by haru',
        description: 'A place where i dump all my knowlege to quick reference',
        type: 'website',
    }
}

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
} 