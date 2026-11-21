export default function BecomeHost() {
  return (
    <div className="md:hidden cursor-pointer flex flex-col rounded-md border border-black/5 bg-white p-4 shadow-[0_0_16px_rgba(0,0,0,0.08)]">
      <a
        href="https://wakuma-dev.github.io/Lokestays-host-dashboard"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Become a host on Lokestays"
        className="cursor-pointer text-[16px] leading-[20px] font-medium tracking-normal text-[#222222]"
      >
        Become a host
      </a>
      <p className="text-[12px] leading-[16px] font-normal tracking-normal text-[#6c6c6c]">
        it&apos;s easy to start hosting and earn extra income
      </p>
    </div>
  );
}