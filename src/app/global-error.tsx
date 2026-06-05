"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "sans-serif" }}>
          <div style={{ textAlign: "center", maxWidth: 400 }}>
            <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8, color: "#ef4444" }}>
              加载出错了
            </h1>
            <p style={{ color: "#666", marginBottom: 16 }}>
              {error.message || "页面加载时发生错误"}
            </p>
            <button
              onClick={() => reset()}
              style={{
                padding: "8px 24px", borderRadius: 8, border: "none",
                background: "#6366f1", color: "white", fontSize: 14, cursor: "pointer",
              }}
            >
              重试
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
