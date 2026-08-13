"use client";

export function StatusBanner({
  message,
  error,
}: {
  message: string;
  error?: boolean;
}) {
  if (!message) return null;
  return (
    <div
      className={`mb-4 rounded-lg border px-4 py-2 text-sm ${
        error
          ? "border-red-500/30 bg-red-500/10 text-red-300"
          : "border-green-500/30 bg-green-500/10 text-green-300"
      }`}
    >
      {message}
    </div>
  );
}
