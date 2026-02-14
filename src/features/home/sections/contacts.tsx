'use client';

import { Section } from '@/components/section';
import Link from 'next/link';
import { useCopyToClipboard } from '@/lib/hooks';
import Copy from '@public/copy.svg';
import CopyCheck from '@public/copy-check.svg';

const contacts = [
  {
    title: 'Phone',
    value: '+39 340 363 9577',
    href: 'tel:+39 3403639577',
    copy: true,
  },
  {
    title: 'Email',
    value: 'hello@lucabattistini.dev',
    href: 'mailto:hello@lucabattistini.dev',
    copy: true,
  },
  {
    title: 'GitHub',
    value: 'github.com/lucabattistini',
    href: 'https://github.com/lucabattistini',
  },
];

const socials = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/lucabattistini',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/lucabattistinidev',
  },
  {
    name: 'Bluesky',
    url: 'https://bsky.app/profile/lucaba-ttistini.bsky.social',
  },
  {
    name: 'X',
    url: 'https://x.com/lucabattistini_',
  },
];

function CallToAction({ href, value, copy }: { href: string; value: string; copy?: boolean }) {
  const { copied, copyToClipboard } = useCopyToClipboard();
  const hasCopied = Boolean(copied);

  return (
    <div className="flex items-center gap-4">
      <h3 className="text-primary hover:text-accent pointer-events-auto font-sans text-2xl font-bold transition">
        <Link
          className="pointer-events-auto z-20 inline-block"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {value}
        </Link>
      </h3>
      {copy && (
        <button
          onClick={() => copyToClipboard(value)}
          type="button"
          className="text-primary hover:text-accent pointer-events-auto flex cursor-pointer items-center gap-2 text-xs transition"
        >
          {!hasCopied ? (
            <Copy className="inline-flex h-5 w-5" fill="currentColor" />
          ) : (
            <CopyCheck className="inline-flex h-5 w-5" fill="currentColor" />
          )}
        </button>
      )}
    </div>
  );
}

export function Contacts() {
  return (
    <Section name="07. Contacts">
      <div className="flex flex-col gap-10">
        {contacts.map(({ title, value, href, copy }) => (
          <Section.Reveal key={title} className="flex flex-col gap-2">
            <p className="text-primary/70 text-lg font-medium">{title}</p>
            <CallToAction href={href} value={value} copy={copy} />
          </Section.Reveal>
        ))}
        <div>
          <div className="flex flex-col gap-2">
            <p className="text-primary/70 text-lg font-medium">Socials</p>
            {socials.map(({ name, url }) => (
              <Section.Reveal key={name} className="flex flex-col gap-1">
                <h3 className="text-primary hover:text-accent pointer-events-auto font-sans text-2xl font-bold transition">
                  <Link
                    className="select-text"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {name}
                  </Link>
                </h3>
              </Section.Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
