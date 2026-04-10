"use client";

import { useState, useEffect } from "react";

/* ─── SVG Icons ─── */
const CLAUDE_SPARK = (
  <svg width="16" height="16" viewBox="0 0 26 27" fill="none" className="shrink-0">
    <path d="M5.1373 17.4108L10.2887 14.5221L10.4303 14.2989L10.2887 14.1282H10.034L9.17071 14.0757L6.22703 13.9969L3.67961 13.8919L1.20295 13.7606H0.806683L0.580246 13.6293L0.297199 13.3666L0.0566093 13.1172L0 12.8546L0.0566093 12.4738L0.226437 12.1849L0.367961 12.1193H0.580246L1.33032 12.1849L2.98614 12.3031L5.47695 12.4738L7.2743 12.5788L9.94909 12.8546H10.3737L10.4303 12.6839L10.2887 12.5788L10.1755 12.4738L7.5998 10.7275L4.81179 8.88921L3.3541 7.82566L2.57573 7.28732L2.17946 6.78837L2.00963 6.42072L1.92472 6.03994L2.00963 5.68542L2.17946 5.37029L2.39174 5.13395L2.71725 4.8976H3.07106L3.67961 4.96325L3.9202 5.0289L4.89671 5.77733L6.9771 7.39236L9.69435 9.38817L10.0906 9.71642H10.2746V9.5326L10.0906 9.2306L8.61877 6.56515L7.04786 3.84718L6.34025 2.71797L6.15627 2.04833C6.11853 1.89952 6.04305 1.59927 6.04305 1.58877V1.24738L6.18457 0.827209L6.43931 0.393909L6.84973 0.144433L7.30261 0H7.65641L7.91116 0.0393909L8.39233 0.144433L8.84521 0.538342L9.52452 2.08772L10.6143 4.51682L12.3125 7.82566L12.8079 8.81043L13.0768 9.71642L13.1758 9.99216H13.3457V9.83459L13.4872 7.97009L13.7419 5.68542L13.9967 2.74423L14.0816 1.91702L14.492 0.919121L14.6901 0.682776L15.0864 0.380779H15.3128L15.9497 0.682776L16.3176 1.08982L16.4733 1.4312L16.4026 1.91702L16.0912 3.93909L15.4827 7.10349L15.0864 9.2306H15.3128L15.5817 8.95487L16.6573 7.53679L18.4546 5.27838L19.2472 4.38552L20.1812 3.40075L20.7756 2.92806L21.2993 2.74423L21.9078 2.92806L22.4456 3.37449L22.7287 4.16231V4.51682L22.3607 5.43594L21.2002 6.90654L20.2378 8.15392L19.6434 9.11243L18.0018 11.489V11.5941H18.2848L21.3983 10.9244L23.0825 10.6224L25.0921 10.281L25.4884 10.3861L25.9978 10.7012L26.0969 11.1345L25.9978 11.6597L25.7431 12.0142L23.5919 12.5394L21.0728 13.0515L17.3215 13.9346C17.2972 13.9403 17.28 13.9621 17.28 13.9871C17.28 14.0149 17.3013 14.0382 17.329 14.0407L19.0207 14.1939L19.7425 14.2332H21.5116L24.809 14.4827L25.6723 15.0473L26.0969 15.3756L26.1818 15.7432L26.0969 16.2816L25.9271 16.531L25.2195 16.8593L24.7666 16.9512L22.9834 16.531L18.8085 15.5331L17.3791 15.1786H17.1809V15.2968L18.3697 16.4654L20.5633 18.4349L23.2947 20.9822L23.4363 21.4286V21.6125L23.0825 22.1114L22.7853 22.1246L22.7145 22.0589L20.3086 20.2469L20.1246 20.1681L19.3745 19.4328L17.28 17.6603H17.1385V17.8441L17.6197 18.5531L20.1812 22.4003L20.3086 23.582L20.1246 23.9628L19.4595 24.1991L19.0915 24.1466L18.7377 24.0678L18.4263 23.7921L17.2234 21.9539L15.6808 19.5904L14.4354 17.4633H14.3892C14.3352 17.4633 14.29 17.5044 14.285 17.5583L13.5438 25.4728L13.2041 25.8798L12.5107 26.1818H12.4116L11.7464 25.6829L11.3926 24.8688L11.7464 23.2538L12.171 21.1529L12.5107 19.4854L12.822 17.4108L13.0122 16.7177C13.0169 16.7003 13.0102 16.6817 12.9954 16.6714C12.9462 16.6372 12.8787 16.6485 12.8435 16.6969L11.2794 18.842L8.90182 22.0589L7.01956 24.0678L6.56668 24.2517H6.22703L5.78831 23.8446V23.6477L5.85907 23.1225L6.29779 22.4791L8.90182 19.1702L10.4727 17.1088L11.4852 15.9255C11.5284 15.875 11.524 15.7995 11.4753 15.7543C11.46 15.7401 11.4369 15.7381 11.4194 15.7495L4.50044 20.2601L3.26919 20.4176L2.7314 19.9187L2.80216 19.1046L3.0569 18.842L5.1373 17.4108Z" fill="#d97757" />
  </svg>
);

