"use client";
import { useEffect, useRef, useState } from "react";

export default function Counter({ count, suffix }: { count: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1800, step = 16, inc = count / (dur / step);
        let cur = 0;
        const t = setInterval(() => { cur += inc; if (cur >= count) { cur = count; clearInterval(t); } setVal(Math.floor(cur)); }, step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [count]);
  return <span ref={ref} className="count-up">{val}{suffix}</span>;
}
