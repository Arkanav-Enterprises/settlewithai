"use client";

import { useState } from "react";

/* ─── Interactive Claude demo — Chat + Cowork toggle ─── */

const CLAUDE_SPARK = (
  <svg width="16" height="16" viewBox="0 0 26 27" fill="none">
    <path d="M5.1373 17.4108L10.2887 14.5221L10.4303 14.2989L10.2887 14.1282H10.034L9.17071 14.0757L6.22703 13.9969L3.67961 13.8919L1.20295 13.7606H0.806683L0.580246 13.6293L0.297199 13.3666L0.0566093 13.1172L0 12.8546L0.0566093 12.4738L0.226437 12.1849L0.367961 12.1193H0.580246L1.33032 12.1849L2.98614 12.3031L5.47695 12.4738L7.2743 12.5788L9.94909 12.8546H10.3737L10.4303 12.6839L10.2887 12.5788L10.1755 12.4738L7.5998 10.7275L4.81179 8.88921L3.3541 7.82566L2.57573 7.28732L2.17946 6.78837L2.00963 6.42072L1.92472 6.03994L2.00963 5.68542L2.17946 5.37029L2.39174 5.13395L2.71725 4.8976H3.07106L3.67961 4.96325L3.9202 5.0289L4.89671 5.77733L6.9771 7.39236L9.69435 9.38817L10.0906 9.71642H10.2746V9.5326L10.0906 9.2306L8.61877 6.56515L7.04786 3.84718L6.34025 2.71797L6.15627 2.04833C6.11853 1.89952 6.04305 1.59927 6.04305 1.58877V1.24738L6.18457 0.827209L6.43931 0.393909L6.84973 0.144433L7.30261 0H7.65641L7.91116 0.0393909L8.39233 0.144433L8.84521 0.538342L9.52452 2.08772L10.6143 4.51682L12.3125 7.82566L12.8079 8.81043L13.0768 9.71642L13.1758 9.99216H13.3457V9.83459L13.4872 7.97009L13.7419 5.68542L13.9967 2.74423L14.0816 1.91702L14.492 0.919121L14.6901 0.682776L15.0864 0.380779H15.3128L15.9497 0.682776L16.3176 1.08982L16.4733 1.4312L16.4026 1.91702L16.0912 3.93909L15.4827 7.10349L15.0864 9.2306H15.3128L15.5817 8.95487L16.6573 7.53679L18.4546 5.27838L19.2472 4.38552L20.1812 3.40075L20.7756 2.92806L21.2993 2.74423L21.9078 2.92806L22.4456 3.37449L22.7287 4.16231V4.51682L22.3607 5.43594L21.2002 6.90654L20.2378 8.15392L19.6434 9.11243L18.0018 11.489V11.5941H18.2848L21.3983 10.9244L23.0825 10.6224L25.0921 10.281L25.4884 10.3861L25.9978 10.7012L26.0969 11.1345L25.9978 11.6597L25.7431 12.0142L23.5919 12.5394L21.0728 13.0515L17.3215 13.9346C17.2972 13.9403 17.28 13.9621 17.28 13.9871C17.28 14.0149 17.3013 14.0382 17.329 14.0407L19.0207 14.1939L19.7425 14.2332H21.5116L24.809 14.4827L25.6723 15.0473L26.0969 15.3756L26.1818 15.7432L26.0969 16.2816L25.9271 16.531L25.2195 16.8593L24.7666 16.9512L22.9834 16.531L18.8085 15.5331L17.3791 15.1786H17.1809V15.2968L18.3697 16.4654L20.5633 18.4349L23.2947 20.9822L23.4363 21.4286V21.6125L23.0825 22.1114L22.7853 22.1246L22.7145 22.0589L20.3086 20.2469L20.1246 20.1681L19.3745 19.4328L17.28 17.6603H17.1385V17.8441L17.6197 18.5531L20.1812 22.4003L20.3086 23.582L20.1246 23.9628L19.4595 24.1991L19.0915 24.1466L18.7377 24.0678L18.4263 23.7921L17.2234 21.9539L15.6808 19.5904L14.4354 17.4633H14.3892C14.3352 17.4633 14.29 17.5044 14.285 17.5583L13.5438 25.4728L13.2041 25.8798L12.5107 26.1818H12.4116L11.7464 25.6829L11.3926 24.8688L11.7464 23.2538L12.171 21.1529L12.5107 19.4854L12.822 17.4108L13.0122 16.7177C13.0169 16.7003 13.0102 16.6817 12.9954 16.6714C12.9462 16.6372 12.8787 16.6485 12.8435 16.6969L11.2794 18.842L8.90182 22.0589L7.01956 24.0678L6.56668 24.2517H6.22703L5.78831 23.8446V23.6477L5.85907 23.1225L6.29779 22.4791L8.90182 19.1702L10.4727 17.1088L11.4852 15.9255C11.5284 15.875 11.524 15.7995 11.4753 15.7543C11.46 15.7401 11.4369 15.7381 11.4194 15.7495L4.50044 20.2601L3.26919 20.4176L2.7314 19.9187L2.80216 19.1046L3.0569 18.842L5.1373 17.4108Z" fill="#d97757" />
  </svg>
);

