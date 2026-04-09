interface NavProps {
  /** "full" shows the SettleMark logo, section links, and both CTAs.
   *  "minimal" (default) shows just the text logo + primary CTA. */
  variant?: "full" | "minimal";
}

export function Nav({ variant = "minimal" }: NavProps) {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#e8e6dc]/80">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[4.25rem] flex items-center justify-between">
        {/* Logo */}
        <a
          href={variant === "full" ? "#" : "/"}
          className="flex items-center gap-2.5"
        >
          <SettleMark className={variant === "full" ? "h-7 w-auto" : "h-7 w-auto sm:hidden"} />
          <span
            className="hidden sm:inline text-[1.15rem] font-semibold tracking-[-0.03em] text-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            SETTLE
          </span>
        </a>

        {/* Right side */}
        <div className="flex items-center gap-7">
          {variant === "full" && (
            <>
              <a
                href="#process"
                className="text-[15px] text-text-muted hover:text-text transition-colors duration-200 hidden sm:block"
              >
                Process
              </a>
              <a
                href="#services"
                className="text-[15px] text-text-muted hover:text-text transition-colors duration-200 hidden sm:block"
              >
                Services
              </a>
            </>
          )}
          <div className="flex items-center gap-5">
            <a
              href="https://customers.settlewithai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] font-medium text-text-muted hover:text-text transition-colors duration-200"
            >
              Client Portal
            </a>
            <a
              href={variant === "full" ? "#contact" : "/#contact"}
              className="text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-lg hover:bg-[#30302e] transition-colors duration-200"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function SettleMark({
  className = "h-6 w-auto",
  stroke = "#141413",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg viewBox="0 0 199 298" fill="none" className={className}>
      <path
        d="M146.118 42.7126C134.632 77.172 157.605 100.145 180.578 65.6855C203.551 31.2261 192.064 -3.23338 157.605 8.2531C123.145 19.7396 79.1857 107.5 88.6857 157.577C98.1857 207.655 146.536 175.199 143.686 198C141.183 218.02 122.766 234.672 103.186 252.601C78.9328 274.809 48.99 295.263 29.4417 293.252C-6.69105 289.535 -2.97404 253.403 32.1474 231.455C67.2688 209.507 78.7483 239.9 54.095 266.576"
        stroke={stroke}
        strokeWidth="8.04054"
        strokeLinecap="round"
      />
      <path
        d="M163.02 26.5102C169.912 15.0237 179.101 19.6183 174.507 33.4021"
        stroke={stroke}
        strokeWidth="5.74324"
        strokeLinecap="round"
      />
      <path
        d="M38.0201 243.892C44.9119 255.378 54.1011 250.784 49.5065 237"
        stroke={stroke}
        strokeWidth="5.74324"
        strokeLinecap="round"
      />
      <circle cx="106.507" cy="248.486" r="11.4865" fill="#D97757" />
      <circle cx="187.507" cy="11.4865" r="11.4865" fill="#D97757" />
      <circle cx="94.5065" cy="98.4865" r="11.4865" fill="#D97757" />
    </svg>
  );
}
