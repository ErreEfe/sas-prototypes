import React, { useState } from 'react';
import { TokenIcon, ClipboardIcon, CheckIcon } from './icons';

type Token = {
  token: string;
  property: string;
  value: string;
};

interface ComponentTokenDisplayProps {
  children: React.ReactNode;
  tokens: Token[];
}

const ComponentTokenDisplay: React.FC<ComponentTokenDisplayProps> = ({
  children,
  tokens,
}) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = async (token: string) => {
    try {
      await navigator.clipboard.writeText(token);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 2000);
    } catch (err) {
      console.error('Failed to copy token: ', err);
    }
  };

  return (
    <div className="flex items-start gap-6 w-full">
      <div className="flex-grow">{children}</div>
      <div
        className="relative flex-shrink-0 pt-2"
        onMouseEnter={() => setIsPopoverVisible(true)}
        onMouseLeave={() => setIsPopoverVisible(false)}
      >
        <button
          className="p-1.5 bg-background-alt rounded-full text-text-tertiary hover:text-text-primary hover:bg-border transition-colors duration-200"
          aria-label="Show design tokens"
        >
          <TokenIcon className="w-5 h-5" />
        </button>

        {isPopoverVisible && (
          <div className="absolute top-0 right-full mr-2 w-72 bg-surface rounded-lg shadow-2xl border border-border-strong z-30 p-3">
            <p className="text-sm font-bold text-text-primary mb-2 px-1">
              Design Tokens
            </p>
            <ul className="space-y-1">
              {tokens.map((token, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-xs group p-1 rounded-md hover:bg-background-alt"
                >
                  <div className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full border border-border mr-2 flex-shrink-0"
                      style={{ backgroundColor: token.value }}
                    ></div>
                    <div>
                      <code className="font-mono bg-background-alt px-1 py-0.5 rounded text-primary">
                        {token.token}
                      </code>
                      <p className="text-text-tertiary">{token.property}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(token.token)}
                    className="p-1 rounded text-text-tertiary opacity-0 group-hover:opacity-100 hover:text-text-primary transition-opacity"
                    title={`Copy "${token.token}"`}
                  >
                    {copiedToken === token.token ? (
                      <CheckIcon className="w-4 h-4 text-status-success-icon" />
                    ) : (
                      <ClipboardIcon className="w-4 h-4" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentTokenDisplay;
