// OutfitAI landing — UI components (extracted from the OutfitAI design system)
// Loaded via Babel standalone; components are shared through window.


/**
 * Material Symbols Rounded glyph — mirrors Flutter's Icons.*_rounded / *_outlined.
 * Requires the Material Symbols Rounded stylesheet (loaded by styles consumers or card HTML).
 */
function Icon({ name, size = 24, filled = false, color = 'currentColor', style }) {
  return (
    <span
      aria-hidden="true"
      style={{
        fontFamily: "'Material Symbols Rounded'",
        fontSize: size,
        lineHeight: 1,
        color,
        display: 'inline-block',
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${Math.min(48, Math.max(20, size))}`,
        userSelect: 'none',
        ...style,
      }}
    >
      {name}
    </span>
  );
}


/**
 * Primary action button — gold→brown gradient (HomePrimaryButton).
 * variant "primary" | "text". Loading swaps label for a spinner.
 */
function Button({ label, onClick, variant = 'primary', compact = false, loading = false, block = false, style }) {
  const [pressed, setPressed] = React.useState(false);

  if (variant === 'text') {
    return (
      <button
        onClick={onClick}
        style={{
          font: 'var(--text-chip)', fontFamily: 'var(--font-ui)', color: 'var(--action)',
          background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
          padding: 'var(--space-xs) var(--space-sm)', borderRadius: 8,
          opacity: pressed ? 0.6 : 1, ...style,
        }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
      >
        {label}
      </button>
    );
  }

  const h = compact ? 36 : 46;
  return (
    <button
      onClick={loading ? undefined : onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        height: h,
        padding: `0 ${compact ? 'var(--space-lg)' : 'var(--space-xxl)'}`,
        width: block ? '100%' : undefined,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap',
        border: 'none', borderRadius: 'var(--radius-md)', cursor: loading ? 'default' : 'pointer',
        background: pressed
          ? 'linear-gradient(90deg, var(--accent-light), var(--action-light))'
          : 'var(--grad-cta)',
        boxShadow: 'var(--shadow-cta)',
        color: 'var(--on-action)',
        fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: compact ? 13 : 14,
        transition: 'background .15s ease',
        ...style,
      }}
    >
      {loading ? (
        <span style={{
          width: compact ? 16 : 20, height: compact ? 16 : 20,
          border: '2px solid var(--on-action)', borderTopColor: 'transparent',
          borderRadius: '50%', display: 'inline-block',
          animation: 'oufy-spin .8s linear infinite',
        }} />
      ) : label}
      <style>{'@keyframes oufy-spin{to{transform:rotate(360deg)}}'}</style>
    </button>
  );
}


/**
 * Quiet chip — canvas fill, hairline border, radius-sm (piece chips, context
 * chips, view affordances, season tags).
 */
function Chip({ label, icon, iconColor = 'var(--ink-muted)', muted = false, translucent = false, style }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 'var(--space-xs)',
      padding: '4px 10px',
      background: translucent ? 'rgba(246,240,230,0.82)' : 'var(--canvas)',
      border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 12,
      color: muted ? 'var(--ink-muted)' : 'var(--ink)',
      whiteSpace: 'nowrap', ...style,
    }}>
      {icon && <Icon name={icon} size={13} color={iconColor} />}
      {label}
    </span>
  );
}


/**
 * Section header — tracked-out uppercase eyebrow + bold Jakarta title,
 * optional trailing text action (HomeSectionHeader).
 */
function SectionHeader({ eyebrow, title, actionLabel, onAction, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-sm)', ...style }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          font: 'var(--text-overline)', fontFamily: 'var(--font-ui)',
          letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase',
          color: 'var(--ink-muted)',
        }}>{eyebrow}</div>
        <div style={{
          font: 'var(--text-title)', fontFamily: 'var(--font-ui)',
          letterSpacing: 'var(--tracking-title)', color: 'var(--ink)',
          marginTop: 'var(--space-xs)',
        }}>{title}</div>
      </div>
      {actionLabel && (
        <button onClick={onAction} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          font: 'var(--text-chip)', fontFamily: 'var(--font-ui)',
          color: 'var(--action)', padding: 'var(--space-xs) var(--space-sm)',
        }}>{actionLabel}</button>
      )}
    </div>
  );
}


/** Page indicator dots — action-brown active, hairline inactive. */
function PageDots({ count, current = 0, style }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', ...style }}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} style={{
          width: i === current ? 18 : 6, height: 6, borderRadius: 3,
          background: i === current ? 'var(--action)' : 'var(--line)',
          transition: 'all .25s ease',
        }} />
      ))}
    </div>
  );
}


/**
 * Today's Pick hero card — radial "stage" glow holding the outfit cutout,
 * solid surface info panel with title + piece chips + CTA (TodayPickPager _PickCard).
 */
function PickCard({ src, alt = '', title, pieces = [], pieceCount, ctaLabel = 'Try this on', onCta, onOpen, stageHeight = 260, imgStyle, style }) {
  const count = pieceCount ?? pieces.length + 1;
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--line)',
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      boxShadow: 'var(--shadow-card)', fontFamily: 'var(--font-ui)', ...style,
    }}>
      <div
        onClick={onOpen}
        style={{
          height: stageHeight, position: 'relative', cursor: onOpen ? 'pointer' : 'default',
          background: 'radial-gradient(115% 100% at 50% 22%, #FBF7EF 0%, var(--canvas) 55%, var(--tile) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 'var(--space-xl)', boxSizing: 'border-box',
        }}
      >
        {src && <img src={src} alt={alt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', ...imgStyle }} />}
        {count > 0 && (
          <div style={{ position: 'absolute', top: 'var(--space-md)', left: 'var(--space-md)' }}>
            <Chip label={`${count} ${count === 1 ? 'piece' : 'pieces'}`} icon="auto_awesome" iconColor="var(--action)" muted translucent />
          </div>
        )}
        {onOpen && (
          <div style={{ position: 'absolute', top: 'var(--space-md)', right: 'var(--space-md)' }}>
            <Chip label="View" icon="open_in_full" muted />
          </div>
        )}
      </div>
      <div style={{ padding: 'var(--space-lg) var(--space-xl)' }}>
        <div style={{
          font: 'var(--text-title)', fontFamily: 'var(--font-ui)',
          letterSpacing: 'var(--tracking-title)', color: 'var(--ink)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{title}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)', marginTop: 'var(--space-md)' }}>
          {pieces.length > 0
            ? pieces.slice(0, 3).map((p) => <Chip key={p} label={p} />)
            : <span style={{ font: 'var(--text-body-md)', fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--ink-muted)' }}>A look from your wardrobe</span>}
        </div>
        <div style={{ marginTop: 'var(--space-lg)' }}>
          <Button label={ctaLabel} block onClick={onCta} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Button, Chip, SectionHeader, PageDots, PickCard });
