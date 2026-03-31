"use client";

/* Static illustration of Claude's Cowork UI — adapted for Settle's light theme */

const CHECK = (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
    <path d="M15.188 5.11a.5.5 0 0 1 .752.626l-.056.084-7.5 9a.5.5 0 0 1-.738.033l-3.5-3.5-.064-.078a.501.501 0 0 1 .693-.693l.078.064 3.113 3.113 7.15-8.58z" />
  </svg>
);

const FOLDER = (
  <svg width="48" height="48" viewBox="0 0 40 40" fill="none">
    <path
      d="M7.035 6.5H16.424a2.5 2.5 0 0 1 1.767.732l.744.742A2.5 2.5 0 0 0 21.41 9H33a2.5 2.5 0 0 1 2.5 2.5v3a2.5 2.5 0 0 1-2.5 2.5H7.1a2.5 2.5 0 0 1-2.5-2.471l-.065-5.5A2.5 2.5 0 0 1 7.035 6.5Z"
      fill="#45B3E0"
      stroke="#3BA6D4"
    />
    <path
      d="M4 16.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C6.28 12 7.12 12 8.8 12h22.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C36 14.28 36 15.12 36 16.8v11.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C33.72 33 32.88 33 31.2 33H8.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 30.72 4 29.88 4 28.2V16.8Z"
      fill="#5AC8FA"
    />
  </svg>
);

const CHEVRON = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-[rgba(20,20,19,0.4)]">
    <path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z" />
  </svg>
);

const DOC_ICON = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="rgba(20,20,19,0.35)">
    <path d="M11.586 2a1.5 1.5 0 0 1 1.06.44l2.914 2.914a1.5 1.5 0 0 1 .44 1.06V16.5a1.5 1.5 0 0 1-1.5 1.5h-9a1.5 1.5 0 0 1-1.492-1.347L4 16.5v-13A1.5 1.5 0 0 1 5.5 2zM5.5 3a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h-2.5A1.5 1.5 0 0 1 11 5.5V3z" />
  </svg>
);

const BOOK_ICON = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="rgba(20,20,19,0.35)">
    <path d="M8 4c.82 0 1.544.396 2 1.005A2.5 2.5 0 0 1 12 4h4.5A1.5 1.5 0 0 1 18 5.5v9a1.5 1.5 0 0 1-1.5 1.5h-4.559a1.5 1.5 0 0 0-1.422 1.025l-.044.133a.5.5 0 0 1-.95 0l-.044-.133A1.5 1.5 0 0 0 8.06 16H3.5A1.5 1.5 0 0 1 2 14.5v-9A1.5 1.5 0 0 1 3.5 4zM3.5 5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h4.559c.529 0 1.029.167 1.441.458V6.5A1.5 1.5 0 0 0 8 5zM12 5a1.5 1.5 0 0 0-1.5 1.5v8.958c.412-.29.912-.458 1.441-.458H16.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
  </svg>
);

const SEARCH_ICON = (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="rgba(20,20,19,0.35)">
    <path d="M8.5 2a6.5 6.5 0 0 1 4.935 10.728l4.419 4.419a.5.5 0 0 1-.638.765l-.07-.057-4.418-4.42A6.5 6.5 0 1 1 8.5 2m0 1a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11" />
  </svg>
);

const FOLDER_OPEN = (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="rgba(20,20,19,0.35)">
    <path d="M16.5 3A1.5 1.5 0 0 1 18 4.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 15.5v-9A1.5 1.5 0 0 1 3.5 5h7.293l1.56-1.56a1.5 1.5 0 0 1 1.061-.44zm-3.086 1a.5.5 0 0 0-.354.146L11.354 5.854A.5.5 0 0 1 11 6H3.5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5z" />
  </svg>
);

