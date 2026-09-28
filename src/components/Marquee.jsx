export default function Marquee({ items }) {
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-[#C8A96A]/25 bg-[#131316] py-3">
      <div className="animate-marquee flex w-max gap-8 whitespace-nowrap text-sm font-bold tracking-[0.2em] text-[#C8A96A]">
        {row.map((x, i) => <span key={i}>◆ {x}</span>)}
      </div>
    </div>
  )
}
