import Link from "next/link";
import { Chapter } from "@/components/Chapter";

export default function NotFound() {
  return (
    <Chapter tone="night" time="03:10" stop="Wrong turn" labelledBy="nf-title">
      <div className="wrap flex min-h-[90svh] flex-col justify-end pb-24 pt-40">
        <h1 id="nf-title" className="display text-[clamp(3rem,7vw,7rem)]">Wrong turn.</h1>
        <p className="lede mt-8">This road doesn&rsquo;t go anywhere. Head back and we&rsquo;ll get you where you&rsquo;re going.</p>
        <Link href="/" className="btn btn-light mt-10 self-start">Back to the start</Link>
      </div>
    </Chapter>
  );
}
