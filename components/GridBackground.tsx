'use client';

export function GridBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 90%)',
        }}
      />
      <div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(closest-side, rgba(16,185,129,0.55), transparent 80%)' }}
      />
      <div
        className="absolute top-1/3 -right-48 h-[560px] w-[560px] rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(closest-side, rgba(34,211,238,0.45), transparent 80%)' }}
      />
      <div
        className="absolute bottom-[-200px] left-1/4 h-[520px] w-[520px] rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(closest-side, rgba(139,92,246,0.4), transparent 80%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(5,7,12,0.75) 100%)' }}
      />
    </div>
  );
}
