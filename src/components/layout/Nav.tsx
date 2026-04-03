export function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#e8e6dc]/80">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[4.25rem] flex items-center justify-between">
        <a
          href="/"
          className="text-[1.15rem] font-semibold tracking-[-0.03em] text-text"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          SETTLE
        </a>
        <a
          href="/#contact"
          className="text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-full hover:bg-[#30302e] transition-colors duration-200"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
}
