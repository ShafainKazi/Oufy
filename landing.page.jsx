// OutfitAI landing page — immersive linear story: hero → add → generate → try on → pricing → get the app.
const { Button, Chip, SectionHeader, PickCard, Icon } = window;

const IMG = (n) => `./assets/images/${n}`;
const goTo = (id) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' }); };

function Nav() {
  return (
    <nav style={{
      position: 'sticky', top: 16, zIndex: 10, margin: '16px auto 0', maxWidth: 1080,
      display: 'flex', alignItems: 'center', gap: 28, padding: '12px 24px', boxSizing: 'border-box',
      background: 'rgba(246,240,230,0.7)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid var(--glass-border-strong)', borderRadius: 100, boxShadow: 'var(--shadow-glass)',
    }}>
      <span style={{ font: '800 20px var(--font-ui)', letterSpacing: '-0.5px', whiteSpace: 'nowrap' }}>OutfitAI</span>
      <span style={{ flex: 1 }}></span>
      {[['Try it', 'experience'], ['Pricing', 'pricing']].map(([l, id]) => (
        <button key={id} onClick={() => goTo(id)} style={{ font: '600 13px var(--font-ui)', color: 'var(--ink-muted)', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>{l}</button>
      ))}
      <Button label="Get the app" compact onClick={() => goTo('get-app')} />
    </nav>
  );
}

function Hero() {
  return (
    <header style={{ position: 'relative', overflow: 'hidden', marginTop: -76, paddingTop: 76 }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--grad-mesh-base)' }}>
        <div className="blob blob-a" style={{ left: '-6%', top: '10%', width: 420, height: 420, background: '#F6E3BE', opacity: .9 }}></div>
        <div className="blob blob-b" style={{ right: '-4%', top: '-14%', width: 380, height: 380, background: 'rgba(184,122,58,.28)' }}></div>
        <div className="blob blob-a" style={{ left: '40%', bottom: '-30%', width: 460, height: 460, background: 'rgba(212,160,96,.35)', animationDelay: '2s' }}></div>
      </div>
      <div style={{ position: 'relative', maxWidth: 1080, margin: '0 auto', padding: '84px 24px 96px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div style={{ font: 'var(--text-overline)', fontFamily: 'var(--font-ui)', letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Your daily stylist</div>
          <h1 style={{ font: '500 56px/1.1 var(--font-display)', margin: '14px 0 0' }}>Your wardrobe,<br/>styled daily</h1>
          <p style={{ font: 'var(--text-prose)', fontSize: 17, color: 'var(--ink-muted)', maxWidth: 440, margin: '22px 0 0' }}>
            Add the clothes you own. Get a look for today, with the reasoning to see why. Try it on before you get dressed. Walk through it below — for real.
          </p>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 32 }}>
            <Button label="Try the demo" onClick={() => goTo('experience')} />
            <Button label="See pricing" variant="text" onClick={() => goTo('pricing')} />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
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
  const perks = [
    ['auto_awesome', 'Daily outfit recommendations', 'Weather- and occasion-aware looks from your own wardrobe, every morning.'],
    ['photo_camera', '25 virtual try-ons a month', 'See any look on your photo before you commit to it.'],
    ['design_services', 'The outfit canvas', 'Build your own looks — drag, swap and style pieces, then try them on.'],
  ];
  return (
    <section id="pricing" style={{ maxWidth: 1080, margin: '0 auto', padding: '72px 24px' }}>
      <SectionHeader eyebrow="Pricing" title="Try it free, keep it for less than a coffee a week" />
      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 20, marginTop: 28, alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            borderRadius: 'var(--radius-lg)', padding: '26px 30px', boxSizing: 'border-box',
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
            flex: 1, borderRadius: 'var(--radius-lg)', padding: '26px 30px', boxSizing: 'border-box',
            background: 'var(--grad-premium-dark)', color: '#fff', boxShadow: 'var(--shadow-elevated)',
            display: 'flex', flexDirection: 'column',
          }}>
            <span style={{ alignSelf: 'flex-start', padding: '4px 10px', borderRadius: 12, background: 'rgba(184,122,58,0.25)', border: '1px solid rgba(184,122,58,0.4)', font: '700 11px var(--font-ui)', color: '#fff' }}>Core</span>
            <div style={{ marginTop: 18, display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ font: '800 44px var(--font-ui)', letterSpacing: '-1.5px' }}>$12.99</span>
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
            <div key={title} style={{ flex: 1, display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', padding: '20px 24px', boxShadow: 'var(--shadow-glass)' }}>
              <span style={{ width: 40, height: 40, borderRadius: 14, flex: 'none', background: 'var(--canvas)', border: '1px solid var(--line)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={icon} size={20} color="var(--action)" />
              </span>
              <span>
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
  return (
    <section id="get-app" style={{ position: 'relative', overflow: 'hidden', marginTop: 24 }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--grad-mesh-base)' }}>
        <div className="blob blob-b" style={{ left: '18%', top: '-40%', width: 360, height: 360, background: 'rgba(212,160,96,.4)' }}></div>
        <div className="blob blob-a" style={{ right: '10%', bottom: '-50%', width: 400, height: 400, background: '#F6E3BE' }}></div>
      </div>
      <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto', padding: '88px 24px', textAlign: 'center' }}>
        <div style={{ font: '500 40px/1.15 var(--font-display)' }}>Get dressed with intention</div>
        <p style={{ font: 'var(--text-prose)', fontSize: 16, color: 'var(--ink-muted)', margin: '16px auto 0', maxWidth: 440 }}>Start with the pieces you already own.</p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 28 }}>
          <Button label="Get the app" />
          <Button label="Try the demo again" variant="text" onClick={() => goTo('experience')} />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--line)', background: 'var(--canvas)' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '28px 24px', display: 'flex', alignItems: 'center', gap: 24 }}>
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
