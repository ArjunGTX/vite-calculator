import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { add, reset, selectOperations } from "../redux/features/historySlice";
import styles from "./Calculator.module.css";

const BUTTONS = [
  "+",
  "-",
  "*",
  "/",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  ".",
  "C",
  "CE",
  "<",
  ">",
  "=",
] as const;

export const Calculator = () => {
  const operations = useSelector(selectOperations);
  const dispatch = useDispatch();

  const prevEntry = useRef<string | null>(null);

  const [entries, setEntries] = useState<string[]>([]);

  const [result, setResult] = useState<string | null>(null);

  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(
    operations.length - 1
  );

  const handleButtonClick = (button: string) => {
    if (prevEntry.current === "=" && !["<", ">"].includes(button)) {
      setResult(null);
    }
    switch (button) {
      case "=":
        setResult(eval(entries.join("")));
        dispatch(add(entries));
        setEntries([]);
        setCurrentHistoryIndex((index) => index + 1);
        break;
      case "C":
        setEntries([]);
        setResult(null);
        break;
      case "CE":
        dispatch(reset());
        break;
      case "<":
        setCurrentHistoryIndex((index) => {
          if (index === 0) {
            return operations.length - 1;
          }
          return index - 1;
        });
        break;
      case ">":
        setCurrentHistoryIndex((index) => {
          if (index === operations.length - 1) {
            return 0;
          }
          return index + 1;
        });
        break;
      default:
        setEntries((entries) => [...entries, button]);
    }
    prevEntry.current = button;
  };

  return (
    <div className={`${styles.calculator}`}>
      <output className={`${styles.screen}`}>
        <small className={`${styles.history}`}>
          {operations[currentHistoryIndex]?.join("")}
        </small>
        {result ?? entries.join("")}
      </output>
      <div className={`${styles.buttonContainer}`}>
        {BUTTONS.map((button, index, arr) => (
          <button
            onClick={() => handleButtonClick(button)}
            className={`${index === arr.length - 1 ? styles.fullSpan : ""}`}
            key={button}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  );
};
