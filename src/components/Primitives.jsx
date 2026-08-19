import { appUrl } from '../content';

export function Mark({ className = '' }) {
  return <img className={`mark ${className}`} src="/assets/mandala-icon.png" alt="" />;
}

export function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export function Brand({ product = 'FINANCE' }) {
  return <a className="brand" href="#top" aria-label="Mandala Finance home"><Mark /><span><b>MANDALA</b><small>{product}</small></span></a>;
}

// Every link into the app goes through here so there is exactly one place that
// decides whether those links are live. With appUrl null it still renders an
// <a>, so the CSS that styles these by element selector keeps working, but with
// no href it is inert and aria-disabled tells assistive tech the same thing.
export function AppLink({ path = '', className = '', children }) {
  if (!appUrl) {
    return <a className={className} aria-disabled="true">{children}</a>;
  }
  return <a className={className} href={appUrl + path} target="_blank" rel="noreferrer">{children}</a>;
}
