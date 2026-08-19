export function Mark({ className = '' }) {
  return <img className={`mark ${className}`} src="/assets/mandala-icon.png" alt="" />;
}

export function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export function Brand({ product = 'FINANCE' }) {
  return <a className="brand" href="#top" aria-label="Mandala Finance home"><Mark /><span><b>MANDALA</b><small>{product}</small></span></a>;
}
