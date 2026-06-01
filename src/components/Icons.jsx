// Inline SVG icons (Lucide-style, 24x24 viewBox)
const base = {
  width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
  className: 'ico', 'aria-hidden': true
};
export const IconHome    = (p) => (<svg {...base} {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/></svg>);
export const IconCamera  = (p) => (<svg {...base} {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>);
export const IconVideo   = (p) => (<svg {...base} {...p}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>);
export const IconChart   = (p) => (<svg {...base} {...p}><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6"  y1="20" x2="6"  y2="14"/><line x1="3" y1="20" x2="21" y2="20"/></svg>);
export const IconBall    = (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="10"/><path d="M12 2l3 4-3 4-3-4z"/><path d="M22 12l-4 3-4-3 4-3z"/><path d="M2 12l4-3 4 3-4 3z"/><path d="M12 22l-3-4 3-4 3 4z"/></svg>);
export const IconTarget  = (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>);
export const IconBook    = (p) => (<svg {...base} {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>);
export const IconPlay    = (p) => (<svg {...base} {...p}><polygon points="5 3 19 12 5 21 5 3"/></svg>);
export const IconStop    = (p) => (<svg {...base} {...p}><rect x="6" y="6" width="12" height="12" rx="1"/></svg>);
export const IconRefresh = (p) => (<svg {...base} {...p}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>);
export const IconClose   = (p) => (<svg {...base} {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6"  y1="6" x2="18" y2="18"/></svg>);
export const IconTrophy  = (p) => (<svg {...base} {...p}><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 4h3v3a3 3 0 0 1-3 3M7 4H4v3a3 3 0 0 0 3 3"/></svg>);
export const IconLink    = (p) => (<svg {...base} {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>);
