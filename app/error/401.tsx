"use client";

export default function Error401() {
  return (
    <section className="no-body-padding flex flex-col gap-2 min-h-screen min-w-screen w-full h-full items-center justify-center bg-[linear-gradient(180deg,#FFF_0%,var(--Cloud,#DAE0DA)_100%)]">
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 gap-4">
        <div className="relative select-none">
          <h1 className="text-dark-green font-extrabold text-8xl md:text-9xl tracking-tight drop-shadow-[4px_4px_0px_var(--color-cloud)]">
            401
          </h1>
        </div>
        <div className="w-16 bg-dark-green h-[4px] rounded-full my-1"></div>
        <div className="flex flex-col gap-1">
          <h2 className="text-dark-green font-bold text-2xl tracking-wide">
            Unauthorized
          </h2>
          <p className="text-gray text-base max-w-md">
            You do not have permission to access this page.
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-full bg-dark-green text-white font-medium text-sm transition-all hover:opacity-90 active:scale-95 shadow-md"
          >
            Refresh
          </button>
          <a
            href="/login"
            className="px-6 py-2.5 rounded-full border-2 border-dark-green text-dark-green font-medium text-sm transition-all hover:bg-dark-green/5 active:scale-95"
          >
            Back to Login
          </a>
        </div>
      </div>
    </section>
  );
}
