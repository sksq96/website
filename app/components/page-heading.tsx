// big centered page title, matching /vibes; count sits under it like "59 saves"
export function PageHeading({ children, count }: { children: React.ReactNode; count?: string }) {
  return (
    <div className="![grid-column:1/-1] text-center mt-2 md:mt-[10px] mb-[22px] md:mb-[30px]">
      <h1 className="italic font-extrabold text-[clamp(58px,11.5vw,156px)] leading-[.84] tracking-[-.03em] pb-[.18em]">{children}</h1>
      {count && <p className="text-[14px] text-neutral-500">{count}</p>}
    </div>
  )
}
