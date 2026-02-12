import { Section } from '@/components/section';
import Link from 'next/link';

const contacts = [
  { title: 'Phone', value: '+39 340 363 9577', href: 'tel:+39 3403639577' },
  {
    title: 'Email',
    value: 'hello@lucabattistini.dev',
    href: 'mailto:hello@lucabattistini.dev',
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
  { name: 'X', url: 'https://x.com/lucabattistini_' },
];

export function Contacts() {
  return (
    <Section name="07. Contacts">
      <div>
        {contacts.map(({ title, value, href }) => (
          <div key={title}>
            <div>
              <div>
                <div>
                  <p>{title}</p>
                </div>
                <div>
                  <h3>
                    <Link
                      className="text-primary hover:text-accent pointer-events-auto font-sans text-lg font-bold transition"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {value}
                    </Link>
                  </h3>
                </div>
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
                      className="text-primary hover:text-accent pointer-events-auto font-sans text-lg font-bold transition"
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
