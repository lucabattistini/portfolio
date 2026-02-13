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
  { name: 'Instagram', url: 'https://instagram.com/lucabattistini' },
  { name: 'LinkedIn', url: 'https://linkedin.com/lucabattistinidev' },
  { name: 'Bluesky', url: 'https://bsky.app/profile/lucaba-ttistini.bsky.social' },
  { name: 'X', url: 'https://x.com/lucabattistini_' },
];

function CallToAction({ href, value, copy }: { href: string; value: string; copy?: boolean }) {
  const { copied, copyToClipboard } = useCopyToClipboard();
  const hasCopied = Boolean(copied);

  console.log({ copied });

  return (
    <div className="flex items-center gap-4">
      <h3>
        <Link
          className="text-primary hover:text-accent pointer-events-auto font-sans text-2xl font-bold transition"
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
          type='button'
          className="text-primary text-xs hover:text-accent pointer-events-auto cursor-pointer flex items-center gap-2 transition"
        >
          {!hasCopied ? (

              <Copy className="inline-block h-5 w-5" fill="currentColor" />


          ) : (

              <CopyCheck className="inline-block h-5 w-5" fill="currentColor" />
          )}
        </button>
      )}
    </div>
  );
}

export function Contacts() {
  return (
    <Section name="07. Contacts">
      <div>
        {contacts.map(({ title, value, href, copy }) => (
          <div key={title}>
            <div>
              <div>
                <div>
                  <p>{title}</p>
                </div>
                <CallToAction href={href} value={value} copy={copy} />
              </div>
            </div>
          </div>
        ))}
        <div>
          <div>
            <div>
              <div>
                <p>Socials</p>
              </div>
              {socials.map(({ name, url }) => (
                <div key={name}>
                  <h3>
                    <Link
                      className="text-primary hover:text-accent pointer-events-auto font-sans text-2xl font-bold transition"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {name}
                    </Link>
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
