type SplitWordsOptions = {
  splitBy?: string;
  scope?: string;
};

type WordToken = {
  type: 'word';
  value: string;
  key: string;
  lineIndex: number;
  tokenIndex: number;
};

type DelimToken = {
  type: 'delim';
  value: string;
  key: string;
  lineIndex: number;
  tokenIndex: number;
};

type WordsLine = {
  lineIndex: number;
  key: string;
  tokens: Array<WordToken | DelimToken>;
};

type WordsTree = {
  source: string;
  lines: WordsLine[];
};

function splitPreserveDelimiter(line: string, splitBy: string): string[] {
  if (splitBy === '') return [line];

  const parts = line.split(splitBy);
  const out: string[] = [];

  parts.forEach((part, i) => {
    out.push(part);
    if (i < parts.length - 1) out.push(splitBy);
  });

  return out;
}

export function splitWords(text: string, opts: SplitWordsOptions = {}): WordsTree {
  const { splitBy = ' ', scope = '' } = opts;

  const lines: WordsLine[] = text.split('\n').map((line, lineIndex) => {
    const pieces = splitPreserveDelimiter(line, splitBy);

    let tokenIndex = 0;
    const tokens: Array<WordToken | DelimToken> = [];

    pieces.forEach((piece) => {
      if (splitBy !== '' && piece === splitBy) {
        tokens.push({
          type: 'delim',
          value: piece,
          lineIndex,
          tokenIndex,
          key: `${scope}l${lineIndex}-t${tokenIndex++}-d`,
        });
        return;
      }

      if (piece === '') return;

      tokens.push({
        type: 'word',
        value: piece,
        lineIndex,
        tokenIndex,
        key: `${scope}l${lineIndex}-t${tokenIndex++}-w`,
      });
    });

    return {
      lineIndex,
      key: `${scope}l${lineIndex}`,
      tokens,
    };
  });

  return {
    source: text.replace(/\n/g, ' '),
    lines,
  };
}
type SplitCharsOptions = {
  scope?: string;
};

type CharNode = {
  value: string;
  key: string;
  lineIndex: number;
  charIndex: number;
};

type CharsLine = {
  lineIndex: number;
  key: string;
  chars: CharNode[];
};

type CharsTree = {
  lines: CharsLine[];
};

export function splitChars(text: string, opts: SplitCharsOptions = {}): CharsTree {
  const scope = opts.scope ?? '';

  const lines: CharsLine[] = text.split('\n').map((line, lineIndex) => {
    const chars: CharNode[] = Array.from(line).map((char, charIndex) => ({
      value: char,
      lineIndex,
      charIndex,
      key: `${scope}l${lineIndex}-c${charIndex}`,
    }));

    return {
      lineIndex,
      key: `${scope}l${lineIndex}`,
      chars,
    };
  });

  return { lines };
}
