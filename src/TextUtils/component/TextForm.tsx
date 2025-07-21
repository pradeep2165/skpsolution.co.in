import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import "./TextForm.css";

interface TextFormProps {
  heading: string;
}

export default function TextForm({ heading }: TextFormProps) {
  const [text, setText] = useState<string>("");
  const [alert, setAlert] = useState<{ message: string; type: "success" | "info" | "warning" | "error" } | null>(null);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const showAlert = (message: string, type: "success" | "info" | "warning" | "error") => {
    setAlert({ message, type });
  };

  const handleUpClick = () => {
    setText(text.toUpperCase());
    showAlert("Converted to UPPERCASE", "success");
  };

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const clearText = () => {
    setText("");
    showAlert("Text cleared", "warning");
  };

  const changeLower = () => {
    setText(text.toLowerCase());
    showAlert("Converted to lowercase", "success");
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    showAlert("Text copied to clipboard", "info");
  };

  const removeSpace = () => {
    setText(text.split(/[ ]+/).join(" "));
    showAlert("Extra spaces removed", "success");
  };

  const makeHeadingText = () => {
    const newText = text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    setText(newText);
    showAlert("Converted to Heading Case", "success");
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const readTime = (0.008 * wordCount).toFixed(2);
  const mode = "";
  return (
    <div className={`textform-container ${mode}`}>
      {alert && (
        <div className={`alert alert-${alert.type}`}>
          <span className="alert-icon">
            {alert.type === "success" && "✅"}
            {alert.type === "info" && "ℹ️"}
            {alert.type === "warning" && "⚠️"}
            {alert.type === "error" && "❌"}
          </span>
          <span>{alert.message}</span>
        </div>
      )}

      <h3>{heading}</h3>
      <textarea className="text-area" rows={8} value={text} onChange={handleOnChange} placeholder="Type something here..." />

      <div className="button-group">
        <button onClick={clearText}>Clear</button>
        <button onClick={handleUpClick}>Uppercase</button>
        <button onClick={changeLower}>Lowercase</button>
        <button onClick={copyText}>Copy</button>
        <button onClick={removeSpace}>Remove Spaces</button>
        <button onClick={makeHeadingText}>Heading Text</button>
      </div>

      <div className="summary">
        <h3>Text Summary</h3>
        <p>
          {wordCount} words, {charCount} characters
        </p>
        <p>{readTime} minutes to read</p>
      </div>

      <div className="preview">
        <h3>Preview</h3>
        <p>{text || "Nothing to preview"}</p>
      </div>
    </div>
  );
}
