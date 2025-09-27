import React, { useEffect, useRef } from "react";

const codeLines = [
  "const x = 10;",
  "let name = 'Muhammad Uwais Karim';",
  "function hello() { return 'Hi'; }",
  "for(let i=0;i<5;i++){ console.log(i); }",
  "const arr = [1,2,3,4];",
  "if(x > 5){ console.log('Yes'); }",
  "const user = { name: 'Uwais', age: 12 };",
  "while(x < 20){ x++; }",
  "console.log('Matrix Background');"
];

const syntaxColors = {
  keyword: "#00ff00",
  string: "#ff9900",
  number: "#00ffff",
  variable: "#ffffff",
  operator: "#ff66ff",
  punctuation: "#8888ff",
};

const keywords = ["const", "let", "function", "return", "if", "for", "while"];

export default function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(0);

    ctx.font = `${fontSize}px monospace`;

    const colorizeLine = (line) => {
      const parts = line.split(/(\s+|=|;|\(|\)|\{|\}|,)/g);
      return parts.map(part => {
        if (keywords.includes(part)) return { text: part, color: syntaxColors.keyword };
        if (/^['"].*['"]$/.test(part)) return { text: part, color: syntaxColors.string };
        if (/^\d+$/.test(part)) return { text: part, color: syntaxColors.number };
        if (/=|\+|-|\*|\/|>|<|!/.test(part)) return { text: part, color: syntaxColors.operator };
        if (/;|\(|\)|\{|\}|,/.test(part)) return { text: part, color: syntaxColors.punctuation };
        if (part.trim() === "") return { text: part, color: syntaxColors.punctuation };
        return { text: part, color: syntaxColors.variable };
      });
    };

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < drops.length; i++) {
        const line = codeLines[Math.floor(Math.random() * codeLines.length)];
        const coloredParts = colorizeLine(line);
        let x = i * fontSize;
        let y = drops[i] * fontSize;

        coloredParts.forEach(part => {
          ctx.fillStyle = part.color;
          ctx.fillText(part.text, x, y);
          x += ctx.measureText(part.text).width;
        });

        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 70);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas" />;
}
