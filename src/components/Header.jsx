import { useState } from 'react';
import { navigation } from '../content';
import { AppLink, Arrow, Brand } from './Primitives';

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <Brand />
    <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button>
    <nav className={open ? 'open' : ''} aria-label="Main navigation">
      {navigation.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
    <AppLink className="button header-cta" path="/swap">Launch App <Arrow /></AppLink>
  </header>;
}
