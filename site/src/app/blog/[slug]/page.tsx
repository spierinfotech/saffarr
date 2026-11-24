import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { site, whatsappLink } from "@/content/site";
import { JsonLd } from "@/lib/schema";
import { ReadingProgress, ShareButtons } from "@/components/PostTools";
import { Chapter } from "@/components/Chapter";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      images: [{ url: post.cover, alt: post.coverAlt }],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 2);
  const url = `${site.domain}/blog/${post.slug}/`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.summary,
            abstract: post.summary,
            image: `${site.domain}${post.cover}`,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            author: { "@type": "Organization", name: post.author, url: site.domain },
            publisher: { "@id": `${site.domain}/#business` },
            mainEntityOfPage: url,
            articleSection: post.category,
            keywords: post.tags.join(", "),
            inLanguage: "en-IN",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
              { "@type": "ListItem", position: 2, name: "Driver's Notes", item: `${site.domain}/blog/` },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          },
        ]}
      />
      <ReadingProgress />
      <article>
        <Chapter tone="night" time="05:00" stop={post.category} labelledBy="post-title" className="overflow-hidden">
          <div className="relative isolate flex min-h-[88svh] flex-col justify-end">
            <div className="absolute inset-0 -z-10">
              <Image src={post.cover} alt={post.coverAlt} fill priority sizes="100vw" className="drift object-cover" />
              <div aria-hidden className="absolute inset-0 bg-[rgb(10_12_24/0.55)]" />
            </div>
            <div className="wrap w-full pb-16 pt-40 text-paper">
              <nav aria-label="Breadcrumb" className="rise-1 text-[15px] font-semibold opacity-85">
                <Link href="/" className="hover:underline">Home</Link>
                <span aria-hidden> / </span>
                <Link href="/blog/" className="hover:underline">Driver&rsquo;s Notes</Link>
              </nav>
              <h1 id="post-title" className="display rise-2 mt-6 max-w-[18ch] text-[clamp(2.25rem,5.2vw,5.75rem)]">{post.title}</h1>
              <p className="rise-3 mt-8 text-[1.0625rem] opacity-85">
                By {post.author} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} min read
                {post.updated && (
                  <>
                    {" "}· Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                  </>
                )}
              </p>
            </div>
          </div>
        </Chapter>

        <Chapter tone="day" time="07:30" stop="Reading" labelledBy="post-title">
          <div className="wrap grid gap-14 py-20 lg:grid-cols-12 lg:gap-10">
            <aside className="self-start lg:sticky lg:top-28 lg:col-span-3">
              {post.toc.length > 0 && (
                <nav aria-label="On this page">
                  <p className="text-[15px] font-semibold opacity-75">On this page</p>
                  <ol className="mt-3 space-y-2 text-[1.0625rem]">
                    {post.toc.map((t) => (
                      <li key={t.id}>
                        <a href={`#${t.id}`} className="hover:underline decoration-headlight">{t.text}</a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className="mt-10">
                <ShareButtons url={url} title={post.title} />
              </div>
            </aside>

            <div className="lg:col-span-8 lg:col-start-5">
              {/* Answer-first summary: the line people and AI assistants are most likely to quote. */}
              <p className="max-w-[34ch] font-display text-[clamp(1.75rem,2.6vw,2.375rem)] leading-[1.2] tracking-[-0.01em]">{post.summary}</p>
              <div className="prose-notes mt-14" dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
          </div>
        </Chapter>

        <Chapter tone="night" time="28:30" stop="Tomorrow's pickup" labelledBy="post-cta">
          <div className="wrap py-[var(--chapter)]">
            <h2 id="post-cta" className="h-chapter max-w-[14ch]">Want this route? We&rsquo;ll drive.</h2>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href={whatsappLink(`Hi Saffarr Travels, I read "${post.title}" and want to book this trip.`)} className="btn btn-light">
                Book on WhatsApp
              </a>
              <a href={`tel:${site.phoneE164}`} className="link tnum">
                or call {site.phoneDisplay}
              </a>
            </div>

            {related.length > 0 && (
              <div className="mt-[var(--chapter)]">
                <h2 className="h-mid">More from the road</h2>
                <ul className="mt-10 grid gap-12 md:grid-cols-2">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}/`} className="group block">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <Image src={p.cover} alt={p.coverAlt} fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04]" />
                        </div>
                        <h3 className="mt-5 font-display text-[1.875rem] leading-[1.05] group-hover:underline decoration-headlight decoration-2">{p.title}</h3>
                        <p className="mt-2 text-[15px] opacity-75">{p.category}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Chapter>
      </article>
    </>
  );
}
