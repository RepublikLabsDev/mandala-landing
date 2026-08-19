import { useState } from 'react';
import { appUrl, navigation } from '../content';
import { Arrow, Brand } from './Primitives';

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <Brand />
    <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button>
    <nav className={open ? 'open' : ''} aria-label="Main navigation">
      {navigation.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
    <a className="button header-cta" href={appUrl} target="_blank" rel="noreferrer">Launch App <Arrow /></a>
  </header>;
}