const FOLDER_SVG = (
  <svg width="48" height="48" viewBox="0 0 40 40" fill="none">
    <path d="M7.035 6.5H16.424a2.5 2.5 0 0 1 1.767.732l.744.742A2.5 2.5 0 0 0 21.41 9H33a2.5 2.5 0 0 1 2.5 2.5v3a2.5 2.5 0 0 1-2.5 2.5H7.1a2.5 2.5 0 0 1-2.5-2.471l-.065-5.5A2.5 2.5 0 0 1 7.035 6.5Z" fill="#45B3E0" stroke="#3BA6D4" />
    <path d="M4 16.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C6.28 12 7.12 12 8.8 12h22.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C36 14.28 36 15.12 36 16.8v11.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C33.72 33 32.88 33 31.2 33H8.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 30.72 4 29.88 4 28.2V16.8Z" fill="#5AC8FA" />
  </svg>
);

const P = { backgroundColor: "white", border: "0.5px solid rgba(20,20,19,0.08)", boxShadow: "0 17px 35px 0 rgba(0,0,0,0.15)" } as const;

const steps = ["Reading vendor specifications", "Extract pricing tiers", "Cross-reference with current BOMs", "Check delivery timelines", "Generate comparison table", "Draft recommendation"];

/* Tooltip content for hoverable items */
const tooltipData: Record<string, string> = {
  "BOM Templates": "I can generate and validate bills of materials",
  "Vendor RFQs": "I can compare vendor quotes against your current costs",
  "Production Reports": "I can spot trends and flag anomalies in output data",
  "Service Logs": "I can diagnose issues from maintenance and service records",
  "Pricing Rules": "Teach me your margins and I\u2019ll price every order consistently",
  "SAP Connector": "I can read and write to your ERP system via MCP",
  SharePoint: "I can pull specs, SOPs, and reports from your document library",
  "Service DB": "I can search service history and suggest troubleshooting steps",
};

/* ─── Tooltip — absolutely positioned, doesn't affect layout ─── */
function Tooltip({ text, side }: { text: string; side: "left" | "right" }) {
  return (
    <div
      className="pointer-events-none"
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        ...(side === "left" ? { left: "calc(100% + 12px)" } : { right: "calc(100% + 12px)" }),
        zIndex: 50,
        animation: "200ms ease-out forwards panelSlideUp",
      }}
    >
      <div className="flex items-center gap-2.5 rounded-2xl px-4 py-3" style={{ backgroundColor: "#1a1a19", boxShadow: "0 12px 40px rgba(0,0,0,0.25)", width: 240 }}>
        <div className="shrink-0">{CLAUDE_SPARK}</div>
        <span className="text-[13px] text-white leading-[1.4]">{text}</span>
      </div>
    </div>
  );
}

const STACK_ICON = (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="rgba(20,20,19,0.4)" strokeWidth="1.5" className="shrink-0 mt-px">
    <path d="M2 7l8-4 8 4-8 4-8-4z" /><path d="M2 12l8 4 8-4" /><path d="M2 17l8 4 8-4" />
  </svg>
);

const CHECK_ICON = (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="rgba(20,20,19,0.4)" strokeWidth="1.5" className="shrink-0">
    <circle cx="10" cy="10" r="8" /><path d="M6.5 10.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PROJECT_FILES = [
  "SAMPLE OFFER OFFSET 3.docx",
  "SAMPLE OFFER OFFSET 4.docx",
  "WEB_OFFSET_Price_List.xlsx",
  "Orient logo.png",
];

