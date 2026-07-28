import React, { useMemo } from 'react';
import katex from 'katex';

export function Formula({ tex, block = false, className = '' }) {
  const html = useMemo(() => {
    if (!tex) return '';
    try {
      return katex.renderToString(tex, { displayMode: block, throwOnError: false, errorColor: '#f87171' });
    } catch {
      return tex;
    }
  }, [tex, block]);

  if (!tex) return null;
  return <span className={`formula-block ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

// Rozdělí text na kusy okolo $...$ a inline math vyrenderuje přes KaTeX,
// zbytek jako obyčejný text — umožňuje psát vzorce přímo uvnitř vět.
export function MathText({ text, className = '' }) {
  if (!text) return null;
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$') && part.length > 1) {
          return <Formula key={i} tex={part.slice(1, -1)} />;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
}

export default Formula;
