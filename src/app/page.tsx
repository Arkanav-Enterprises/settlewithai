"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { getCalApi } from "@calcom/embed-react";

const Globe = dynamic(() => import("./globe"), { ssr: false });

/* ─── Scroll-triggered fade-in ──────────────────────────── */

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = Array.from(el.querySelectorAll(".fade-up"));
    if (targets.length === 0) return;

    // Mark elements already in viewport as visible immediately
    targets.forEach((t) => {
      const rect = t.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        t.classList.add("visible");
      }
    });

    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.05, rootMargin: "0px 0px 50px 0px" }
    );
    targets.forEach((t) => {
      if (!t.classList.contains("visible")) obs.observe(t);
    });
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Arrow icon ────────────────────────────────────────── */

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="ml-1.5 inline-block transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <path
        d="M1 7h11m0 0L8 3m4 4L8 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Logo mark ─────────────────────────────────────────── */

function SettleMark({ className = "h-6 w-auto", stroke = "#141413" }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 199 298" fill="none" className={className}>
      <path d="M146.118 42.7126C134.632 77.172 157.605 100.145 180.578 65.6855C203.551 31.2261 192.064 -3.23338 157.605 8.2531C123.145 19.7396 79.1857 107.5 88.6857 157.577C98.1857 207.655 146.536 175.199 143.686 198C141.183 218.02 122.766 234.672 103.186 252.601C78.9328 274.809 48.99 295.263 29.4417 293.252C-6.69105 289.535 -2.97404 253.403 32.1474 231.455C67.2688 209.507 78.7483 239.9 54.095 266.576" stroke={stroke} strokeWidth="8.04054" strokeLinecap="round"/>
      <path d="M163.02 26.5102C169.912 15.0237 179.101 19.6183 174.507 33.4021" stroke={stroke} strokeWidth="5.74324" strokeLinecap="round"/>
      <path d="M38.0201 243.892C44.9119 255.378 54.1011 250.784 49.5065 237" stroke={stroke} strokeWidth="5.74324" strokeLinecap="round"/>
      <circle cx="106.507" cy="248.486" r="11.4865" fill="#D97757"/>
      <circle cx="187.507" cy="11.4865" r="11.4865" fill="#D97757"/>
      <circle cx="94.5065" cy="98.4865" r="11.4865" fill="#D97757"/>
    </svg>
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function Home() {
  const statsRef = useFadeIn();
  const problemRef = useFadeIn();
  const processRef = useFadeIn();
  const servicesRef = useFadeIn();
  const caseRef = useFadeIn();
  const audienceRef = useFadeIn();
  const ctaRef = useFadeIn();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("floatingButton", {
        calLink: "settle-ai/15min",
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
        buttonText: "Book Demo",
      });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <main className="min-h-screen">
      {/* ── Nav ──────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#e8e6dc]/80">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[4.25rem] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <SettleMark className="h-7 w-auto" />
            <span
              className="text-[1.15rem] font-semibold tracking-[-0.03em] text-text"
              style={{ fontFamily: "Sentient, Georgia, serif" }}
            >
              SETTLE
            </span>
          </a>

          {/* Links */}
          <div className="flex items-center gap-7">
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
            <a
              href="#contact"
              className="text-[14px] font-medium bg-text text-bg px-5 py-2.5 rounded-full hover:bg-[#30302e] transition-colors duration-200"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero + Globe ─────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Globe background — on mobile, push to bottom edge */}
        <div className="absolute inset-0 flex items-end md:items-center justify-center">
          <div className="w-[min(110vw,900px)] h-[min(110vw,900px)] translate-y-[30%] md:translate-y-0 md:mt-16">
            <Globe className="w-full h-full" />
          </div>
        </div>

        {/* Hero text */}
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 pt-36 md:pt-44">
          <h1
            className="text-[clamp(2.8rem,5.5vw,5rem)] font-medium leading-[1.08] mb-8 max-w-[560px]"
          >
            AI, <span className="text-accent">thoughtfully</span> deployed.
          </h1>
          <p className="text-text-muted text-[clamp(1rem,1.5vw,1.2rem)] max-w-[420px] leading-[1.7] mb-10">
            We settle AI into your team&apos;s actual workflows &mdash;
            structured rollouts, production-grade instructions, and real
            results.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center text-[15px] font-medium bg-text text-bg px-6 py-3 rounded-full hover:bg-[#30302e] transition-colors duration-200"
            >
              Start a conversation
              <Arrow />
            </a>
            <a
              href="#process"
              className="group inline-flex items-center text-[15px] font-medium border border-border text-text px-6 py-3 rounded-full hover:border-text-muted transition-colors duration-200"
            >
              See how it works
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────── */}
      <section ref={statsRef} className="bg-accent">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-10 items-start stagger">
            {[
              { value: "85%", label: "Faster document generation" },
              { value: "11", label: "Projects deployed per engagement" },
              { value: "49", label: "Use cases mapped per company" },
              { value: "4hrs → 30min", label: "Typical task time reduction" },
            ].map((s) => (
              <div key={s.label} className="fade-up text-center">
                <div
                  className="text-[clamp(1.6rem,3.5vw,3rem)] font-medium leading-none mb-3 text-white md:whitespace-nowrap"
                  style={{
                    fontFamily: "Sentient, Georgia, serif",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.value}
                </div>
                <div className="text-white/80 text-xs uppercase tracking-[0.12em] leading-relaxed">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────── */}
      <section ref={problemRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 md:py-36">
          <div className="flex items-start justify-between mb-16">
            <div className="max-w-2xl">
              <h2 className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] mb-5">
                Most AI adoption stalls at the demo.
              </h2>
              <p className="fade-up text-text-muted text-[17px] leading-relaxed">
                The gap isn&apos;t tools &mdash; it&apos;s deployment.
                Here&apos;s what we do differently.
              </p>
            </div>
            <div className="hidden lg:block w-[220px] shrink-0 ml-12 -mt-4">
              <svg viewBox="0 0 1000 1000" fill="none" className="w-full h-auto">
                <path d="M239.949 52.4888C240.483 53.3042 241.815 52.978 242.658 52.9961C275.744 53.4219 308.55 53.884 341.446 53.9474C362.881 53.9927 383.882 54.346 405.145 54.4004C496.559 54.645 587.837 55.243 679.658 55.9768C712.889 56.2395 746.22 56.1127 779.425 56.8918C789.327 57.1274 799.347 56.8284 809.05 56.9824C810.155 57.0006 811.152 56.4026 812.257 56.4479C812.529 56.7469 811.931 63.4693 811.958 64.5202C812.375 81.9966 812.593 99.473 814.25 116.967C812.475 148.079 818.844 180.794 808.543 210.628C799.673 236.34 784.027 259.904 773.508 284.782C770.138 292.764 767.583 302.195 763.95 309.806C759.91 318.268 752.97 327.327 748.114 335.581C742.687 344.822 738.51 354.815 731.77 363.485C720.49 377.99 705.85 391.317 693.519 405.36C684.469 415.67 676.876 426.596 667.717 436.634C650.675 455.315 636.343 475.32 618.866 493.747C617.788 494.88 615.686 496.619 614.237 497.271C617.906 500.261 620.697 504.175 624.103 507.4C632.076 514.938 640.066 520.483 647.323 529.135C660.234 544.537 672.319 560.056 685.873 575.077C698.656 589.247 710.362 605.328 722.647 620.286C734.932 635.243 746.492 645.735 755.353 663.673C762.827 678.812 770.519 693.833 778.238 708.854C791.094 733.869 801.811 758.104 811.859 784.531C813.345 788.436 818.128 799.761 818.645 802.941C819.813 810.098 817.883 821.939 818.509 830.265C820.783 860.896 819.922 891.065 819.378 921.833L817.204 948.441H813.254C810.174 947.436 806.776 947.626 803.678 947.436C785.848 946.339 767.384 946.829 749.283 946.484C647.677 944.564 545.527 943.386 443.142 942.525C364.775 941.873 286.145 943.332 207.623 942.543C202.169 942.489 195.211 941.474 189.848 941.8C186.441 942.009 184.312 944.265 180.716 943.984C180.96 940.985 181.159 937.869 181.259 934.843C182.573 894.399 181.196 850.396 181.105 808.83C181.105 807.652 180.752 805.224 180.226 804.137V801.174C181.15 800.83 181.259 800.096 181.567 799.308C191.026 774.937 199.08 750.131 208.991 725.932C217.852 704.306 227.446 684.474 237.611 663.646C240.456 657.811 244.397 647.103 247.885 642.446C250.431 639.049 255.124 635.524 258.014 632.172C291.59 593.36 325.247 554.792 366.931 524.233C379.316 515.156 392.815 507.926 404.901 498.495C398.939 493.086 391.682 489.398 385.422 484.397C378.79 479.097 372.838 472.402 366.65 466.613C332.911 435.012 298.693 404.218 265.887 371.757C261.439 367.354 253.285 359.952 249.851 355.186C246.843 351.001 244.506 343.481 241.724 338.607C240.429 336.342 238.254 334.322 237.303 332.655C217.172 297.33 203.909 257.929 184.412 222.016C184.276 196.64 182.283 171.462 181.721 146.176C181.105 118.49 181.866 90.3769 183.714 62.6448C183.877 60.2168 182.7 58.1602 183.678 55.8228C184.475 54.6359 199.333 53.286 201.635 54.2826C210.486 52.7062 219.428 53.1592 228.379 53.4853L239.487 52.4978H239.985L239.949 52.4888Z" fill="#D97757"/>
                <path d="M750.922 212.041C750.75 213.926 751.158 216.136 750.922 217.966C750.016 224.988 740.014 241.513 736.255 248.462C730.139 259.768 723.073 270.993 716.722 282.3C705.515 302.25 694.951 324.718 681.606 343.191C657.271 376.866 627.057 409.98 594.197 434.278C588.208 438.709 580.806 444.733 574.655 448.81C567.651 453.458 558.945 456.774 551.507 461.702C538.162 470.545 524.101 479.46 511.87 489.589C510.348 490.848 503.961 497.797 502.357 497.788C501.968 497.788 501.025 496.818 500.183 496.701C499.404 496.592 498.634 497.371 497.411 497.235C491.658 496.574 479.925 489.516 474.797 486.019C470.856 483.337 466.616 480.402 465.203 475.727C455.436 468.996 445.108 462.717 435.505 455.696C409.585 436.77 383.746 413.885 362.863 389.722C353.269 378.624 339.67 368.604 328.708 358.72C317.936 349.007 310.117 337.375 301.9 325.642C283.463 299.314 268.025 271.809 256.727 241.449C254.182 234.609 248.374 218.582 250.087 212.05C250.268 211.38 252.107 206.352 252.37 206.188C252.859 205.889 254.453 206.297 255.405 206.016C257.153 205.509 261.638 201.803 264.927 200.725C278.045 196.431 304.563 194.954 318.814 194.538C337.804 193.976 353.513 198.542 371.524 199.104C393.295 199.783 415.039 197.908 436.674 196.721C445.208 196.25 453.606 197.582 461.851 197.745C480.079 198.116 497.365 196.775 515.322 199.122C529.211 200.934 542.646 200.091 556.68 200.227C587.864 200.517 621.938 202.202 652.913 200.182C657.778 199.865 662.254 198.479 666.421 198.325C682.53 197.708 700.287 200.571 715.788 196.875C720.273 195.806 720.916 197.391 724.586 197.536C727.503 197.654 731.371 196.06 734.361 196.232C737.351 196.404 744.254 198.832 746.465 200.952C748.277 202.691 749.699 209.577 750.931 212.041H750.922ZM677.647 308.628C685.003 297.611 687.631 290.771 692.432 278.73C698.747 262.912 706.339 248.905 714.294 233.93C716.024 230.677 717.773 227.298 720.065 224.381L719.557 223.393C716.857 223.891 712.998 224.082 710.633 222.94C658.286 223.493 605.739 223.638 553.273 221.219C535.154 220.385 516.889 218.655 498.86 217.966C476.066 217.087 452.184 216.073 429.716 216.942C378.192 218.936 327.149 214.315 275.735 217.006C274.476 217.069 273.352 215.901 272.546 217.205C273.416 219.515 274.766 221.626 275.717 223.9C279.332 232.489 283.137 241.033 286.389 249.667C290.91 261.671 294.181 275.496 299.743 287.265C308.858 306.517 324.087 328.27 339.498 342.557C359.719 361.302 379.488 380.744 400.579 398.492C414.441 410.152 428.61 421.45 443.659 431.696C456.089 440.158 476.138 454.482 490.126 458.305C504.994 462.373 509.841 457.426 521.673 450.151C527.371 446.645 530.515 444.407 535.879 440.657C545.536 433.907 556.716 429.142 566.247 422.129C592.312 402.968 617.055 383.299 638.49 358.366C651.581 343.146 666.503 325.28 677.619 308.619L677.647 308.628Z" fill="#141413"/>
                <path d="M528.096 686.866C533.034 691.65 538.678 700.474 543.308 705.973C566.093 733.017 588.616 760.242 611.918 786.968C619.727 795.928 630.101 805.16 637.276 813.93C643.219 821.187 648.746 830.827 654.662 838.537C661.683 847.687 669.511 856.303 676.161 865.426C677.52 867.292 679.495 868.624 680.328 871.143C678.444 871.578 680.156 871.759 680.355 873.571C680.473 874.712 680.075 879.415 679.73 880.411C679.241 881.833 677.665 881.507 677.121 882.25C676.614 882.939 675.599 886.545 674.82 887.849C672.274 892.071 669.04 894.363 664.157 895.45C649.588 898.676 620.262 896.701 604.525 896.094C583.234 895.269 560.956 893.04 539.792 890.359C527.444 888.791 515.44 886.345 502.828 887.161C483.422 888.42 463.88 891.763 444.438 893.013C411.958 895.097 379.089 893.24 346.818 893.584C337.061 893.693 326.207 895.795 316.993 890.857C314.212 889.371 310.824 886.246 310.534 883.002C310.09 878.01 311.938 870.418 314.402 866.097C316.06 863.188 319.05 861.059 320.826 858.206C325.673 850.405 328.653 844.625 334.424 836.996C346.873 820.508 359.04 802.941 372.231 786.787C379.017 778.47 389.354 770.751 395.805 762.588C396.475 761.737 397.173 759.127 398.224 757.85C403.85 750.973 412.901 745.03 418.427 738.552C425.095 730.761 431.084 722.064 438.594 715.024C441.466 712.333 447.391 709.017 449.557 706.481C450.517 705.348 451.224 703.255 452.329 701.851C457.937 694.748 474.371 680.905 482.045 675.523C483.295 674.645 486.693 672.515 488.097 672.389C489.384 672.28 490.57 672.941 491.449 672.823C493.832 672.497 496.369 671.274 498.869 671.374C505.284 671.628 523.331 682.255 528.096 686.875V686.866ZM509.188 699.849C507.123 697.72 505.429 695.727 502.765 694.141C502.004 694.014 497.257 698.943 496.197 699.813C479.101 713.828 463.137 728.342 446.368 743.291C409.512 777.211 380.466 817.228 349.554 855.832L336.726 871.877C339.344 871.451 342.723 870.971 345.341 870.871C357.599 870.391 369.667 869.412 381.898 869.195C408.742 868.715 435.949 871.116 462.856 871.424C470.222 871.505 477.198 872.312 484.084 872.411C489.936 872.493 497.628 871.007 503.807 870.871C525.913 870.373 547.656 871.523 569.445 869.911C590.7 868.334 611.745 868.47 633.09 867.736C637.783 867.573 642.522 866.477 647.242 866.441C647.804 865.879 639.641 854.029 638.843 853.014C628.515 839.896 617.788 826.931 607.542 813.568C588.045 788.146 569.092 766.538 547.838 743.164C541.414 736.106 535.036 729.601 528.495 722.77C521.618 715.586 516.11 707.006 509.188 699.849Z" fill="#141413"/>
                <path d="M328.189 256.762C332.99 258.048 337.693 256.064 338.694 252.329C339.694 248.595 336.613 244.525 331.812 243.239C327.011 241.952 322.308 243.936 321.307 247.671C320.306 251.405 323.387 255.475 328.189 256.762Z" fill="#141413"/>
                <path d="M380 280C383.314 280 386 277.761 386 275C386 272.239 383.314 270 380 270C376.686 270 374 272.239 374 275C374 277.761 376.686 280 380 280Z" fill="#141413"/>
                <path d="M427.736 255.518C433.445 253.44 436.848 248.39 435.337 244.238C433.826 240.086 427.973 238.405 422.264 240.482C416.555 242.56 413.152 247.61 414.663 251.762C416.175 255.914 422.027 257.595 427.736 255.518Z" fill="#141413"/>
                <path d="M480 268C483.866 268 487 265.314 487 262C487 258.686 483.866 256 480 256C476.134 256 473 258.686 473 262C473 265.314 476.134 268 480 268Z" fill="#141413"/>
                <path d="M532.042 251.344C537.047 253.678 542.429 252.73 544.063 249.226C545.697 245.722 542.964 240.99 537.959 238.656C532.953 236.322 527.571 237.27 525.937 240.774C524.303 244.278 527.037 249.01 532.042 251.344Z" fill="#141413"/>
                <path d="M590 275C593.314 275 596 272.761 596 270C596 267.239 593.314 265 590 265C586.686 265 584 267.239 584 270C584 272.761 586.686 275 590 275Z" fill="#141413"/>
                <path d="M646.553 257.796C651.354 256.509 654.551 252.871 653.693 249.671C652.836 246.47 648.248 244.918 643.447 246.204C638.646 247.491 635.449 251.129 636.307 254.329C637.164 257.53 641.752 259.082 646.553 257.796Z" fill="#141413"/>
                <path d="M357 315.196C360.826 317.405 365.271 316.87 366.928 314C368.585 311.13 366.826 307.013 363 304.804C359.174 302.595 354.729 303.13 353.072 306C351.415 308.87 353.174 312.987 357 315.196Z" fill="#141413"/>
                <path d="M415 335C418.314 335 421 332.761 421 330C421 327.239 418.314 325 415 325C411.686 325 409 327.239 409 330C409 332.761 411.686 335 415 335Z" fill="#141413"/>
                <path d="M466.216 311.894C471.655 310.935 475.52 307.071 474.848 303.264C474.177 299.456 469.224 297.147 463.785 298.106C458.346 299.065 454.481 302.929 455.152 306.737C455.823 310.544 460.777 312.853 466.216 311.894Z" fill="#141413"/>
                <path d="M520 325C523.866 325 527 322.761 527 320C527 317.239 523.866 315 520 315C516.134 315 513 317.239 513 320C513 322.761 516.134 325 520 325Z" fill="#141413"/>
                <path d="M572.606 306.578C577.277 308.278 582.135 306.711 583.457 303.078C584.78 299.445 582.065 295.122 577.394 293.422C572.723 291.722 567.865 293.289 566.543 296.922C565.221 300.555 567.935 304.878 572.606 306.578Z" fill="#141413"/>
                <path d="M620 329C623.314 329 626 327.209 626 325C626 322.791 623.314 321 620 321C616.686 321 614 322.791 614 325C614 327.209 616.686 329 620 329Z" fill="#141413"/>
                <path d="M412.113 374.532C415.617 372.898 417.511 369.544 416.344 367.042C415.177 364.539 411.391 363.835 407.887 365.468C404.383 367.102 402.489 370.456 403.656 372.958C404.823 375.461 408.61 376.165 412.113 374.532Z" fill="#141413"/>
                <path d="M460 389C463.314 389 466 387.209 466 385C466 382.791 463.314 381 460 381C456.686 381 454 382.791 454 385C454 387.209 456.686 389 460 389Z" fill="#141413"/>
                <path d="M503.753 370.869C508.615 371.902 513.115 370.113 513.804 366.871C514.492 363.63 511.11 360.165 506.248 359.131C501.386 358.098 496.886 359.888 496.197 363.129C495.508 366.37 498.891 369.835 503.753 370.869Z" fill="#141413"/>
                <path d="M555 385C558.314 385 561 382.761 561 380C561 377.239 558.314 375 555 375C551.686 375 549 377.239 549 380C549 382.761 551.686 385 555 385Z" fill="#141413"/>
                <path d="M596.545 364.755C600.222 363.561 602.511 360.463 601.658 357.837C600.804 355.211 597.132 354.05 593.455 355.245C589.778 356.439 587.49 359.537 588.343 362.163C589.196 364.789 592.869 365.95 596.545 364.755Z" fill="#141413"/>
                <path d="M470 429C473.314 429 476 427.209 476 425C476 422.791 473.314 421 470 421C466.686 421 464 422.791 464 425C464 427.209 466.686 429 470 429Z" fill="#141413"/>
                <path d="M513.127 419.636C516.712 421.084 520.456 420.183 521.49 417.622C522.525 415.062 520.458 411.812 516.873 410.364C513.289 408.916 509.544 409.817 508.51 412.378C507.475 414.938 509.543 418.188 513.127 419.636Z" fill="#141413"/>
                <path d="M545 434C547.761 434 550 432.209 550 430C550 427.791 547.761 426 545 426C542.239 426 540 427.791 540 430C540 432.209 542.239 434 545 434Z" fill="#141413"/>
                <path d="M435 820C441.377 814.132 448.611 812.563 456.699 815.295C463.763 819.109 465.473 823.807 461.83 829.39" stroke="#141413" strokeWidth="4" strokeLinecap="round"/>
                <path d="M435 820C428.623 825.868 421.389 827.437 413.301 824.705C406.237 820.891 404.527 816.193 408.17 810.61" stroke="#141413" strokeWidth="4" strokeLinecap="round"/>
                <path d="M436.71 824.698C439.305 823.754 440.643 820.885 439.698 818.29C438.754 815.695 435.885 814.357 433.29 815.301C430.695 816.246 429.357 819.115 430.301 821.71C431.246 824.305 434.115 825.643 436.71 824.698Z" fill="#141413" stroke="#141413" strokeLinecap="round"/>
                <path d="M551.477 811.376L578.523 818.623" stroke="#141413" strokeWidth="5" strokeLinecap="round"/>
                <path d="M578.523 818.623C585.653 817.773 591.368 814.473 595.669 808.724" stroke="#141413" strokeWidth="3.5" strokeLinecap="round"/>
                <path d="M551.477 811.377C544.347 812.227 538.632 815.527 534.331 821.276" stroke="#141413" strokeWidth="3.5" strokeLinecap="round"/>
                <path d="M563.965 818.864C566.099 819.435 568.292 818.169 568.864 816.035C569.436 813.901 568.169 811.708 566.036 811.136C563.902 810.564 561.708 811.831 561.137 813.965C560.565 816.099 561.831 818.292 563.965 818.864Z" fill="#141413" stroke="#141413" strokeLinecap="round"/>
                <path d="M500.487 773.466C513.613 771.621 524.036 768.574 523.767 766.66C523.498 764.746 512.639 764.689 499.513 766.534C486.387 768.379 475.965 771.426 476.234 773.34C476.503 775.254 487.361 775.311 500.487 773.466Z" fill="#141413" stroke="#141413" strokeLinecap="round"/>
                <path d="M500.835 775.942C504.116 775.48 506.403 772.446 505.941 769.165C505.48 765.884 502.446 763.597 499.165 764.058C495.883 764.52 493.597 767.554 494.058 770.835C494.519 774.117 497.553 776.403 500.835 775.942Z" fill="#141413" stroke="#141413" strokeLinecap="round"/>
                <path d="M498.876 850.782C509.118 854.919 517.923 857.028 518.544 855.492C519.164 853.956 511.365 849.356 501.124 845.219C490.882 841.081 482.077 838.972 481.456 840.508C480.836 842.044 488.635 846.644 498.876 850.782Z" fill="#141413" stroke="#141413" strokeLinecap="round"/>
                <path d="M497.94 853.1C500.5 854.134 503.498 852.69 504.636 849.873C505.774 847.057 504.621 843.935 502.06 842.901C499.5 841.866 496.502 843.311 495.364 846.127C494.226 848.943 495.379 852.065 497.94 853.1Z" fill="#141413" stroke="#141413" strokeLinecap="round"/>
                <path d="M457.5 779.33C460.848 781.263 464.682 780.892 466.062 778.5C467.443 776.109 465.848 772.603 462.5 770.67C459.152 768.737 455.319 769.109 453.938 771.5C452.557 773.892 454.152 777.397 457.5 779.33Z" fill="#141413" stroke="#141413" strokeLinecap="round"/>
                <circle cx="505" cy="735" r="2.5" fill="#141413" stroke="#141413" strokeLinecap="round"/>
                <circle cx="545" cy="775" r="2.5" fill="#141413" stroke="#141413" strokeLinecap="round"/>
                <circle cx="400" cy="845" r="2.5" fill="#141413" stroke="#141413" strokeLinecap="round"/>
                <circle cx="595" cy="850" r="2.5" fill="#141413" stroke="#141413" strokeLinecap="round"/>
                <path d="M507.132 534.969C507.358 535.241 509.152 539.101 509.225 539.544C510.602 547.408 505.836 559.349 498.081 562.421C494.557 563.816 492.183 563.028 488.822 561.433C483.83 559.059 481.927 556.142 482.09 550.407C482.145 548.677 484.147 541.375 484.89 539.762C487.599 533.882 493.379 531.771 499.612 531.835C501.089 532.849 506.407 534.109 507.132 534.96V534.969Z" fill="#141413"/>
                <path d="M507.132 589.328C507.358 589.6 509.152 593.459 509.225 593.903C510.602 601.767 505.836 613.708 498.081 616.779C494.557 618.175 492.183 617.386 488.822 615.792C483.83 613.418 481.927 610.501 482.09 604.766C482.145 603.036 484.147 595.733 484.89 594.121C487.599 588.241 493.379 586.13 499.612 586.194C501.089 587.208 506.407 588.467 507.132 589.319V589.328Z" fill="#141413"/>
              </svg>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-border-light rounded-2xl overflow-hidden stagger">
            {[
              {
                wrong: "Generic prompts",
                right: "Structured, role-specific instructions",
              },
              {
                wrong: "One-size-fits-all demos",
                right: "Department-by-department rollout",
              },
              {
                wrong: "Advice without implementation",
                right: "Knowledge files, review gates, safety rules",
              },
              {
                wrong: "No way to measure impact",
                right: "Before/after time and error tracking",
              },
            ].map((p) => (
              <div key={p.wrong} className="fade-up bg-bg p-7 md:p-8">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-accent/60 text-sm mt-0.5">✕</span>
                  <span className="text-text-faint line-through decoration-border">
                    {p.wrong}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent text-sm mt-0.5">✓</span>
                  <span className="text-text font-medium">{p.right}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Integration Diagram (hidden for now) ───── */}
      <section className="overflow-hidden hidden">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 md:py-36">
          <h2
            className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] mb-6 max-w-2xl"
            style={{
              fontFamily: "Sentient, Georgia, serif",
              letterSpacing: "-0.03em",
            }}
          >
            One interface. Every workflow.
          </h2>
          <p className="fade-up text-text-muted text-[17px] leading-relaxed mb-16 max-w-xl">
            Your team&apos;s data, documents, and systems feed into Claude.
            Structured instructions turn it into a reliable workflow
            participant.
          </p>

          {/* Diagram */}
          <div className="relative w-full max-w-[1040px] mx-auto h-[700px] md:h-[500px]">
            {/* ── SVG connection lines (desktop) ── */}
            <svg
              className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <defs>
                <linearGradient
                  id="lineGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgba(20,20,19,0.08)" />
                  <stop offset="50%" stopColor="rgba(217,119,87,0.4)" />
                  <stop offset="100%" stopColor="rgba(20,20,19,0.08)" />
                </linearGradient>
                <linearGradient
                  id="lineGradDown"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(217,119,87,0.4)" />
                  <stop offset="100%" stopColor="rgba(20,20,19,0.12)" />
                </linearGradient>
              </defs>
              {/* Left inputs → center */}
              <path d="M 196 60 C 330 60, 400 220, 468 220" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
              <path d="M 196 155 C 330 155, 400 220, 468 220" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
              <path d="M 196 250 C 330 250, 400 220, 468 220" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
              <path d="M 196 345 C 330 345, 400 220, 468 220" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
              {/* Right inputs → center */}
              <path d="M 844 60 C 710 60, 640 220, 572 220" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
              <path d="M 844 155 C 710 155, 640 220, 572 220" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
              <path d="M 844 250 C 710 250, 640 220, 572 220" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
              <path d="M 844 345 C 710 345, 640 220, 572 220" fill="none" stroke="url(#lineGrad)" strokeWidth="1.5" />
              {/* Center → bottom outputs */}
              <path d="M 520 310 C 520 370, 370 370, 370 430" fill="none" stroke="url(#lineGradDown)" strokeWidth="1.5" />
              <path d="M 520 310 C 520 370, 520 400, 520 430" fill="none" stroke="url(#lineGradDown)" strokeWidth="1.5" />
              <path d="M 520 310 C 520 370, 670 370, 670 430" fill="none" stroke="url(#lineGradDown)" strokeWidth="1.5" />
            </svg>

            {/* ── Center: Claude chat mockup ── */}
            <div className="absolute left-1/2 top-4 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20 flex flex-col items-center">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-[#141413] border border-[rgba(255,255,255,0.1)] flex flex-col items-center justify-center shadow-xl relative">
                {/* Simplified Claude sparkle */}
                <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 text-accent" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
                <span className="text-[10px] md:text-xs text-white/60 mt-1.5 font-medium">Claude</span>
                {/* Subtle glow */}
                <div className="absolute inset-0 bg-accent/15 blur-2xl rounded-full -z-10" />
              </div>
              <div className="mt-3 bg-[rgba(20,20,19,0.06)] border border-border px-4 py-2 rounded-lg">
                <span className="text-text text-xs md:text-sm font-medium whitespace-nowrap">
                  Your AI layer
                </span>
              </div>
            </div>

            {/* ── Left column: Input sources ── */}
            <div className="absolute left-2 md:left-0 top-[180px] md:top-4 flex flex-col gap-3 md:gap-5 z-10">
              {[
                { icon: "M4 7V4h16v3M9 20h6M12 4v16", label: "ERP System" },
                { icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8", label: "Documents" },
                { icon: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z", label: "Spreadsheets" },
                { icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6", label: "Email & CRM" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[rgba(20,20,19,0.04)] border border-border p-2.5 md:p-3 rounded-xl flex items-center gap-2.5 md:gap-3 w-[140px] md:w-[180px]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 md:w-5 md:h-5 text-text-muted shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={item.icon} />
                  </svg>
                  <span className="text-xs md:text-sm font-medium text-text truncate">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Right column: Knowledge sources ── */}
            <div className="absolute right-2 md:right-0 top-[180px] md:top-4 flex flex-col gap-3 md:gap-5 z-10">
              {[
                { icon: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6", label: "Pricing Rules" },
                { icon: "M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z", label: "Knowledge Base" },
                { icon: "M9 12l2 2 4-4M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z", label: "Compliance" },
                { icon: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z", label: "Product Specs" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[rgba(20,20,19,0.04)] border border-border p-2.5 md:p-3 rounded-xl flex items-center gap-2.5 md:gap-3 w-[140px] md:w-[180px]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 md:w-5 md:h-5 text-text-muted shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={item.icon} />
                  </svg>
                  <span className="text-xs md:text-sm font-medium text-text truncate">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Bottom: Outputs ── */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col md:flex-row gap-3 md:gap-6 items-center z-10">
              {[
                {
                  label: "Offers & Proposals",
                  bg: "bg-accent/10",
                  icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6",
                },
                {
                  label: "Reports & BOMs",
                  bg: "bg-[rgba(20,20,19,0.06)]",
                  icon: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
                },
                {
                  label: "Automated Workflows",
                  bg: "bg-[rgba(20,20,19,0.06)]",
                  icon: "M18 20V10M12 20V4M6 20v-6",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`${item.bg} border border-border px-4 py-2.5 rounded-full flex items-center gap-2.5`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-text-muted"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={item.icon} />
                  </svg>
                  <span className="text-xs md:text-sm font-medium text-text whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Case Study: Orient ────────────────────────── */}
      <section ref={caseRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 md:py-36">
          <div
            className="fade-up rounded-xl p-8 md:p-12 lg:p-16"
            style={{
              background: "rgba(0,0,0,0.04)",
              backgroundImage:
                "linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              boxShadow:
                "inset 1px 1px 1px rgba(0,0,0,0.1), inset -1px -1px 1px rgba(255,255,255,0.3), 0 4px 16px rgba(0,0,0,0.1)",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            {/* header */}
            <div className="flex items-center gap-5 mb-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/orient-logo.png"
                alt="Orient Printing & Packaging"
                className="h-10 w-auto"
              />
              <div>
                <div className="font-medium text-[17px]">
                  Orient Printing & Packaging
                </div>
                <div className="text-sm text-text-faint mt-0.5">
                  Manufacturing · 79 years in operation · 50+ countries
                </div>
              </div>
            </div>

            {/* quote */}
            <blockquote className="border-l-2 border-accent pl-6 md:pl-8 text-text-muted text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.8] mb-12 max-w-3xl">
              &ldquo;49 use cases mapped across 7 departments. 18 projects
              structured. 11 deployed in the first engagement &mdash; from offer
              generation to BOM creation to service troubleshooting. Phased from
              quick wins to ERP integration over six months.&rdquo;
            </blockquote>

            {/* stats */}
            <div className="grid grid-cols-3 gap-8 md:gap-12">
              {[
                { v: "49", l: "Use cases mapped" },
                { v: "11", l: "Projects deployed" },
                { v: "85%", l: "Time saved on docs" },
              ].map((s) => (
                <div key={s.l}>
                  <div
                    className="text-accent text-[clamp(1.5rem,2.5vw,2.2rem)] font-medium leading-none mb-2"
                    style={{
                      fontFamily: "Sentient, Georgia, serif",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {s.v}
                  </div>
                  <div className="text-text-faint text-xs uppercase tracking-[0.12em]">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────── */}
      <section id="process" ref={processRef} className="bg-accent">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 md:py-36">
          <div className="flex items-start justify-between mb-20">
            <h2 className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] max-w-2xl text-white">
              From zero to settled in four phases.
            </h2>
            <div className="hidden lg:block w-[180px] shrink-0 ml-12 -mt-8">
              <svg viewBox="0 0 1000 1000" fill="none" className="w-full h-auto">
                <path d="M619.35 250.464C628.55 253.945 655.108 265.207 660.256 272.82C661.873 275.222 668.099 299.216 668.47 303.088C670.905 328.572 654.271 355.656 626.933 355.247C622.119 355.172 617.176 352.715 611.786 353.813C600.877 356.047 591.844 381.159 586.343 390.131C582.905 395.753 577.441 401.43 573.984 407.145C558.8 432.331 551.032 461.24 537.855 487.486C532.948 500.386 542.52 511.63 545.177 523.748C551.255 551.391 539.286 574.064 514.438 586.629C481.505 603.308 443.443 575.348 440.135 541.711C439.67 536.946 441.64 533.558 439.243 528.458C438.722 527.359 432.087 520.267 431.4 519.858C425.025 515.948 403.727 510.494 394.992 506.92C375.366 498.879 351.558 486.165 331.356 481.492C328.178 480.748 317.269 479.072 314.686 479.798C311.359 480.729 300.468 490.725 295.803 493.387C285.823 499.102 267.833 500.349 256.477 498.674C252.37 498.06 249.619 494.318 244.601 495.789C240.438 496.999 230.997 513.231 225.645 515.632C205.406 548.766 173.161 573.245 152.122 605.337C145.766 615.017 141.882 625.981 136.232 635.53C130.582 645.079 120.1 655.69 113.335 665.5C108.373 672.704 101.199 689.42 95.7911 694.837C95.5123 695.116 89.4908 698.374 88.8589 698.56C82.317 700.533 73.6935 696.959 71.8164 690.09V680.969C74.4555 677.525 75.4591 672.909 77.8751 669.297C88.0597 654.07 102.333 640.109 114.32 625.757C148.889 584.321 178.179 545.174 207.45 499.884C211 494.374 220.46 480.524 220.59 474.828C220.757 467.829 215.516 457.628 214.624 450.462C212.394 432.61 219.4 415.596 230.737 401.895C236.963 394.375 252.333 384.993 261.867 383.337C265.361 382.722 283.76 385.682 287.068 387.004C288.648 387.637 309.761 401.058 310.746 402.063C323.978 415.67 320.819 430.86 325.911 445.38C328.141 451.709 334.702 452.956 340.37 456.232C361.39 468.369 380.105 472.483 402.035 481.623C411.03 485.364 439.689 500.628 447.699 499.623C448.201 499.567 456.824 496.291 457.326 496.012C465.838 491.191 466.953 485.476 480.408 482.647C492.619 480.078 505.257 486.146 514.586 476.336C518.043 472.706 519.846 467.271 522.764 463.25C545.047 432.61 558.744 408.448 571.995 372.745C575.564 363.121 580.191 357.462 579.838 346.144C579.541 336.316 566.885 332.332 563.112 321.368C552.704 291.137 574.616 260.144 603.701 252.53L618.309 250.427H619.313L619.35 250.464Z" fill="#141413"/>
                <path d="M750.922 212.041C750.75 213.926 751.158 216.136 750.922 217.966C750.016 224.988 740.014 241.513 736.255 248.462C730.139 259.768 723.073 270.993 716.722 282.3C705.515 302.25 694.951 324.718 681.606 343.191C657.271 376.866 627.057 409.98 594.197 434.278C588.208 438.709 580.806 444.733 574.655 448.81C567.651 453.458 558.945 456.774 551.507 461.702C538.162 470.545 524.101 479.46 511.87 489.589C510.348 490.848 503.961 497.797 502.357 497.788C501.968 497.788 501.025 496.818 500.183 496.701C499.404 496.592 498.634 497.371 497.411 497.235C491.658 496.574 479.925 489.516 474.797 486.019C470.856 483.337 466.616 480.402 465.203 475.727C455.436 468.996 445.108 462.717 435.505 455.696C409.585 436.77 383.746 413.885 362.863 389.722C353.269 378.624 339.67 368.604 328.708 358.72C317.936 349.007 310.117 337.375 301.9 325.642C283.463 299.314 268.025 271.809 256.727 241.449C254.182 234.609 248.374 218.582 250.087 212.05C250.268 211.38 252.107 206.352 252.37 206.188C252.859 205.889 254.453 206.297 255.405 206.016C257.153 205.509 261.638 201.803 264.927 200.725C278.045 196.431 304.563 194.954 318.814 194.538C337.804 193.976 353.513 198.542 371.524 199.104C393.295 199.783 415.039 197.908 436.674 196.721C445.208 196.25 453.606 197.582 461.851 197.745C480.079 198.116 497.365 196.775 515.322 199.122C529.211 200.934 542.646 200.091 556.68 200.227C587.864 200.517 621.938 202.202 652.913 200.182C657.778 199.865 662.254 198.479 666.421 198.325C682.53 197.708 700.287 200.571 715.788 196.875C720.273 195.806 720.916 197.391 724.586 197.536C727.503 197.654 731.371 196.06 734.361 196.232C737.351 196.404 744.254 198.832 746.465 200.952C748.277 202.691 749.699 209.577 750.931 212.041H750.922ZM677.647 308.628C685.003 297.611 687.631 290.771 692.432 278.73C698.747 262.912 706.339 248.905 714.294 233.93C716.024 230.677 717.773 227.298 720.065 224.381L719.557 223.393C716.857 223.891 712.998 224.082 710.633 222.94C658.286 223.493 605.739 223.638 553.273 221.219C535.154 220.385 516.889 218.655 498.86 217.966C476.066 217.087 452.184 216.073 429.716 216.942C378.192 218.936 327.149 214.315 275.735 217.006C274.476 217.069 273.352 215.901 272.546 217.205C273.416 219.515 274.766 221.626 275.717 223.9C279.332 232.489 283.137 241.033 286.389 249.667C290.91 261.671 294.181 275.496 299.743 287.265C308.858 306.517 324.087 328.27 339.498 342.557C359.719 361.302 379.488 380.744 400.579 398.492C414.441 410.152 428.61 421.45 443.659 431.696C456.089 440.158 476.138 454.482 490.126 458.305C504.994 462.373 509.841 457.426 521.673 450.151C527.371 446.645 530.515 444.407 535.879 440.657C545.536 433.907 556.716 429.142 566.247 422.129C592.312 402.968 617.055 383.299 638.49 358.366C651.581 343.146 666.503 325.28 677.619 308.619L677.647 308.628Z" fill="#141413"/>
                <path d="M528.096 686.866C533.034 691.65 538.678 700.474 543.308 705.973C566.093 733.017 588.616 760.242 611.918 786.968C619.727 795.928 630.101 805.16 637.276 813.93C643.219 821.187 648.746 830.827 654.662 838.537C661.683 847.687 669.511 856.303 676.161 865.426C677.52 867.292 679.495 868.624 680.328 871.143C678.444 871.578 680.156 871.759 680.355 873.571C680.473 874.712 680.075 879.415 679.73 880.411C679.241 881.833 677.665 881.507 677.121 882.25C676.614 882.939 675.599 886.545 674.82 887.849C672.274 892.071 669.04 894.363 664.157 895.45C649.588 898.676 620.262 896.701 604.525 896.094C583.234 895.269 560.956 893.04 539.792 890.359C527.444 888.791 515.44 886.345 502.828 887.161C483.422 888.42 463.88 891.763 444.438 893.013C411.958 895.097 379.089 893.24 346.818 893.584C337.061 893.693 326.207 895.795 316.993 890.857C314.212 889.371 310.824 886.246 310.534 883.002C310.09 878.01 311.938 870.418 314.402 866.097C316.06 863.188 319.05 861.059 320.826 858.206C325.673 850.405 328.653 844.625 334.424 836.996C346.873 820.508 359.04 802.941 372.231 786.787C379.017 778.47 389.354 770.751 395.805 762.588C396.475 761.737 397.173 759.127 398.224 757.85C403.85 750.973 412.901 745.03 418.427 738.552C425.095 730.761 431.084 722.064 438.594 715.024C441.466 712.333 447.391 709.017 449.557 706.481C450.517 705.348 451.224 703.255 452.329 701.851C457.937 694.748 474.371 680.905 482.045 675.523C483.295 674.645 486.693 672.515 488.097 672.389C489.384 672.28 490.57 672.941 491.449 672.823C493.832 672.497 496.369 671.274 498.869 671.374C505.284 671.628 523.331 682.255 528.096 686.875V686.866ZM509.188 699.849C507.123 697.72 505.429 695.727 502.765 694.141C502.004 694.014 497.257 698.943 496.197 699.813C479.101 713.828 463.137 728.342 446.368 743.291C409.512 777.211 380.466 817.228 349.554 855.832L336.726 871.877C339.344 871.451 342.723 870.971 345.341 870.871C357.599 870.391 369.667 869.412 381.898 869.195C408.742 868.715 435.949 871.116 462.856 871.424C470.222 871.505 477.198 872.312 484.084 872.411C489.936 872.493 497.628 871.007 503.807 870.871C525.913 870.373 547.656 871.523 569.445 869.911C590.7 868.334 611.745 868.47 633.09 867.736C637.783 867.573 642.522 866.477 647.242 866.441C647.804 865.879 639.641 854.029 638.843 853.014C628.515 839.896 617.788 826.931 607.542 813.568C588.045 788.146 569.092 766.538 547.838 743.164C541.414 736.106 535.036 729.601 528.495 722.77C521.618 715.586 516.11 707.006 509.188 699.849Z" fill="#141413"/>
                <path d="M507.132 534.969C507.358 535.241 509.152 539.101 509.225 539.544C510.602 547.408 505.836 559.349 498.081 562.421C494.557 563.816 492.183 563.028 488.822 561.433C483.83 559.059 481.927 556.142 482.09 550.407C482.145 548.677 484.147 541.375 484.89 539.762C487.599 533.882 493.379 531.771 499.612 531.835C501.089 532.849 506.407 534.109 507.132 534.96V534.969Z" fill="#141413"/>
                <path d="M507.132 589.328C507.358 589.6 509.152 593.459 509.225 593.903C510.602 601.767 505.836 613.708 498.081 616.779C494.557 618.175 492.183 617.386 488.822 615.792C483.83 613.418 481.927 610.501 482.09 604.766C482.145 603.036 484.147 595.733 484.89 594.121C487.599 588.241 493.379 586.13 499.612 586.194C501.089 587.208 506.407 588.467 507.132 589.319V589.328Z" fill="#141413"/>
              </svg>
            </div>
          </div>

          <div className="relative">
            {/* ── Curvy dotted path ── */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M 450,30 C 450,120 920,80 920,220 S 450,320 450,480 S 920,560 920,720 S 450,820 450,940"
                stroke="#e8e6dc"
                strokeWidth="2.5"
                strokeDasharray="6 10"
                strokeLinecap="round"
                opacity="0.25"
                vectorEffect="non-scaling-stroke"
              />
              {/* Dots at each phase */}
              <circle cx="450" cy="30" r="5" fill="#e8e6dc" opacity="0.4" />
              <circle cx="920" cy="220" r="5" fill="#e8e6dc" opacity="0.4" />
              <circle cx="450" cy="480" r="5" fill="#e8e6dc" opacity="0.4" />
              <circle cx="920" cy="720" r="5" fill="#e8e6dc" opacity="0.4" />
            </svg>

            {[
              {
                num: "01",
                title: "Discovery",
                desc: "We map every repeatable workflow across your team. What eats time, what\u2019s error-prone, what\u2019s high-volume.",
                detail:
                  "You get a prioritised use-case matrix, not a pitch deck.",
                align: "left" as const,
                examples: [
                  "Offer generation",
                  "Vendor RFQs",
                  "Troubleshooting",
                  "Payroll processing",
                  "BOM creation",
                ],
              },
              {
                num: "02",
                title: "Architecture",
                desc: "Your entire rollout \u2014 use cases, departments, timelines, gaps, and skills \u2014 in one interactive dashboard.",
                detail:
                  "Live project tracking. Tier-based phasing. Gap analysis built in.",
                align: "right" as const,
                examples: [
                  "18 functional projects",
                  "4-tier phased rollout",
                  "Dependency mapping",
                  "Skills gap analysis",
                ],
              },
              {
                num: "03",
                title: "Instruction Engineering",
                desc: "We write production-grade project instructions for every use case. Not prompts \u2014 structured workflows with review gates, rules, and knowledge files.",
                detail:
                  "Your team uses the tool. They don\u2019t need to understand the tool.",
                align: "left" as const,
                examples: [
                  "Pricing calculator",
                  "Config suggestor",
                  "Email writer",
                  "RFQ template builder",
                  "Service diagnostics",
                ],
              },
              {
                num: "04",
                title: "Deploy & Settle",
                desc: "We deploy, train your team, and iterate. Quick wins ship in weeks. Deeper integrations follow in phases.",
                detail: "A roadmap you can actually execute.",
                align: "right" as const,
                examples: [
                  "85% faster docs",
                  "400+ hrs/mo saved",
                  "$200K+ annual savings",
                  "11 projects live",
                ],
              },
            ].map((p) => (
              <div
                key={p.num}
                className={`fade-up relative py-14 md:py-20 ${
                  p.align === "right" ? "md:flex md:justify-end" : ""
                }`}
              >
                <div className="max-w-md">
                  <span
                    className="text-white/70 text-[15px] font-medium block mb-4"
                    style={{ fontFamily: "Sentient, Georgia, serif" }}
                  >
                    {p.num}
                  </span>
                  <h3 className="text-white text-[clamp(1.5rem,2.5vw,2rem)] font-medium mb-4">
                    {p.title}
                  </h3>
                  <p className="text-white/85 leading-[1.75] mb-3">
                    {p.desc}
                  </p>
                  <p className="text-white/60 text-sm mb-5">{p.detail}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.examples.map((ex) => (
                      <span
                        key={ex}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/12 text-white/90 border border-white/15"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────── */}
      <section id="services" ref={servicesRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="h-px bg-border-light" />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 md:py-36">
          <h2 className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] mb-20">
            What we deliver.
          </h2>

          <div className="grid md:grid-cols-2 gap-px bg-border-light rounded-2xl overflow-hidden stagger">
            {[
              {
                title: "AI Readiness Assessment",
                items: [
                  "Department-by-department workflow audit",
                  "Use case discovery and prioritisation",
                  "Tier-based rollout map and blocker analysis",
                ],
              },
              {
                title: "Deployment Dashboard",
                items: [
                  "Interactive rollout visualisation",
                  "Project-level tracking",
                  "Skill mapping and architecture recommendations",
                  "Kanban board for execution",
                ],
              },
              {
                title: "Instruction Engineering",
                items: [
                  "Production-grade Claude instructions",
                  "Per-project knowledge file specifications",
                  "Review gates and safety rules",
                  "Output format and formatting standards",
                ],
              },
              {
                title: "Setup & Training",
                items: [
                  "Project creation and configuration",
                  "Knowledge file preparation",
                  "Team training and onboarding",
                  "Ongoing iteration and support",
                ],
              },
            ].map((s) => (
              <div key={s.title} className="fade-up bg-bg p-8 md:p-10">
                <h3 className="text-lg font-medium mb-5">{s.title}</h3>
                <ul className="space-y-3">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] text-text-muted leading-relaxed"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who it's for ─────────────────────────────── */}
      <section ref={audienceRef}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="h-px bg-border-light" />
        </div>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24 md:py-36">
          <h2 className="fade-up text-[clamp(1.8rem,3.5vw,3rem)] font-medium leading-[1.12] mb-20 max-w-2xl">
            Built for teams who&apos;d rather ship than strategise.
          </h2>

          <div className="grid md:grid-cols-3 gap-px bg-border-light rounded-2xl overflow-hidden stagger">
            {[
              {
                title: "Startups",
                desc: "Small team, no time to waste. We deploy AI across your workflows so five people operate like fifty.",
              },
              {
                title: "SMBs & Manufacturers",
                desc: "Departments, processes, documents. We map the complexity, structure the rollout, and deploy without disruption.",
              },
              {
                title: "Solo Operators",
                desc: "You\u2019re one person doing everything. We build your AI operating system so you can focus on the work that matters.",
              },
            ].map((a) => (
              <div key={a.title} className="fade-up bg-bg p-8 md:p-10">
                <h3 className="text-lg font-medium mb-3">{a.title}</h3>
                <p className="text-text-muted text-[15px] leading-[1.7]">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section id="contact" ref={ctaRef} className="bg-accent">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-28 md:py-40">
          <div className="max-w-xl mx-auto text-center">
            <div className="fade-up mb-10">
              <div className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-2xl bg-[rgba(0,0,0,0.12)] flex items-center justify-center">
                <SettleMark className="h-16 md:h-20 w-auto" stroke="white" />
              </div>
            </div>
            <h2 className="fade-up text-[clamp(1.8rem,4vw,3.5rem)] font-medium leading-[1.1] mb-5 text-white">
              Ready to settle in?
            </h2>
            <p className="fade-up text-white/70 text-[17px] leading-relaxed mb-12">
              Tell us about your team. We&apos;ll scope your rollout and come
              back with a concrete plan &mdash; what ships first, what comes
              next.
            </p>
            {submitted ? (
              <div className="fade-up visible">
                <p className="text-white text-lg font-medium mb-2">
                  Thanks — we&apos;ll be in touch.
                </p>
                <p className="text-white/50 text-sm">
                  Expect a reply within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email }),
                    });
                    if (res.ok) {
                      setSubmitted(true);
                    }
                  }}
                  className="fade-up flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3.5 text-sm text-white placeholder-white/40 focus:border-white/40 focus:outline-none transition-colors duration-200"
                  />
                  <button
                    type="submit"
                    className="bg-white text-accent font-medium px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors duration-200 whitespace-nowrap text-[15px]"
                  >
                    Let&apos;s talk
                  </button>
                </form>
                <p className="fade-up text-white/40 text-sm mt-5">
                  We&apos;ll respond within 24 hours. Or{" "}
                  <button
                    type="button"
                    data-cal-namespace="15min"
                    data-cal-link="settle-ai/15min"
                    data-cal-config='{"layout":"month_view"}'
                    className="text-white/70 underline hover:text-white transition-colors"
                  >
                    book a 15-min call
                  </button>
                  .
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="bg-bg-dark text-[#e8e6dc]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-12 flex items-center justify-between">
          <span className="flex items-center gap-2.5">
            <SettleMark className="h-6 w-auto" stroke="#e8e6dc" />
            <span
              className="text-[1rem] font-medium tracking-[-0.03em]"
              style={{ fontFamily: "Sentient, Georgia, serif" }}
            >
              SETTLE
            </span>
          </span>
          <span className="text-[rgba(232,230,220,0.4)] text-sm">
            AI, thoughtfully deployed.
          </span>
        </div>
      </footer>
    </main>
  );
}
