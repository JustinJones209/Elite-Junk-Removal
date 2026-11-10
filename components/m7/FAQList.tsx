import { Plus } from "lucide-react";
import type { FAQ } from "@/lib/site";

/** Native details/summary accordion: answers stay in the HTML for search and AI crawlers. */
export function FAQList({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="faq">
      {faqs.map((f, i) => (
        <details key={f.question} open={i === 0}>
          <summary>
            <span>{f.question}</span>
            <span className="pm" aria-hidden="true"><Plus /></span>
          </summary>
          <div className="ans"><p>{f.answer}</p></div>
        </details>
      ))}
    </div>
  );
}
