import { useState } from 'react'

export default function BeforeAfter({ before, after }) {
  const [v, setV] = useState(50)
  return (
    <div className="relative select-none overflow-hidden rounded-3xl border border-white/10">
      <img src={after} alt="après" className="h-72 w-full object-cover md:h-96" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${v}%` }}>
        <img src={before} alt="avant" className="h-72 w-full max-w-none object-cover md:h-96" style={{ width: '100vw' }} draggable={false} />
      </div>
      <input
        type="range" min={0} max={100} value={v} onChange={(e) => setV(+e.target.value)}
        className="absolute inset-x-0 bottom-4 mx-auto w-2/3 accent-[#C8A96A]"
        aria-label="avant après"
      />
      <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-bold">AVANT</span>
      <span className="absolute right-3 top-3 rounded-full bg-[#C8A96A] px-3 py-1 text-[11px] font-bold text-black">APRÈS</span>
    </div>
  )
}
