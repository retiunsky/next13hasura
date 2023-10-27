'use client';

import React, { useEffect, useState, useRef } from 'react';


const Highlight = ({ children, testId }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const codeNode = useRef();
  const language = 'json';

  useEffect(() => {
    try {
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
      throw Error(`Cannot register the language ${language}`);
    }
  }, []);

 

  if (!isLoaded) return null;

  return (
    <pre className="rounded" data-testid={testId}>
      <code ref={codeNode} className={language}>
        {children}
      </code>
    </pre>
  );
};

export default Highlight;
