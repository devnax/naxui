import React, { useEffect } from 'react';

import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-okaidia.css';

interface CodeProps {
   code: string,
   language?: string
}

const Code = ({ code, language }: CodeProps) => {

   useEffect(() => {
      Prism.highlightAll()
   }, [])

   return (
      <div className="Code">

         <pre>
            <code className={`language-${language}`}>{code}</code>
         </pre>
      </div >
   )
}

export default Code