import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-dark.min.css";

export default function Code({ code, language }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="Code mx-auto w-75">
      <pre>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
