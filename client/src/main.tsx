import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add custom styles to match the design
const style = document.createElement('style');
style.textContent = `
  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(13, 17, 23, 0.9);
  }

  ::-webkit-scrollbar-thumb {
    background: #3a86ff;
    border-radius: 10px;
  }

  /* Custom Classes */
  .text-gradient {
    background: linear-gradient(90deg, #3a86ff, #8338ec);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section-transition {
    transition: transform 0.5s ease, opacity 0.5s ease;
  }

  .experience-dot::before {
    content: '';
    position: absolute;
    left: -29px;
    top: 6px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #3a86ff;
    z-index: 1;
  }

  /* Canvas Setup */
  #bg-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
