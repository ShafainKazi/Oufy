// OutfitAI landing page — immersive linear story: hero → add → generate → try on → pricing → get the app.
const { Button, Chip, SectionHeader, PickCard, Icon, useBreakpoint } = window;

const IMG = (n) => `./assets/images/${n}`;
const goTo = (id) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' }); };

function Nav() {
  const { mobile } = useBreakpoint();
  return (
    <nav style={{
      position: 'sticky', top: mobile ? 12 : 16, zIndex: 10,
      margin: mobile ? '12px 16px 0' : '16px auto 0', maxWidth: 1080,
      display: 'flex', alignItems: 'center', gap: mobile ? 12 : 28,
      padding: mobile ? '8px 8px 8px 18px' : '12px 24px', boxSizing: 'border-box',
      background: 'rgba(246,240,230,0.7)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid var(--glass-border-strong)', borderRadius: 100, boxShadow: 'var(--shadow-glass)',
    }}>
      <span style={{ font: `800 ${mobile ? 18 : 20}px var(--font-ui)`, letterSpacing: '-0.5px', whiteSpace: 'nowrap' }}>OutfitAI</span>
      <span style={{ flex: 1 }}></span>
      {/* §14: on mobile the nav keeps only the wordmark and the CTA. */}
      {!mobile && [['Try it', 'experience'], ['Pricing', 'pricing']].map(([l, id]) => (
        <button key={id} onClick={() => goTo(id)} style={{ font: '600 13px var(--font-ui)', color: 'var(--ink-muted)', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>{l}</button>
      ))}
      <Button label="Get the app" compact onClick={() => goTo('get-app')} />
    </nav>
  );
}

function Hero() {
  const { tablet, mobile } = useBreakpoint();
  return (
    <header style={{ position: 'relative', overflow: 'hidden', marginTop: -76, paddingTop: 76 }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--grad-mesh-base)' }}>
        <div className="blob blob-a" style={{ left: '-6%', top: '10%', width: 420, height: 420, background: '#F6E3BE', opacity: .9 }}></div>
        <div className="blob blob-b" style={{ right: '-4%', top: '-14%', width: 380, height: 380, background: 'rgba(184,122,58,.28)' }}></div>
        <div className="blob blob-a" style={{ left: '40%', bottom: '-30%', width: 460, height: 460, background: 'rgba(212,160,96,.35)', animationDelay: '2s' }}></div>
      </div>
      <div style={{
        position: 'relative', maxWidth: 1080, margin: '0 auto',
        padding: mobile ? '48px 20px 60px' : tablet ? '68px 24px 80px' : '84px 24px 96px',
        display: 'grid', gridTemplateColumns: tablet ? 'minmax(0, 1fr)' : 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
        gap: tablet ? 44 : 64, alignItems: 'center',
      }}>
        <div>
          <div style={{ font: 'var(--text-overline)', fontFamily: 'var(--font-ui)', letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Your daily stylist</div>
          <h1 style={{ font: `500 ${mobile ? 36 : tablet ? 46 : 56}px/1.1 var(--font-display)`, margin: '14px 0 0' }}>Your wardrobe,<br/>styled daily</h1>
          <p style={{ font: 'var(--text-prose)', fontSize: mobile ? 15 : 17, color: 'var(--ink-muted)', maxWidth: 440, margin: '22px 0 0' }}>
            Add the clothes you own. Get a look for today, with the reasoning to see why. Try it on before you get dressed. Walk through it below — for real.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', marginTop: mobile ? 26 : 32 }}>
            <Button label="Try the demo" onClick={() => goTo('experience')} />
            <Button label="See pricing" variant="text" onClick={() => goTo('pricing')} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: mobile ? 22 : 28 }}>
            <Chip label="Weather-aware" icon="partly_cloudy_day" iconColor="var(--action)" muted translucent />
            <Chip label="Explainable picks" icon="auto_awesome" iconColor="var(--action)" muted translucent />
            <Chip label="Virtual try-on" icon="checkroom" iconColor="var(--action)" muted translucent />
          </div>
        </div>
        <div style={{ maxWidth: 360, justifySelf: 'center', width: '100%' }}>
          <PickCard src={IMG('demo/outfit-smart-casual.png')} alt="Today's outfit pick" title="Smart Casual"
            pieces={['Navy Shirt', 'Beige Chinos', 'White Sneakers']} stageHeight={250}
            imgStyle={{ mixBlendMode: 'multiply' }}
            ctaLabel="Try this on" onCta={() => goTo('experience')} />
        </div>
      </div>
    </header>
  );
}

function Pricing() {
  const { tablet, mobile } = useBreakpoint();
  const perks = [
    ['auto_awesome', 'Daily outfit recommendations', 'Weather- and occasion-aware looks from your own wardrobe, every morning.'],
    ['photo_camera', '25 virtual try-ons a month', 'See any look on your photo before you commit to it.'],
    ['design_services', 'The outfit canvas', 'Build your own looks — drag, swap and style pieces, then try them on.'],
  ];
  return (
    <section id="pricing" style={{ maxWidth: 1080, margin: '0 auto', padding: mobile ? '56px 20px' : '72px 24px' }}>
      <SectionHeader eyebrow="Pricing" title="Try it free, keep it for less than a coffee a week" />
      <div style={{ display: 'grid', gridTemplateColumns: tablet ? 'minmax(0, 1fr)' : 'minmax(0, 0.9fr) minmax(0, 1.1fr)', gap: 20, marginTop: 28, alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            borderRadius: 'var(--radius-lg)', padding: mobile ? '22px 20px' : '26px 30px', boxSizing: 'border-box',
            background: 'var(--surface)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-glass)',
          }}>
            <span style={{ alignSelf: 'flex-start', display: 'inline-block', padding: '4px 10px', borderRadius: 12, background: 'var(--canvas)', border: '1px solid var(--line)', font: '700 11px var(--font-ui)', color: 'var(--ink-muted)' }}>7-day trial</span>
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ font: '800 34px var(--font-ui)', letterSpacing: '-1px', color: 'var(--ink)' }}>Free</span>
              <span style={{ font: '500 13px var(--font-ui)', color: 'var(--ink-muted)' }}>for a week</span>
            </div>
            <p style={{ font: '400 13px/1.55 var(--font-ui)', color: 'var(--ink-muted)', margin: '8px 0 0' }}>
              Full capabilities of the app, with 5 virtual try-ons. No card up front.
            </p>
          </div>
          <div style={{
            flex: 1, borderRadius: 'var(--radius-lg)', padding: mobile ? '22px 20px' : '26px 30px', boxSizing: 'border-box',
            background: 'var(--grad-premium-dark)', color: '#fff', boxShadow: 'var(--shadow-elevated)',
            display: 'flex', flexDirection: 'column',
          }}>
            <span style={{ alignSelf: 'flex-start', padding: '4px 10px', borderRadius: 12, background: 'rgba(184,122,58,0.25)', border: '1px solid rgba(184,122,58,0.4)', font: '700 11px var(--font-ui)', color: '#fff' }}>Core</span>
            <div style={{ marginTop: 18, display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ font: `800 ${mobile ? 36 : 44}px var(--font-ui)`, letterSpacing: '-1.5px' }}>$12.99</span>
              <span style={{ font: '500 14px var(--font-ui)', color: 'rgba(255,255,255,0.7)' }}>/ month</span>
            </div>
            <p style={{ font: '400 13px/1.55 var(--font-ui)', color: 'rgba(255,255,255,0.75)', margin: '8px 0 0', maxWidth: 300 }}>
              Everything OutfitAI does, in one quiet subscription. Cancel anytime.
            </p>
            <div style={{ marginTop: 'auto', paddingTop: 22 }}>
              <Button label="Start free, then Core" onClick={() => goTo('get-app')} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {perks.map(([icon, title, body]) => (
            <div key={title} style={{ flex: 1, display: 'flex', gap: mobile ? 12 : 16, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', padding: mobile ? '18px 18px' : '20px 24px', boxShadow: 'var(--shadow-glass)' }}>
              <span style={{ width: 40, height: 40, borderRadius: 14, flex: 'none', background: 'var(--canvas)', border: '1px solid var(--line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={icon} size={20} color="var(--action)" />
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', font: '700 15px var(--font-ui)', color: 'var(--ink)' }}>{title}</span>
                <span style={{ display: 'block', font: '400 13px/1.5 var(--font-ui)', color: 'var(--ink-muted)', marginTop: 4 }}>{body}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GetApp() {
  const { tablet, mobile } = useBreakpoint();
  return (
    <section id="get-app" style={{ position: 'relative', overflow: 'hidden', marginTop: 24 }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--grad-mesh-base)' }}>
        <div className="blob blob-b" style={{ left: '18%', top: '-40%', width: 360, height: 360, background: 'rgba(212,160,96,.4)' }}></div>
        <div className="blob blob-a" style={{ right: '10%', bottom: '-50%', width: 400, height: 400, background: '#F6E3BE' }}></div>
      </div>
      <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto', padding: mobile ? '64px 20px' : '88px 24px', textAlign: 'center' }}>
        <div style={{ font: `500 ${mobile ? 30 : tablet ? 34 : 40}px/1.15 var(--font-display)` }}>Get dressed with intention</div>
        <p style={{ font: 'var(--text-prose)', fontSize: mobile ? 15 : 16, color: 'var(--ink-muted)', margin: '16px auto 0', maxWidth: 440 }}>Start with the pieces you already own.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 28 }}>
          <Button label="Get the app" />
          <Button label="Try the demo again" variant="text" onClick={() => goTo('experience')} />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { mobile } = useBreakpoint();
  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--canvas)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: mobile ? '24px 20px' : '28px 24px', display: 'flex', alignItems: 'center', gap: mobile ? 12 : 24 }}>
        <span style={{ font: '800 16px var(--font-ui)', letterSpacing: '-0.4px' }}>OutfitAI</span>
        <span style={{ flex: 1 }}></span>
        <span style={{ font: '500 12px var(--font-ui)', color: 'var(--ink-tertiary)' }}>© 2026 OutfitAI</span>
      </div>
    </footer>
  );
}

function Landing() {
  const Experience = window.OufyExperience;
  return (
    <div data-screen-label="Landing">
      <Nav />
      <Hero />
      <Experience />
      <Pricing />
      <GetApp />
      <Footer />
    </div>
  );
}

window.OufyLanding = Landing;
