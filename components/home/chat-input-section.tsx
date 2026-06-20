"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";

type ChatInputSectionProps = {
  isLoading: boolean;
  loadingMessage: string;
  errorMessage: string;
  onAnalyze: (chatText: string, image: File | null) => Promise<void>;
  onResetResult: () => void;
};

export function ChatInputSection({
  isLoading,
  loadingMessage,
  errorMessage,
  onAnalyze,
  onResetResult,
}: ChatInputSectionProps) {
  const [chatText, setChatText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const imagePreviewUrl = useMemo(() => {
    if (!selectedImage) {
      return null;
    }

    return URL.createObjectURL(selectedImage);
  }, [selectedImage]);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const hasContent = chatText.trim().length > 0 || selectedImage !== null;

  async function handleAnalyzeClick() {
    await onAnalyze(chatText, selectedImage);
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }

    setSelectedImage(file);
  }

  function handleRemoveImage() {
    setSelectedImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleClearAll() {
    setChatText("");
    handleRemoveImage();
    onResetResult();
  }

  return (
    <section className="px-0 py-8 sm:py-12 lg:py-14">
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="matcha-card rounded-[1.5rem] p-4 sm:rounded-[2rem] sm:p-8"
        >
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6b8f71]">
              Chat Input
            </p>
            <h2 className="text-safe-wrap mt-3 text-2xl font-extrabold tracking-[-0.03em] text-[#2d3436] sm:text-4xl">
              Add chat text or a chat screenshot
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5f6668] sm:text-base">
              This section accepts pasted chat text and uploaded chat screenshots. Nothing
              is stored, and there is no account flow.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.18 }}
              className="matcha-card rounded-[1.35rem] bg-[#f8f5ef] p-4 sm:rounded-[1.5rem] sm:p-5"
            >
              <label
                htmlFor="chat-text"
                className="mb-3 block text-sm font-semibold text-[#475053]"
              >
                Chat text
              </label>
              <textarea
                id="chat-text"
                rows={9}
                placeholder="Paste chat text here..."
                value={chatText}
                onChange={(event) => setChatText(event.target.value)}
                className="w-full max-w-full resize-none rounded-[1.2rem] border border-[#e2d9cf] bg-[#ffffff] px-4 py-4 text-base text-[#2D3436] outline-none transition placeholder:text-[#98a0a2] focus:border-[#6b8f71] focus:ring-4 focus:ring-[#6b8f71]/10 sm:rounded-[1.35rem] sm:px-5"
              />

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAnalyzeClick}
                  disabled={!hasContent || isLoading}
                  className="soft-lift w-full rounded-full bg-[#6b8f71] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-[#5f8165] disabled:cursor-not-allowed disabled:bg-[#a7bca9] disabled:hover:scale-100 sm:w-auto"
                >
                  {isLoading ? "Analyzing..." : "Analyze"}
                </button>
                <button
                  type="button"
                  onClick={handleClearAll}
                  disabled={isLoading}
                  className="soft-lift w-full rounded-full border border-[#d9c8bb] bg-[#ffffff] px-5 py-3 text-sm font-semibold text-[#2D3436] transition hover:scale-[1.02] hover:bg-[#f5f0ea] sm:w-auto"
                >
                  Reset
                </button>
              </div>

              {isLoading ? (
                <div className="mt-4 rounded-[1rem] border border-[#d7e1d4] bg-[#edf2e8] px-4 py-3 text-sm font-medium text-[#4f6754]">
                  {loadingMessage}
                </div>
              ) : null}

              {errorMessage ? (
                <p className="mt-4 rounded-[1rem] border border-[#e5d2c5] bg-[#fbf2ec] px-4 py-3 text-sm text-[#8a5f4a]">
                  {errorMessage}
                </p>
              ) : null}
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.18 }}
              className="matcha-card rounded-[1.35rem] bg-[#f8f5ef] p-4 sm:rounded-[1.5rem] sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#475053]">
                  Chat screenshot upload
                </p>
                {selectedImage ? (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    disabled={isLoading}
                    className="soft-lift rounded-full border border-[#d9c8bb] bg-[#ffffff] px-4 py-2 text-xs font-semibold text-[#2D3436] transition hover:scale-[1.02] hover:bg-[#f5f0ea]"
                  >
                    Remove Image
                  </button>
                ) : null}
              </div>

              <input
                ref={fileInputRef}
                id="screenshot-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isLoading}
                className="hidden"
              />

              <label
                htmlFor="screenshot-upload"
                className="mt-4 flex min-h-[220px] w-full max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-[1.35rem] border border-dashed border-[#cfdacb] bg-[#eef2e7] p-4 text-center transition hover:bg-[#e8ede0] sm:min-h-[260px] sm:rounded-[1.5rem] sm:p-5"
              >
                {imagePreviewUrl ? (
                  <div className="w-full max-w-full">
                    <div className="matcha-card relative mx-auto min-h-[240px] w-full max-w-full overflow-hidden rounded-[1.25rem] bg-[#ffffff] p-2 sm:min-h-[320px] sm:max-w-[380px] sm:rounded-[1.5rem] sm:p-3">
                      <Image
                        src={imagePreviewUrl}
                        alt="Uploaded screenshot preview"
                        fill
                        className="object-contain p-2 sm:p-3"
                        unoptimized
                      />
                    </div>
                    <p className="text-safe-wrap mt-4 text-sm font-semibold text-[#2d3436]">
                      {selectedImage?.name}
                    </p>
                    <p className="mt-1 text-xs leading-6 text-[#788082]">
                      Click to replace with another image file.
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fcfaf6] text-3xl shadow-sm">
                      🍵
                    </div>
                    <p className="mt-4 text-base font-semibold text-[#2d3436]">
                      Upload a chat screenshot
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#6f7779]">
                      You can use either pasted chat text or an image screenshot.
                    </p>
                  </div>
                )}
              </label>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
