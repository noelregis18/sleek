'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  const handleNumberClick = (num: string) => {
    if (display === '0' || resetDisplay) {
      setDisplay(num);
      setResetDisplay(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperationClick = (op: string) => {
    const currentValue = parseFloat(display);
    
    if (prevValue === null) {
      setPrevValue(currentValue);
    } else if (operation) {
      const result = calculate(prevValue, currentValue, operation);
      setPrevValue(result);
      setDisplay(String(result));
    }
    
    setOperation(op);
    setResetDisplay(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return a / b;
      default:
        return b;
    }
  };

  const handleEquals = () => {
    if (prevValue === null || operation === null) return;
    
    const currentValue = parseFloat(display);
    const result = calculate(prevValue, currentValue, operation);
    
    setDisplay(String(result));
    setPrevValue(null);
    setOperation(null);
    setResetDisplay(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setOperation(null);
    setPrevValue(null);
    setResetDisplay(false);
  };

  const handleDecimal = () => {
    if (resetDisplay) {
      setDisplay('0.');
      setResetDisplay(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleBackspace = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handlePlusMinus = () => {
    setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
  };

  const handlePercentage = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  // Button data for rendering
  const buttons = [
    { text: 'C', onClick: handleClear, className: 'bg-red-500 dark:bg-red-600 text-white' },
    { text: '⌫', onClick: handleBackspace, className: 'bg-gray-300 dark:bg-gray-700' },
    { text: '%', onClick: handlePercentage, className: 'bg-gray-300 dark:bg-gray-700' },
    { text: '÷', onClick: () => handleOperationClick('÷'), className: 'bg-amber-500 dark:bg-amber-600 text-white' },
    { text: '7', onClick: () => handleNumberClick('7'), className: 'bg-gray-200 dark:bg-gray-800' },
    { text: '8', onClick: () => handleNumberClick('8'), className: 'bg-gray-200 dark:bg-gray-800' },
    { text: '9', onClick: () => handleNumberClick('9'), className: 'bg-gray-200 dark:bg-gray-800' },
    { text: '×', onClick: () => handleOperationClick('×'), className: 'bg-amber-500 dark:bg-amber-600 text-white' },
    { text: '4', onClick: () => handleNumberClick('4'), className: 'bg-gray-200 dark:bg-gray-800' },
    { text: '5', onClick: () => handleNumberClick('5'), className: 'bg-gray-200 dark:bg-gray-800' },
    { text: '6', onClick: () => handleNumberClick('6'), className: 'bg-gray-200 dark:bg-gray-800' },
    { text: '-', onClick: () => handleOperationClick('-'), className: 'bg-amber-500 dark:bg-amber-600 text-white' },
    { text: '1', onClick: () => handleNumberClick('1'), className: 'bg-gray-200 dark:bg-gray-800' },
    { text: '2', onClick: () => handleNumberClick('2'), className: 'bg-gray-200 dark:bg-gray-800' },
    { text: '3', onClick: () => handleNumberClick('3'), className: 'bg-gray-200 dark:bg-gray-800' },
    { text: '+', onClick: () => handleOperationClick('+'), className: 'bg-amber-500 dark:bg-amber-600 text-white' },
    { text: '+/-', onClick: handlePlusMinus, className: 'bg-gray-200 dark:bg-gray-800' },
    { text: '0', onClick: () => handleNumberClick('0'), className: 'bg-gray-200 dark:bg-gray-800' },
    { text: '.', onClick: handleDecimal, className: 'bg-gray-200 dark:bg-gray-800' },
    { text: '=', onClick: handleEquals, className: 'bg-amber-500 dark:bg-amber-600 text-white' },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-2xl shadow-2xl">
        <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
          {/* Display */}
          <div className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="text-right text-3xl font-medium h-16 flex items-center justify-end overflow-hidden">
              <div className="truncate">{display}</div>
            </div>
            {operation && (
              <div className="text-right text-gray-500 dark:text-gray-400 text-sm">
                {prevValue} {operation}
              </div>
            )}
          </div>
          
          {/* Buttons */}
          <div className="grid grid-cols-4 gap-1 p-2">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                className={`${button.className} h-16 rounded-lg text-lg font-medium transition-colors hover:opacity-90 active:opacity-75`}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
