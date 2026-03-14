import { useEffect, useState } from 'react';

function oldSchoolCopy(text: string) {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);
}

export function useCopyToClipboard() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (value: string) => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
          setCopied(value);
        } else {
          throw new Error('writeText not supported');
        }
      } catch {
        oldSchoolCopy(value);
        setCopied(value);
      }
    };

    handleCopy();
  };

  const resetCopied = () => setCopied(null);

  useEffect(() => {
    if (!copied) return;

    const timeoutId = setTimeout(resetCopied, 2000);
    return () => clearTimeout(timeoutId);
  }, [copied]);

  return { copied, copyToClipboard };
}