export default function CoworkDemo({ className = "" }: { className?: string }) {
  return (
    <div className={`hidden min-[500px]:flex justify-center items-center w-full ${className}`}>
      <div className="rounded-2xl w-full h-[70vh] min-h-[500px] max-h-[700px] flex justify-center items-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className="relative w-full h-full rounded-2xl flex justify-center items-center"
            style={{
              backgroundColor: "rgba(20,20,19,0.03)",
              boxShadow: "0 4px 20px 0 rgba(20,20,19,0.04)",
            }}
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl border"
              style={{ borderColor: "rgba(20,20,19,0.06)", backgroundColor: "rgba(255,255,255,0.4)" }}
            >
              {/* Grid background */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(20,20,19,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,19,0.06) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                  backgroundPosition: "24px 24px",
                  animation: "2500ms cubic-bezier(0.22, 1, 0.36, 1) 0s 1 normal forwards running gridReveal",
                }}
              />

              {/* Segmented control */}
              <div className="flex justify-center pt-[60px] relative z-10">
                <div
                  className="relative inline-flex h-10 text-base font-medium p-0.5 select-none min-w-[290px] rounded-[.625rem]"
                  style={{
                    backgroundColor: "rgba(20,20,19,0.06)",
                    boxShadow: "0 11px 23px 0 rgba(0,0,0,0.08)",
                    border: "0.5px solid rgba(20,20,19,0.08)",
                  }}
                >
                  <div className="flex items-center justify-center h-[36px] px-3 rounded-lg whitespace-nowrap flex-1 text-[rgba(20,20,19,0.35)]">
                    Chat
                  </div>
                  <div className="flex items-center justify-center h-[36px] px-3 rounded-lg whitespace-nowrap flex-1 font-medium text-[#141413]">
                    Cowork
                  </div>
                  {/* Active indicator */}
                  <div
                    className="pointer-events-none absolute inset-0 p-0.5 rounded-[.625rem]"
                    style={{ filter: "drop-shadow(0px 0px 0.5px rgba(20,20,19,0.08))" }}
                  >
                    <div
                      className="relative flex h-full rounded-lg"
                      style={{
                        backgroundColor: "white",
                        clipPath: "inset(0px 0% 0px 50% round 8px)",
                      }}
                    >
                      <div className="flex items-center justify-center h-full px-3 whitespace-nowrap flex-1 text-transparent">Chat</div>
                      <div className="flex items-center justify-center h-full px-3 whitespace-nowrap flex-1 font-medium text-[#141413]">Cowork</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating panels */}
              <div className="absolute inset-0 top-32">
                <div className="relative w-full h-full">
                  {/* Left panel — File picker */}
                  <div className="absolute -left-8 top-4 z-[1]" style={{ opacity: 0, animation: "400ms ease-out 650ms 1 normal forwards running panelSlideUp" }}>
                    <div
                      className="rounded-xl overflow-hidden w-[220px]"
                      style={{
                        backgroundColor: "white",
                        border: "0.5px solid rgba(20,20,19,0.08)",
                        boxShadow: "0 17px 35px 0 rgba(0,0,0,0.08)",
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-center gap-2 px-2.5 py-2" style={{ borderBottom: "1px solid rgba(20,20,19,0.06)" }}>
                        <div className="w-5 h-5 rounded bg-[#3B82F6] flex items-center justify-center">
                          <div className="text-white" style={{ width: 12, height: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {FOLDER_OPEN}
                          </div>
                        </div>
                        <div
                          className="flex-1 flex items-center gap-1.5 rounded-md px-2 py-1"
                          style={{ backgroundColor: "rgba(20,20,19,0.04)" }}
                        >
                          <div style={{ width: 12, height: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {SEARCH_ICON}
                          </div>
                          <span className="text-xs" style={{ color: "rgba(20,20,19,0.35)" }}>Search</span>
                        </div>
                      </div>
                      {/* Folders grid */}
                      <div className="grid grid-cols-2 gap-1 p-3">
                        {["Analysis", "Meeting Transcripts", "Quarterly Reports", "Expenses"].map((name) => (
                          <div key={name} className="flex flex-col items-center gap-1 rounded-lg px-2 py-2">
                            {FOLDER}
                            <span className="text-[10px] text-center leading-tight line-clamp-2" style={{ color: "rgba(20,20,19,0.5)" }}>{name}</span>
                          </div>
                        ))}
                      </div>
                      {/* Footer */}
                      <div className="flex justify-end gap-2 px-3 py-2" style={{ borderTop: "1px solid rgba(20,20,19,0.06)" }}>
                        <div className="rounded-md px-4 py-0.5 text-[10px]" style={{ border: "1px solid rgba(20,20,19,0.1)", color: "rgba(20,20,19,0.6)" }}>Cancel</div>
                        <div className="rounded-md bg-[#007AFF] px-4 py-0.5 text-[10px] text-white">Open</div>
                      </div>
                    </div>
                  </div>

                  {/* Center panel — Progress */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-48 z-[1]" style={{ opacity: 0, animation: "400ms ease-out 900ms 1 normal forwards running panelSlideUp" }}>
                    <div
                      className="rounded-xl overflow-hidden w-[280px]"
                      style={{
                        backgroundColor: "white",
                        border: "0.5px solid rgba(20,20,19,0.08)",
                        boxShadow: "0 17px 35px 0 rgba(0,0,0,0.08)",
                      }}
                    >
                      <div className="px-3 pt-2.5 pb-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-[#141413]">Progress</span>
                        {CHEVRON}
                      </div>
                      <div className="px-3 pb-3">
                        {[
                          "Read meeting transcripts",
                          "Pull out key points",
                          "Find action items",
                          "Check Google Calendar",
                          "Build standup deck",
                          "Write summary",
                        ].map((step, i) => (
                          <div key={i} className="flex">
                            <div className="flex flex-col items-center mr-3">
                              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                                <div className="text-white" style={{ width: 12, height: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  {CHECK}
                                </div>
                              </div>
                            </div>
                            <div className={`text-sm ${i < 5 ? "pb-3" : "pb-0"}`}>
                              <span className="line-through" style={{ color: "rgba(20,20,19,0.3)" }}>{step}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right panel — Context */}
                  <div className="absolute -right-2 top-12 z-[1]" style={{ opacity: 0, animation: "400ms ease-out 1150ms 1 normal forwards running panelSlideUp" }}>
                    <div
                      className="rounded-xl overflow-hidden w-[200px]"
                      style={{
                        backgroundColor: "white",
                        border: "0.5px solid rgba(20,20,19,0.08)",
                        boxShadow: "0 17px 35px 0 rgba(0,0,0,0.08)",
                      }}
                    >
                      <div className="px-3 py-2.5 flex items-center justify-between">
                        <span className="text-sm font-medium text-[#141413]">Context</span>
                        {CHEVRON}
                      </div>
                      <div className="flex flex-col pb-2">
                        {[
                          { icon: DOC_ICON, label: "Meeting Transcripts" },
                          { icon: BOOK_ICON, label: "SKILL.md" },
                          { icon: null, label: "Claude in Chrome", imgSrc: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='rgba(20,20,19,0.35)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='3' width='20' height='14' rx='2' ry='2'/%3E%3Cline x1='8' y1='21' x2='16' y2='21'/%3E%3Cline x1='12' y1='17' x2='12' y2='21'/%3E%3C/svg%3E" },
                          { icon: null, label: "Notion", imgText: "N" },
                          { icon: null, label: "Linear", imgText: "L" },
                        ].map((item, i) => (
                          <div key={i} className="mx-2 px-2 py-2 flex items-center gap-3 rounded-lg">
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden shrink-0"
                              style={{ backgroundColor: "rgba(20,20,19,0.03)", border: "0.5px solid rgba(20,20,19,0.08)" }}
                            >
                              {item.icon ? (
                                <div style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  {item.icon}
                                </div>
                              ) : item.imgText ? (
                                <span className="text-xs font-medium" style={{ color: "rgba(20,20,19,0.4)" }}>{item.imgText}</span>
                              ) : (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={item.imgSrc} alt="" width={18} height={18} className="object-contain" />
                              )}
                            </div>
                            <span className="text-sm truncate" style={{ color: "rgba(20,20,19,0.6)" }}>{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
