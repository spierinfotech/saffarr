import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Planner } from "@/components/Planner";
import { Roads } from "@/components/Roads";
import { Fleet } from "@/components/Fleet";
import { WeekendsTeaser } from "@/components/WeekendsTeaser";
import { Voices } from "@/components/Voices";
import { NotesTeaser } from "@/components/NotesTeaser";
import { Faq } from "@/components/Faq";
import { Book } from "@/components/Book";
import { JsonLd, faqSchema } from "@/lib/schema";

/** The page is one drive: 04:30 pickup, the road, the ghats, arrival, and tomorrow's pickup. */
export default function Home() {
  return (
    <>
      <JsonLd data={[faqSchema()]} />
      <Hero />
      <Story />
      <Planner />
      <Roads />
      <Fleet />
      <WeekendsTeaser />
      <Voices />
      <NotesTeaser />
      <Faq />
      <Book />
    </>
  );
}
