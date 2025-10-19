"use client";

import { useEffect, useRef, useState } from "react";

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentPrompt: string;
  onSave: (prompt: string) => void;
};

export function SettingsModal({
  isOpen,
  onClose,
  currentPrompt,
  onSave,
}: SettingsModalProps) {
  const [prompt, setPrompt] = useState(currentPrompt);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setPrompt(currentPrompt);
  }, [currentPrompt]);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const handleSave = () => {
    onSave(prompt);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
          Settings
        </h2>
        <div className="mb-4">
          <label
            htmlFor="user-prompt"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Custom System Prompt
          </label>
          <textarea
            ref={textareaRef}
            id="user-prompt"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-500"
            rows={6}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your custom system prompt here. This will be sent with every message to guide the assistant's behavior."
          />
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            This prompt will be included with your messages to customize the
            assistant&apos;s responses.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
