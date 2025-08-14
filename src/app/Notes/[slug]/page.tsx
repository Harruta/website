import { notFound } from 'next/navigation'
import { notes } from '../_data/posts'

type Params = Promise<{ slug: string }>

// Generate static params for all reference pages
export async function generateStaticParams() {
    return notes.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: { params: Params }) {
    const { slug } = await params
  
    return {
      title: `${notes.find(post => post.slug === slug)?.title} | sumit.ml`,
      openGraph: {
        title: `${notes.find(post => post.slug === slug)?.title} | sumit.ml`,
        description: `${notes.find(post => post.slug === slug)?.description}`,
        images: [
          {
            url: `/references/posts/${slug}/opengraph-image.png`,
            width: 1200,
            height: 630,
            alt: `${notes.find(post => post.slug === slug)?.description}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${notes.find(post => post.slug === slug)?.title} | sumit.ml`,
        description: `${notes.find(post => post.slug === slug)?.description}`,
        images: [
          {
            url: `/references/posts/${slug}/twitter-image.png`,
            width: 1200,
            height: 630,
            alt: `${notes.find(post => post.slug === slug)?.description}`,
          },
        ],
      },
    };
  }
  

export default async function Reference({ 
    params 
}: { 
    params: Params 
}) {
    const { slug } = await params
    
    // Find the matching blog post
    const post = notes.find(post => post.slug === slug)
    
    // If no matching post is found, return 404
    if (!post) {
        notFound()
    }

    // Try to import the actual blog post component, fallback to placeholder
    try {
        const PostComponent = (await import(`../${slug}/page`)).default
        return <PostComponent />
    } catch {
        // If the specific note page doesn't exist, show a placeholder
        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <p className="text-muted-foreground mb-4">{post.description}</p>
                <p className="text-sm text-muted-foreground mb-8">Last updated: {post.lastUpdated}</p>
                
                <div className="bg-muted/50 border border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                    <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
                    <p className="text-muted-foreground">This note section is currently under construction.</p>
                    <p className="text-muted-foreground mt-2">Check back later for detailed content!</p>
                </div>
            </div>
        )
    }
}