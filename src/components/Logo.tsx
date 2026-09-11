export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand-lockup" aria-label="Edituno">
      <div className="brand-mark" aria-hidden="true">
        <span className="brand-mark-cut" />
        <span className="brand-mark-play" />
      </div>
      {!compact && <span className="brand-word">Edituno</span>}
    </div>
  )
}
