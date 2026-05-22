import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export const Link: React.FC<LinkProps> = ({ to, children, className, ...props }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if user is cmd+clicking / ctrl+clicking / opening in a new window/tab
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      return;
    }

    e.preventDefault();
    
    // Update browser URL history
    window.history.pushState(null, '', to);
    
    // Dispatch popstate event to trigger router state updates in App.tsx and hook params
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};
