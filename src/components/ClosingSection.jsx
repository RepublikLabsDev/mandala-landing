import { faqs } from '../content';
import { Brand } from './Primitives';

/**
 * Questions, then the footer. Nothing else.
 *
 * This used to end with a "Trade. Allocate. Grow." panel restating the hero,
 * beside a four-tile trust strip, beside the FAQ — three competing blocks in a
 * cramped two-column grid with 11px type. The page already asks for the app in
 * the header and the hero; a third ask at the bottom was noise, and it crowded
 * the one thing people actually scroll down here for.
 */
export function ClosingSection() {
  return <section className="close" id="learn">
    <div className="faq faq-full">
      <h2>Questions</h2>
      {faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>⌄</span></summary><p>{answer}</p></details>)}
    </div>
    <footer><Brand /><span>© 2026 Mandala Finance</span><a href="#learn">Risk Disclaimer</a><a href="#learn">Terms of Use</a></footer>
  </section>;
}