const CHECK = (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
    <path d="M15.188 5.11a.5.5 0 0 1 .752.626l-.056.084-7.5 9a.5.5 0 0 1-.738.033l-3.5-3.5-.064-.078a.501.501 0 0 1 .693-.693l.078.064 3.113 3.113 7.15-8.58z" />
  </svg>
);

const FOLDER = (
  <svg width="48" height="48" viewBox="0 0 40 40" fill="none">
    <path d="M7.035 6.5H16.424a2.5 2.5 0 0 1 1.767.732l.744.742A2.5 2.5 0 0 0 21.41 9H33a2.5 2.5 0 0 1 2.5 2.5v3a2.5 2.5 0 0 1-2.5 2.5H7.1a2.5 2.5 0 0 1-2.5-2.471l-.065-5.5A2.5 2.5 0 0 1 7.035 6.5Z" fill="#45B3E0" stroke="#3BA6D4" />
    <path d="M4 16.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C6.28 12 7.12 12 8.8 12h22.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C36 14.28 36 15.12 36 16.8v11.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C33.72 33 32.88 33 31.2 33H8.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 30.72 4 29.88 4 28.2V16.8Z" fill="#5AC8FA" />
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

const GLOBE_ICON = (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="rgba(20,20,19,0.3)">
    <path d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm.5 1.02V5.5a.5.5 0 0 0 .5.5h2.05A7.003 7.003 0 0 0 10.5 3.02zM9.5 3.02A7.003 7.003 0 0 0 6.95 6H9a.5.5 0 0 0 .5-.5V3.02zM6.27 7A7.03 7.03 0 0 0 3.02 9.5H6.5A.5.5 0 0 0 7 9V7.27a2 2 0 0 1-.73-.27zm.73 3a.5.5 0 0 0-.5.5v2.55A7.003 7.003 0 0 0 9.5 16.98V12.5a.5.5 0 0 0-.5-.5H7zm3.5 0a.5.5 0 0 0-.5.5v4.48a7.003 7.003 0 0 0 3.05-2.98H11a.5.5 0 0 0-.5-.5z" />
  </svg>
);

/* ─── Panel styles ─── */
const panelStyle = {
  backgroundColor: "white",
  border: "0.5px solid rgba(20,20,19,0.08)",
  boxShadow: "0 17px 35px 0 rgba(0,0,0,0.08)",
};

const borderSubtle = "1px solid rgba(20,20,19,0.06)";

/* ─── Chat View ─── */
function ChatView() {
  return (
    <div className="absolute inset-0 top-32 px-6 md:px-10 overflow-hidden">
      <div className="max-w-lg mx-auto space-y-5">
        {/* User message 1 */}
        <div style={{ opacity: 0, animation: "400ms ease-out 500ms forwards panelSlideUp" }}>
          <div
            className="inline-block rounded-2xl px-4 py-3 text-sm max-w-[90%] ml-auto"
            style={{
              backgroundColor: "rgba(20,20,19,0.06)",
              color: "#141413",
              float: "right",
            }}
          >
            How should I structure this project proposal?
          </div>
        </div>

        <div className="clear-both" />

        {/* Claude response */}
        <div style={{ opacity: 0, animation: "400ms ease-out 800ms forwards panelSlideUp" }}>
          <div className="flex items-start gap-2.5">
            <div className="shrink-0 mt-0.5">{CLAUDE_SPARK}</div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(20,20,19,0.6)" }}>
              I&apos;d go with: Problem &rarr; Solution &rarr; Timeline &rarr; Ask. Keep it tight &mdash; one page max. The trick is making the problem feel urgent before you pitch the fix.
            </p>
          </div>
        </div>

        {/* User message 2 */}
        <div style={{ opacity: 0, animation: "400ms ease-out 1100ms forwards panelSlideUp" }}>
          <div
            className="inline-block rounded-2xl px-4 py-3 text-sm max-w-[90%] ml-auto"
            style={{
              backgroundColor: "rgba(20,20,19,0.06)",
              color: "#141413",
              float: "right",
            }}
          >
            Can you find some examples of successful proposals in our industry?
          </div>
        </div>

        <div className="clear-both" />

        {/* Search results */}
        <div style={{ opacity: 0, animation: "400ms ease-out 1400ms forwards panelSlideUp" }}>
          <div className="flex items-start gap-2.5">
            <div className="shrink-0 mt-0.5">{CLAUDE_SPARK}</div>
            <div className="space-y-2 flex-1">
              <span className="text-sm" style={{ color: "rgba(20,20,19,0.5)" }}>Searching the web</span>
              <div className="space-y-1.5">
                {[
                  { label: "Searching the web", detail: "4 results" },
                  { label: "hbr.org", detail: "hbr.org" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs" style={{ color: "rgba(20,20,19,0.35)" }}>
                    {GLOBE_ICON}
                    <span className="flex-1">{r.label}</span>
                    <span>{r.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Cowork View ─── */
function CoworkView() {
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);

  const folders = ["Analysis", "Meeting Transcripts", "Quarterly Reports", "Expenses"];
  const tooltips: Record<string, string> = {
    "Meeting Transcripts": "I can summarize your meetings",
    "Analysis": "I can analyze your data",
    "Quarterly Reports": "I can compile your reports",
    "Expenses": "I can categorize your expenses",
  };

  return (
    <div className="absolute inset-0 top-32">
      <div className="relative w-full h-full">
        {/* Left panel — File picker */}
        <div
          className="absolute -left-8 top-4 z-[2]"
          style={{ opacity: 0, animation: "400ms ease-out 650ms 1 normal forwards running panelSlideUp" }}
        >
          <div className="rounded-xl overflow-hidden w-[220px]" style={panelStyle}>
            <div className="flex items-center gap-2 px-2.5 py-2" style={{ borderBottom: borderSubtle }}>
              <div className="w-5 h-5 rounded bg-[#3B82F6] flex items-center justify-center">
                <div className="text-white" style={{ width: 12, height: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {FOLDER_OPEN}
                </div>
              </div>
              <div className="flex-1 flex items-center gap-1.5 rounded-md px-2 py-1" style={{ backgroundColor: "rgba(20,20,19,0.04)" }}>
                <div style={{ width: 12, height: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{SEARCH_ICON}</div>
                <span className="text-xs" style={{ color: "rgba(20,20,19,0.35)" }}>Search</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 p-3 relative">
              {folders.map((name) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-1 rounded-lg px-2 py-2 transition-colors duration-150 cursor-default relative"
                  style={{ backgroundColor: hoveredFolder === name ? "rgba(20,20,19,0.04)" : "transparent" }}
                  onMouseEnter={() => setHoveredFolder(name)}
                  onMouseLeave={() => setHoveredFolder(null)}
                >
                  {FOLDER}
                  <span
                    className="text-[10px] text-center leading-tight line-clamp-2 transition-all duration-150"
                    style={{
                      color: hoveredFolder === name ? "#141413" : "rgba(20,20,19,0.5)",
                      fontWeight: hoveredFolder === name ? 500 : 400,
                    }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 px-3 py-2" style={{ borderTop: borderSubtle }}>
              <div className="rounded-md px-4 py-0.5 text-[10px]" style={{ border: "1px solid rgba(20,20,19,0.1)", color: "rgba(20,20,19,0.6)" }}>Cancel</div>
              <div className="rounded-md bg-[#007AFF] px-4 py-0.5 text-[10px] text-white">Open</div>
            </div>
          </div>

          {/* Tooltip bubble */}
          {hoveredFolder && tooltips[hoveredFolder] && (
            <div
              className="absolute left-[230px] top-1/2 -translate-y-1/2 z-10 flex items-center gap-2 rounded-full px-4 py-2.5 whitespace-nowrap text-sm"
              style={{
                backgroundColor: "white",
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                border: "0.5px solid rgba(20,20,19,0.08)",
                animation: "200ms ease-out forwards panelSlideUp",
              }}
            >
              {CLAUDE_SPARK}
              <span style={{ color: "#141413" }}>{tooltips[hoveredFolder]}</span>
            </div>
          )}
        </div>

        {/* Center panel — Progress */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-48 z-[1] transition-all duration-300"
          style={{
            opacity: 0,
            animation: "400ms ease-out 900ms 1 normal forwards running panelSlideUp",
            filter: hoveredFolder ? "blur(2px)" : "none",
          }}
        >
          <div className="rounded-xl overflow-hidden w-[280px]" style={panelStyle}>
            <div className="px-3 pt-2.5 pb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-[#141413]">Progress</span>
              {CHEVRON}
            </div>
            <div className="px-3 pb-3">
              {["Read meeting transcripts", "Pull out key points", "Find action items", "Check Google Calendar", "Build standup deck", "Write summary"].map((step, i) => (
                <div key={i} className="flex">
                  <div className="flex flex-col items-center mr-3">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <div className="text-white" style={{ width: 12, height: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{CHECK}</div>
                    </div>
                  </div>
                  <div className={i < 5 ? "text-sm pb-3" : "text-sm pb-0"}>
                    <span className="line-through" style={{ color: "rgba(20,20,19,0.3)" }}>{step}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel — Context */}
        <div
          className="absolute -right-2 top-12 z-[1] transition-all duration-300"
          style={{
            opacity: 0,
            animation: "400ms ease-out 1150ms 1 normal forwards running panelSlideUp",
            filter: hoveredFolder ? "blur(2px)" : "none",
          }}
        >
          <div className="rounded-xl overflow-hidden w-[200px]" style={panelStyle}>
            <div className="px-3 py-2.5 flex items-center justify-between">
              <span className="text-sm font-medium text-[#141413]">Context</span>
              {CHEVRON}
            </div>
            <div className="flex flex-col pb-2">
              {[
                { icon: DOC_ICON, label: "Meeting Transcripts" },
                { icon: BOOK_ICON, label: "SKILL.md" },
                { icon: null, label: "Claude in Chrome", letter: null, imgSrc: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='rgba(20,20,19,0.35)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='3' width='20' height='14' rx='2' ry='2'/%3E%3Cline x1='8' y1='21' x2='16' y2='21'/%3E%3Cline x1='12' y1='17' x2='12' y2='21'/%3E%3C/svg%3E" },
                { icon: null, label: "Notion", letter: "N", imgSrc: null },
                { icon: null, label: "Linear", letter: "L", imgSrc: null },
              ].map((item, i) => (
                <div key={i} className="mx-2 px-2 py-2 flex items-center gap-3 rounded-lg">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden shrink-0"
                    style={{ backgroundColor: "rgba(20,20,19,0.03)", border: "0.5px solid rgba(20,20,19,0.08)" }}
                  >
                    {item.icon ? (
                      <div style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</div>
                    ) : item.letter ? (
                      <span className="text-xs font-medium" style={{ color: "rgba(20,20,19,0.4)" }}>{item.letter}</span>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.imgSrc!} alt="" width={18} height={18} className="object-contain" />
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
  );
}

/* ─── Main Component ─── */

export default function CoworkDemo({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<"chat" | "cowork">("cowork");

  return (
    <div className={`hidden min-[500px]:flex justify-center items-center w-full ${className}`}>
      <div className="rounded-2xl w-full h-[70vh] min-h-[500px] max-h-[700px] flex justify-center items-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className="relative w-full h-full rounded-2xl flex justify-center items-center"
            style={{ backgroundColor: "rgba(20,20,19,0.03)", boxShadow: "0 4px 20px 0 rgba(20,20,19,0.04)" }}
          >
            <div
              className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl border"
              style={{ borderColor: "rgba(20,20,19,0.06)", backgroundColor: "rgba(255,255,255,0.4)" }}
            >
              {/* Grid background */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(20,20,19,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,19,0.06) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                  backgroundPosition: "24px 24px",
                  opacity: activeTab === "cowork" ? 1 : 0,
                }}
              />

              {/* Segmented control */}
              <div className="flex justify-center pt-[60px] relative z-20">
                <div
                  className="relative inline-flex h-10 text-base font-medium p-0.5 select-none min-w-[290px] rounded-[.625rem]"
                  style={{
                    backgroundColor: "rgba(20,20,19,0.06)",
                    boxShadow: "0 11px 23px 0 rgba(0,0,0,0.08)",
                    border: "0.5px solid rgba(20,20,19,0.08)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab("chat")}
                    className="flex items-center justify-center h-[36px] px-3 rounded-lg whitespace-nowrap flex-1 transition-colors duration-250 cursor-pointer relative z-10"
                    style={{ color: activeTab === "chat" ? "#141413" : "rgba(20,20,19,0.35)" }}
                  >
                    Chat
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("cowork")}
                    className="flex items-center justify-center h-[36px] px-3 rounded-lg whitespace-nowrap flex-1 transition-colors duration-250 cursor-pointer relative z-10"
                    style={{ color: activeTab === "cowork" ? "#141413" : "rgba(20,20,19,0.35)" }}
                  >
                    Cowork
                  </button>
                  {/* Sliding indicator */}
                  <div className="pointer-events-none absolute inset-0 p-0.5 rounded-[.625rem]" style={{ filter: "drop-shadow(0px 0px 0.5px rgba(20,20,19,0.08))" }}>
                    <div
                      className="relative flex h-full rounded-lg transition-[clip-path] duration-250 ease-out"
                      style={{
                        backgroundColor: "white",
                        clipPath: activeTab === "chat"
                          ? "inset(0px 50% 0px 0% round 8px)"
                          : "inset(0px 0% 0px 50% round 8px)",
                      }}
                    >
                      <div className="flex items-center justify-center h-full px-3 whitespace-nowrap flex-1 font-medium text-[#141413]">Chat</div>
                      <div className="flex items-center justify-center h-full px-3 whitespace-nowrap flex-1 font-medium text-[#141413]">Cowork</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Views */}
              <div
                className="absolute inset-0 top-0 transition-opacity duration-300"
                style={{ opacity: activeTab === "cowork" ? 1 : 0, pointerEvents: activeTab === "cowork" ? "auto" : "none" }}
              >
                <CoworkView />
              </div>
              <div
                className="absolute inset-0 top-0 transition-opacity duration-300"
                style={{ opacity: activeTab === "chat" ? 1 : 0, pointerEvents: activeTab === "chat" ? "auto" : "none" }}
              >
                <ChatView />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