const DOC_STEPS = [
  "Applying Orient brand & logo",
  "Embedding machine images",
  "Formatting pricing table",
];

const RESPONSE_TEXT =
  "Found the offset price list and 2 sample offer templates. Building the offer document for ABC Packaging now — 4-colour web offset, 889mm web width.";

/* ─── Chat View — light mode, Orient doc generation sequence ─── */
function ChatView() {
  const [displayText, setDisplayText] = useState("");
  const [showDocGen, setShowDocGen] = useState(false);
  const [docGenStep, setDocGenStep] = useState(0);
  const [showDoc, setShowDoc] = useState(false);

  useEffect(() => {
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];
    let intervalId: ReturnType<typeof setInterval>;

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timeoutIds.push(id);
    };

    schedule(() => {
      let i = 0;
      intervalId = setInterval(() => {
        i++;
        setDisplayText(RESPONSE_TEXT.slice(0, i));
        if (i >= RESPONSE_TEXT.length) {
          clearInterval(intervalId);
          schedule(() => setShowDocGen(true), 400);
          schedule(() => setDocGenStep(1), 700);
          schedule(() => setDocGenStep(2), 1150);
          schedule(() => setDocGenStep(3), 1600);
          schedule(() => { setDocGenStep(DOC_STEPS.length + 1); setShowDoc(true); }, 2200);
        }
      }, 16);
    }, 1450);

    return () => {
      timeoutIds.forEach(clearTimeout);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-y-auto"
      style={{
        top: "8rem",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(217,119,87,0.3) transparent",
      }}
    >
      <div className="max-w-[560px] mx-auto px-8 pt-2 pb-8 space-y-5">

        {/* User message */}
        <div className="flex justify-end" style={{ opacity: 0, animation: "400ms ease-out 300ms forwards panelSlideUp" }}>
          <div
            className="rounded-2xl rounded-br-md px-5 py-3.5 text-[14px] leading-relaxed max-w-[85%]"
            style={{ backgroundColor: "#141413", color: "white" }}
          >
            Hello, I&rsquo;d like to generate an offer for a web offset machine please.
          </div>
        </div>

        {/* Tool use: project file search */}
        <div style={{ opacity: 0, animation: "400ms ease-out 650ms forwards panelSlideUp" }}>
          <div className="flex items-start gap-2 mb-2.5" style={{ color: "rgba(20,20,19,0.45)" }}>
            {STACK_ICON}
            <span className="text-[13px]">Searched project for &ldquo;web offset machine price list configurations&rdquo;</span>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="rgba(20,20,19,0.35)" className="shrink-0 mt-0.5 ml-auto">
              <path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z" />
            </svg>
          </div>
          <div
            className="rounded-xl overflow-hidden ml-5"
            style={{ border: "1px solid rgba(20,20,19,0.09)", backgroundColor: "rgba(20,20,19,0.02)" }}
          >
            {PROJECT_FILES.map((file, i) => (
              <div
                key={file}
                className="flex items-center justify-between px-4 py-2.5"
                style={{
                  borderTop: i > 0 ? "1px solid rgba(20,20,19,0.06)" : "none",
                  opacity: 0,
                  animation: `250ms ease-out ${800 + i * 100}ms forwards panelSlideUp`,
                }}
              >
                <span className="text-[12px] truncate pr-4" style={{ color: "rgba(20,20,19,0.6)", fontFamily: "var(--font-mono, monospace)" }}>{file}</span>
                <span
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0"
                  style={{ backgroundColor: "rgba(20,20,19,0.06)", color: "rgba(20,20,19,0.4)", letterSpacing: "0.04em" }}
                >
                  TEXT
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Done */}
        <div
          className="flex items-center gap-2 ml-5"
          style={{ opacity: 0, animation: "300ms ease-out 1250ms forwards panelSlideUp", color: "rgba(20,20,19,0.45)" }}
        >
          {CHECK_ICON}
          <span className="text-[13px]">Done</span>
        </div>

        {/* Claude response — streams character by character */}
        {displayText && (
          <p className="text-[14px] leading-[1.75]" style={{ color: "rgba(20,20,19,0.72)" }}>
            {displayText}
            {displayText.length < RESPONSE_TEXT.length && (
              <span
                className="inline-block w-[2px] h-[1em] ml-[1px] align-middle rounded-sm"
                style={{ backgroundColor: "rgba(20,20,19,0.4)", animation: "700ms step-end infinite cursorBlink" }}
              />
            )}
          </p>
        )}

        {/* Document generation tool use */}
        {showDocGen && (
          <div style={{ opacity: 0, animation: "350ms ease-out forwards panelSlideUp" }}>
            <div className="flex items-start gap-2 mb-2.5" style={{ color: "rgba(20,20,19,0.45)" }}>
              {/* Pencil / write icon */}
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="rgba(20,20,19,0.4)" strokeWidth="1.5" className="shrink-0 mt-px">
                <path d="M13.586 3.586a2 2 0 1 1 2.828 2.828l-9 9A2 2 0 0 1 6 16H4v-2a2 2 0 0 1 .586-1.414l9-9z" strokeLinejoin="round" />
              </svg>
              <span className="text-[13px]">Generating offer document</span>
              <svg width="14" height="14" viewBox="0 0 20 20" fill="rgba(20,20,19,0.35)" className="shrink-0 mt-0.5 ml-auto">
                <path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z" />
              </svg>
            </div>
            <div
              className="rounded-xl overflow-hidden ml-5"
              style={{ border: "1px solid rgba(20,20,19,0.09)", backgroundColor: "rgba(20,20,19,0.02)" }}
            >
              {DOC_STEPS.map((step, i) => {
                const done = docGenStep > i + 1;
                const active = docGenStep === i + 1;
                const pending = docGenStep < i + 1;
                return (
                  <div
                    key={step}
                    className="flex items-center gap-3 px-4 py-2.5"
                    style={{ borderTop: i > 0 ? "1px solid rgba(20,20,19,0.06)" : "none" }}
                  >
                    {done ? (
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#d97757" strokeWidth="1.8" className="shrink-0">
                        <circle cx="10" cy="10" r="8" /><path d="M6.5 10.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : active ? (
                      /* spinning ring */
                      <svg className="shrink-0 progress-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="rgba(20,20,19,0.1)" strokeWidth="2.5" />
                        <circle cx="12" cy="12" r="10" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="20 43" />
                      </svg>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: "rgba(20,20,19,0.08)" }} />
                    )}
                    <span
                      className="text-[12px]"
                      style={{
                        color: done ? "rgba(20,20,19,0.3)" : active ? "rgba(20,20,19,0.7)" : "rgba(20,20,19,0.3)",
                        textDecoration: done ? "line-through" : "none",
                        fontWeight: active ? 500 : 400,
                      }}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Final document card */}
        {showDoc && (
          <div
            className="rounded-xl overflow-hidden"
            style={{
              border: "1px solid rgba(20,20,19,0.09)",
              borderLeft: "3px solid #de2127",
              backgroundColor: "rgba(20,20,19,0.015)",
              opacity: 0,
              animation: "400ms ease-out forwards panelSlideUp",
            }}
          >
            <div className="flex items-center gap-3 px-4 py-3.5">
              {/* Word doc icon */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white text-[13px] font-bold"
                style={{ backgroundColor: "#2B579A" }}
              >
                W
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate" style={{ color: "rgba(20,20,19,0.8)" }}>
                  Orient_Offer_Web_Offset_PH_2026_Q_042.docx
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: "rgba(20,20,19,0.35)" }}>
                  Cover · Specs · Pricing · T&amp;C · Contact &mdash; 8 pages
                </p>
              </div>
              <span
                className="text-[10px] font-medium px-2 py-1 rounded shrink-0"
                style={{ backgroundColor: "rgba(20,20,19,0.06)", color: "rgba(20,20,19,0.4)", letterSpacing: "0.05em" }}
              >
                .docx
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ─── Cowork View — all hover via React state ─── */
function CoworkView() {
  const [hovered, setHovered] = useState<string | null>(null);

  // Animated progress: activeStep advances every 1.5s, loops back
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (steps.length + 1)); // 0-6, then reset
    }, 1500);
    return () => clearInterval(timer);
  }, []);
  const h = hovered !== null; // anything hovered?
  const isFolder = hovered && ["BOM Templates", "Vendor RFQs", "Production Reports", "Service Logs"].includes(hovered);
  const isCtx = hovered && !isFolder;

  return (
    <div className="absolute inset-0 top-32">
      <div className="relative w-full h-full">

        {/* ── Left: File picker ── */}
        <div className="absolute -left-8 top-4" style={{ zIndex: isFolder ? 3 : 1, opacity: h && !isFolder ? 0.4 : 1, filter: h && !isFolder ? "blur(3px)" : "none", transition: "opacity 300ms, filter 300ms" }}>
          <div className="relative" style={{ opacity: 0, animation: "400ms ease-out 650ms 1 forwards panelSlideUp" }}>
            <div className="rounded-xl overflow-hidden w-[220px]" style={P}>
              <div className="flex items-center gap-2 px-2.5 py-2" style={{ borderBottom: "1px solid rgba(20,20,19,0.06)" }}>
                <div className="w-5 h-5 rounded bg-[#3B82F6] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="white"><path d="M16.5 3A1.5 1.5 0 0 1 18 4.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 15.5v-9A1.5 1.5 0 0 1 3.5 5h7.293l1.56-1.56.11-.1a1.5 1.5 0 0 1 .951-.34zm-3.086 1a.5.5 0 0 0-.277.084l-.077.062-1.707 1.708A.5.5 0 0 1 11 6H3.5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5z" /></svg>
                </div>
                <div className="flex-1 flex items-center gap-1.5 rounded-md px-2 py-1" style={{ backgroundColor: "rgba(20,20,19,0.04)" }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="rgba(20,20,19,0.35)"><path d="M8.5 2a6.5 6.5 0 0 1 4.935 10.728l4.419 4.419.064.078a.5.5 0 0 1-.693.693l-.079-.064-4.419-4.42A6.5 6.5 0 1 1 8.5 2m0 1a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11" /></svg>
                  <span className="text-xs" style={{ color: "rgba(20,20,19,0.35)" }}>Search</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 p-3">
                {["BOM Templates", "Vendor RFQs", "Production Reports", "Service Logs"].map((name) => (
                  <div
                    key={name}
                    onMouseEnter={() => setHovered(name)}
                    onMouseLeave={() => setHovered(null)}
                    className="flex flex-col items-center gap-1 rounded-lg px-2 py-2 cursor-default"
                    style={{ backgroundColor: hovered === name ? "rgba(20,20,19,0.05)" : "transparent", transition: "background-color 150ms" }}
                  >
                    {FOLDER_SVG}
                    <span className="text-[10px] text-center leading-tight line-clamp-2" style={{ color: hovered === name ? "#141413" : "rgba(20,20,19,0.5)", fontWeight: hovered === name ? 500 : 400, transition: "color 150ms" }}>{name}</span>
                  </div>
                ))}
              </div>
              <div className="pointer-events-none flex justify-end gap-2 px-3 py-2" style={{ borderTop: "1px solid rgba(20,20,19,0.06)" }}>
                <div className="rounded-md px-4 py-0.5 text-[10px]" style={{ border: "1px solid rgba(20,20,19,0.1)", color: "rgba(20,20,19,0.6)", backgroundColor: "white" }}>Cancel</div>
                <div className="rounded-md bg-[#007AFF] px-4 py-0.5 text-[10px] text-white">Open</div>
              </div>
            </div>
            {isFolder && tooltipData[hovered!] && <Tooltip text={tooltipData[hovered!]} side="left" />}
          </div>
        </div>

        {/* ── Center: Progress ── */}
        <div className="absolute left-1/2 -translate-x-1/2 top-48" style={{ zIndex: 1, opacity: h ? 0.4 : 1, filter: h ? "blur(3px)" : "none", transition: "opacity 300ms, filter 300ms" }}>
          <div style={{ opacity: 0, animation: "400ms ease-out 900ms 1 forwards panelSlideUp" }}>
            <div className="rounded-xl overflow-hidden w-[280px]" style={P}>
              <div className="px-3 pt-2.5 pb-4 flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: "#141413" }}>Progress</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="rgba(20,20,19,0.45)"><path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z" /></svg>
              </div>
              <div className="px-3 pb-3">
                {steps.map((label, i) => {
                  const done = i < activeStep;
                  const loading = i === activeStep;
                  return (
                  <div key={i} className="flex">
                    <div className="flex flex-col items-center mr-3 shrink-0">
                      {done ? (
                        /* Completed: accent checkmark */
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#d97757", transition: "background-color 300ms" }}>
                          <svg width="12" height="12" viewBox="0 0 20 20" fill="white"><path d="M15.188 5.11a.5.5 0 0 1 .752.626l-.056.084-7.5 9a.5.5 0 0 1-.738.033l-3.5-3.5-.064-.078a.501.501 0 0 1 .693-.693l.078.064 3.113 3.113 7.15-8.58z" /></svg>
                        </div>
                      ) : loading ? (
                        /* Active: spinning loader ring */
                        <div className="relative w-6 h-6">
                          <svg className="w-6 h-6 progress-spin" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="rgba(20,20,19,0.1)" strokeWidth="2.5" />
                            <circle cx="12" cy="12" r="10" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="20 43" />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-medium" style={{ color: "#3B82F6" }}>{i + 1}</span>
                        </div>
                      ) : (
                        /* Pending: numbered circle */
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium" style={{ backgroundColor: "rgba(20,20,19,0.08)", color: "rgba(20,20,19,0.4)" }}>
                          {i + 1}
                        </div>
                      )}
                    </div>
                    <div className={`text-sm ${i < 5 ? "pb-3" : "pb-0"}`}>
                      <span style={{
                        color: done ? "rgba(20,20,19,0.3)" : loading ? "#141413" : "rgba(20,20,19,0.4)",
                        fontWeight: loading ? 500 : 400,
                        textDecoration: done ? "line-through" : "none",
                        transition: "color 300ms",
                      }}>{label}</span>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Context ── */}
        <div className="absolute -right-2 top-12" style={{ zIndex: isCtx ? 3 : 1, opacity: h && !isCtx ? 0.4 : 1, filter: h && !isCtx ? "blur(3px)" : "none", transition: "opacity 300ms, filter 300ms" }}>
          <div className="relative" style={{ opacity: 0, animation: "400ms ease-out 1150ms 1 forwards panelSlideUp" }}>
            <div className="rounded-xl overflow-hidden w-[200px]" style={P}>
              <div className="px-3 py-2.5 flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: "#141413" }}>Context</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="rgba(20,20,19,0.45)"><path d="M14.128 7.165a.502.502 0 0 1 .744.67l-4.5 5-.078.07a.5.5 0 0 1-.666-.07l-4.5-5-.06-.082a.501.501 0 0 1 .729-.656l.075.068L10 11.752z" /></svg>
              </div>
              <div className="flex flex-col pb-2">
                {/* Vendor Specs — NOT hoverable */}
                <div className="mx-2 px-2 py-2 flex items-center gap-3 rounded-lg">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(20,20,19,0.03)", border: "0.5px solid rgba(20,20,19,0.08)" }}>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="rgba(20,20,19,0.35)"><path d="M11.586 2a1.5 1.5 0 0 1 1.06.44l2.914 2.914a1.5 1.5 0 0 1 .44 1.06V16.5a1.5 1.5 0 0 1-1.5 1.5h-9a1.5 1.5 0 0 1-1.492-1.347L4 16.5v-13A1.5 1.5 0 0 1 5.5 2zM5.5 3a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h-2.5A1.5 1.5 0 0 1 11 5.5V3z" /></svg>
                  </div>
                  <span className="text-sm truncate" style={{ color: "rgba(20,20,19,0.6)" }}>Vendor Specs</span>
                </div>
                {/* Hoverable context links */}
                {[
                  {/* Pricing Rules — tag/label icon */
                    key: "Pricing Rules", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(20,20,19,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg> },
                  {/* SAP Connector — plug/connector icon */
                    key: "SAP Connector", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(20,20,19,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg> },
                  {/* SharePoint — grid/sites icon */
                    key: "SharePoint", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(20,20,19,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg> },
                  {/* Service DB — database icon */
                    key: "Service DB", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(20,20,19,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg> },
                ].map((item) => (
                  <div
                    key={item.key}
                    onMouseEnter={() => setHovered(item.key)}
                    onMouseLeave={() => setHovered(null)}
                    className="mx-2 px-2 py-2 flex items-center gap-3 rounded-lg cursor-pointer"
                    style={{ backgroundColor: hovered === item.key ? "rgba(20,20,19,0.05)" : "transparent", transition: "background-color 150ms" }}
                  >
                    <div className="relative w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden shrink-0" style={{ backgroundColor: "rgba(20,20,19,0.03)", border: "0.5px solid rgba(20,20,19,0.08)" }}>
                      {/* Default icon — hide on hover */}
                      <div style={{ opacity: hovered === item.key ? 0 : 1, transition: "opacity 200ms" }}>
                        {item.icon}
                      </div>
                      {/* Arrow icon — show on hover */}
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered === item.key ? 1 : 0, transition: "opacity 200ms" }}>
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="rgba(20,20,19,0.45)"><path d="M13.5 6a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V7.707l-6.147 6.147a.5.5 0 0 1-.707-.707L12.293 7H8.5a.5.5 0 0 1 0-1z" /></svg>
                      </div>
                    </div>
                    <span className="text-sm truncate" style={{ color: "rgba(20,20,19,0.6)" }}>{item.key}</span>
                  </div>
                ))}
              </div>
            </div>
            {isCtx && tooltipData[hovered!] && <Tooltip text={tooltipData[hovered!]} side="right" />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function CoworkDemo({ className = "" }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<"chat" | "cowork">("chat");

  return (
    <div className={`flex justify-center items-center w-full ${className}`}>
      <div className="rounded-2xl w-full h-[70vh] min-h-[500px] max-h-[700px] flex justify-center items-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-full h-full rounded-2xl flex justify-center items-center" style={{ backgroundColor: "rgba(20,20,19,0.03)", boxShadow: "0 4px 20px 0 rgba(20,20,19,0.04)" }}>
            <div className="w-full h-full rounded-2xl relative" style={{ border: "1px solid rgba(20,20,19,0.06)", backgroundColor: "rgba(255,255,255,0.4)" }}>
              {/* Grid bg — animates with circle clip on tab switch */}
              <div
                className="absolute inset-0 overflow-hidden rounded-2xl"
                style={{
                  backgroundImage: "linear-gradient(to right, rgba(20,20,19,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,19,0.06) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                  backgroundPosition: "24px 24px",
                  animation: activeTab === "cowork"
                    ? "2500ms cubic-bezier(0.22, 1, 0.36, 1) forwards gridReveal"
                    : "600ms cubic-bezier(0.22, 1, 0.36, 1) forwards gridHide",
                }}
              />
              {/* Tab control */}
              <div className="flex justify-center pt-[60px] relative z-10">
                <div className="relative inline-flex h-10 text-base font-medium p-0.5 select-none min-w-[290px] rounded-[.625rem]" style={{ backgroundColor: "rgba(20,20,19,0.06)", boxShadow: "0 11px 23px 0 rgba(0,0,0,0.15)", border: "0.5px solid rgba(20,20,19,0.08)" }}>
                  <button type="button" onClick={() => setActiveTab("chat")} className="flex items-center justify-center h-[36px] px-3 rounded-lg whitespace-nowrap cursor-pointer flex-1 relative z-10" style={{ color: activeTab === "chat" ? "#141413" : "rgba(20,20,19,0.35)", transition: "color 250ms" }}>Chat</button>
                  <button type="button" onClick={() => setActiveTab("cowork")} className="flex items-center justify-center h-[36px] px-3 rounded-lg whitespace-nowrap cursor-pointer flex-1 relative z-10" style={{ color: activeTab === "cowork" ? "#141413" : "rgba(20,20,19,0.35)", transition: "color 250ms" }}>Cowork</button>
                  <div className="pointer-events-none absolute inset-0 p-0.5 rounded-[.625rem]" style={{ filter: "drop-shadow(0px 0px 0.5px rgba(20,20,19,0.08))" }}>
                    <div className="relative flex h-full" style={{ backgroundColor: "white", borderRadius: 8, clipPath: activeTab === "chat" ? "inset(0px 50% 0px 0% round 8px)" : "inset(0px 0% 0px 50% round 8px)", transition: "clip-path 250ms ease" }}>
                      <div className="flex items-center justify-center h-full px-3 whitespace-nowrap flex-1 font-medium" style={{ color: "#141413" }}>Chat</div>
                      <div className="flex items-center justify-center h-full px-3 whitespace-nowrap flex-1 font-medium" style={{ color: "#141413" }}>Cowork</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Active view — key forces remount so entrance animations replay */}
              <div key={activeTab} style={{ position: "absolute", inset: 0, animation: "400ms ease-out forwards demoFadeIn" }}>
                {activeTab === "cowork" ? <CoworkView /> : <ChatView />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
