// OutfitAI landing — the interactive linear experience: add clothes → generate → try on.
const { Button, Chip, SectionHeader, Icon, PageDots, useBreakpoint } = window;

const XIMG = (n) => `./assets/images/demo/${n}`;
const LATENCY = 1000;                                // simulated generate/try-on delay

const CLOSET = [
  { id: 'blue', name: 'Navy Shirt', brand: 'Uniqlo', img: XIMG('cut-item-blue-shirt.png') },
  { id: 'striped', name: 'Striped White Shirt', brand: 'Charles Tyrwhitt', img: XIMG('cut-item-striped-shirt.png') },
  { id: 'polo', name: 'Burgundy Knit Polo', brand: 'COS', img: XIMG('cut-item-burgundy-polo.png') },
  { id: 'beige', name: 'Beige Chinos', brand: 'Dockers', img: XIMG('cut-item-beige-chinos.png') },
  { id: 'offwhite', name: 'Off-White Chinos', brand: 'J.Crew', img: XIMG('cut-item-offwhite-chinos.png') },
  { id: 'black-tr', name: 'Black Trousers', brand: 'Theory', img: XIMG('cut-item-black-trousers.png') },
  { id: 'white-sh', name: 'White Sneakers', brand: 'Common Projects', img: XIMG('cut-item-white-shoes.png') },
  { id: 'black-sh', name: 'Black Loafers', brand: 'Meermin', img: XIMG('cut-item-black-shoes.png') },
  { id: 'brown-sh', name: 'Brown Loafers', brand: 'Meermin', img: XIMG('cut-item-brown-shoes.png') },
];

const OUTFITS = [
  {
    flat: XIMG('outfit-smart-casual.png'), tryon: XIMG('cut-model-casual.png'), title: 'Smart Casual',
    pieces: ['Navy Shirt', 'Beige Chinos', 'White Sneakers'],
    why: 'Mild and sunny — breathable cotton, sleeves ready to roll, nothing that fights the weather.',
  },
  {
    flat: XIMG('outfit-work.png'), tryon: XIMG('cut-model-work.png'), title: 'The Work Fit',
    pieces: ['Striped White Shirt', 'Black Trousers', 'Black Loafers'],
    why: 'Meetings till six — crisp stripes and black leather read sharp without a jacket.',
  },
  {
    flat: XIMG('outfit-party.png'), tryon: XIMG('cut-model-party.png'), title: 'Party Wear',
    pieces: ['Burgundy Knit Polo', 'Off-White Chinos', 'Brown Loafers'],
    why: 'Dinner on the calendar — the knit polo dresses up while the chinos keep it easy.',
  },
];

function StepHeader({ n, eyebrow, title, done }) {
  const { mobile } = useBreakpoint();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 12 : 16 }}>
      <span style={{
        width: 44, height: 44, borderRadius: 16, flex: 'none',
        background: done ? 'var(--grad-cta)' : 'var(--surface)',
        border: done ? 'none' : '1px solid var(--line)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        font: '800 15px var(--font-ui)', color: done ? 'var(--on-action)' : 'var(--ink-muted)',
      }}>{done ? <Icon name="check" size={20} color="var(--on-action)" /> : `0${n}`}</span>
      <div>
        <div style={{ font: 'var(--text-overline)', fontFamily: 'var(--font-ui)', letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>{eyebrow}</div>
        <div style={{ font: 'var(--text-title)', fontFamily: 'var(--font-ui)', letterSpacing: 'var(--tracking-title)', color: 'var(--ink)', marginTop: 2 }}>{title}</div>
      </div>
    </div>
  );
}

function ItemCard({ item, added, onToggle }) {
  const { mobile } = useBreakpoint();
  return (
    <button onClick={onToggle} style={{
      display: 'flex', alignItems: 'center', gap: mobile ? 10 : 12, textAlign: 'left', cursor: 'pointer',
      minWidth: 0,   // let the card shrink inside its grid track instead of forcing it wide
      padding: mobile ? '12px 12px' : '14px 16px', borderRadius: 'var(--radius-md)',
      background: added ? 'rgba(255,255,255,0.86)' : 'var(--surface)',
      border: added ? '2px solid var(--action)' : '1px solid var(--line)',
      boxShadow: added ? '0 6px 20px rgba(107,76,56,0.18)' : 'none',
      fontFamily: 'var(--font-ui)', transition: 'all .2s ease',
    }}>
      <span style={{
        width: mobile ? 40 : 46, height: mobile ? 40 : 46, borderRadius: 14, flex: 'none',
        background: 'var(--tile)', border: '1px solid var(--line)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        padding: 4, boxSizing: 'border-box', overflow: 'hidden',
      }}><img src={item.img} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} /></span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', font: '700 13px var(--font-ui)', color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</span>
        <span style={{ display: 'block', font: '500 11px var(--font-ui)', color: 'var(--ink-muted)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.brand}</span>
      </span>
      <span style={{
        width: 24, height: 24, borderRadius: 12, flex: 'none',
        background: added ? 'var(--action)' : 'var(--canvas)',
        border: added ? 'none' : '1px solid var(--border)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>{added ? <Icon name="check" size={15} color="#fff" /> : <Icon name="add" size={15} color="var(--ink-muted)" />}</span>
    </button>
  );
}

function Stage({ children, height = 380 }) {
  return (
    <div style={{
      height, borderRadius: 'var(--radius-lg)', border: '1px solid var(--line)',
      background: 'radial-gradient(115% 100% at 50% 22%, #FBF7EF 0%, var(--canvas) 55%, var(--tile) 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, boxSizing: 'border-box', position: 'relative', overflow: 'hidden',
    }}>{children}</div>
  );
}

function Thinking({ label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <span className="x-spin" style={{ width: 26, height: 26, border: '3px solid var(--action)', borderTopColor: 'transparent', borderRadius: '50%' }}></span>
      <span style={{ font: '600 13px var(--font-ui)', color: 'var(--ink-muted)' }}>{label}</span>
    </div>
  );
}

function Experience() {
  const { tablet, mobile, narrow } = useBreakpoint();
  const indent = mobile ? 0 : 60;          // §14: step content loses its indent on mobile
  const stage = mobile ? 280 : 340;
  const [added, setAdded] = React.useState([]);
  const [revealed, setRevealed] = React.useState(0);   // how many outfits generated
  const [current, setCurrent] = React.useState(0);     // outfit in view
  const [generating, setGenerating] = React.useState(false);
  const [tried, setTried] = React.useState([]);        // outfit indexes tried on
  const [trying, setTrying] = React.useState(false);

  const allAdded = added.length === CLOSET.length;
  const toggle = (id) => setAdded((a) => a.includes(id) ? a.filter((x) => x !== id) : [...a, id]);

  // Start the fetch on click, not when the <img> mounts — the spinner then covers the download.
  const preload = (src) => { new Image().src = src; };

  const generate = () => {
    if (generating || revealed >= OUTFITS.length) return;
    preload(OUTFITS[revealed].flat);
    setGenerating(true);
    setTimeout(() => {
      setCurrent(revealed);
      setRevealed(revealed + 1);
      setGenerating(false);
    }, LATENCY);
  };

  const tryOn = () => {
    if (trying || tried.includes(current)) return;
    preload(OUTFITS[current].tryon);
    setTrying(true);
    setTimeout(() => {
      setTried((t) => [...t, current]);
      setTrying(false);
    }, LATENCY);
  };

  const outfit = revealed > 0 ? OUTFITS[current] : null;

  return (
    <section id="experience" style={{ maxWidth: 1080, margin: '0 auto', padding: mobile ? '64px 20px 32px' : '88px 24px 40px', display: 'flex', flexDirection: 'column', gap: mobile ? 48 : 72 }}>

      {/* ── Step 1: add clothes ── */}
      <div data-screen-label="Step 1 — Add clothes">
        <StepHeader n={1} eyebrow="Step one" title="Add your clothes" done={allAdded} />
        <p style={{ font: 'var(--text-prose)', fontSize: 15, color: 'var(--ink-muted)', maxWidth: 480, margin: `14px 0 0 ${indent}px` }}>
          Your closet, catalogued. Tap the pieces to add them — nine pieces are enough for a week of looks.
        </p>
        {/* minmax(0,…) not 1fr: a bare 1fr track keeps its content's min-content width and overflows. */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${narrow ? 1 : tablet ? 2 : 3}, minmax(0, 1fr))`, gap: 12, margin: `24px 0 0 ${indent}px` }}>
          {CLOSET.map((it) => <ItemCard key={it.id} item={it} added={added.includes(it.id)} onToggle={() => toggle(it.id)} />)}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16, margin: `20px 0 0 ${indent}px` }}>
          <Button label={allAdded ? 'Wardrobe ready' : 'Add all nine'} compact onClick={() => setAdded(CLOSET.map((i) => i.id))} />
          <span style={{ font: '600 12px var(--font-ui)', color: 'var(--ink-muted)' }}>{added.length} of {CLOSET.length} added</span>
        </div>
      </div>

      {/* ── Step 2 + 3: generate & try on ── */}
      <div data-screen-label="Step 2 — Generate" style={{ opacity: allAdded ? 1 : 0.35, pointerEvents: allAdded ? 'auto' : 'none', transition: 'opacity .4s ease' }}>
        <StepHeader n={2} eyebrow="Step two" title="Generate today's look" done={revealed >= OUTFITS.length} />
        <p style={{ font: 'var(--text-prose)', fontSize: 15, color: 'var(--ink-muted)', maxWidth: 480, margin: `14px 0 0 ${indent}px` }}>
          {allAdded ? 'Your stylist reads the weather and your day, then builds looks from what you own.' : 'Add your clothes first — your stylist works only with what you own.'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: tablet ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))', gap: 20, margin: `24px 0 0 ${indent}px`, alignItems: 'stretch' }}>
          {/* The look */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 16, boxShadow: 'var(--shadow-card)' }}>
            <Stage height={stage}>
              {generating ? <Thinking label="Styling…" />
                : outfit ? <img key={outfit.flat} className="x-fadein" src={outfit.flat} alt={outfit.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                : <span style={{ font: '600 13px var(--font-ui)', color: 'var(--ink-tertiary)' }}>Your first look lands here</span>}
              {outfit && !generating && (
                <div style={{ position: 'absolute', top: 12, left: 12 }}>
                  <Chip label={`${outfit.pieces.length} pieces`} icon="auto_awesome" iconColor="var(--action)" muted translucent />
                </div>
              )}
            </Stage>
            <div style={{ padding: '14px 6px 6px' }}>
              {outfit && !generating ? (
                <div className="x-fadein">
                  <div style={{ font: 'var(--text-title)', fontFamily: 'var(--font-ui)', letterSpacing: 'var(--tracking-title)', color: 'var(--ink)' }}>{outfit.title}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                    {outfit.pieces.map((p) => <Chip key={p} label={p} />)}
                  </div>
                  <p style={{ font: '400 13px/1.5 var(--font-ui)', color: 'var(--ink-muted)', margin: '12px 0 0' }}>
                    <Icon name="auto_awesome" size={13} color="var(--action)" style={{ verticalAlign: '-2px', marginRight: 5 }} />{outfit.why}
                  </p>
                </div>
              ) : (
                <div style={{ font: '500 13px var(--font-ui)', color: 'var(--ink-tertiary)' }}>{generating ? 'Reading the weather, checking your day…' : 'Nothing generated yet'}</div>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14, marginTop: 16 }}>
                <Button
                  label={revealed === 0 ? 'Generate' : revealed < OUTFITS.length ? 'Generate another' : 'All three styled'}
                  loading={generating}
                  onClick={generate}
                  style={revealed >= OUTFITS.length ? { opacity: .5, pointerEvents: 'none' } : undefined}
                />
                {revealed > 1 && <PageDots count={revealed} current={current} />}
                {revealed > 1 && (
                  <button onClick={() => setCurrent((current + 1) % revealed)} style={{ background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', font: 'var(--text-chip)', fontFamily: 'var(--font-ui)', color: 'var(--action)' }}>Previous looks</button>
                )}
              </div>
            </div>
          </div>

          {/* The try-on */}
          <div data-screen-label="Step 3 — Try on" style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 16, boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column' }}>
            <Stage height={stage}>
              {trying ? <Thinking label="Fitting it on you…" />
                : outfit && tried.includes(current) ? <img key={outfit.tryon} className="x-fadein" src={outfit.tryon} alt={`${outfit.title} on a model`} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <Icon name="accessibility_new" size={40} color="var(--ink-tertiary)" />
                    <span style={{ font: '600 13px var(--font-ui)', color: 'var(--ink-tertiary)' }}>{outfit ? 'See it on a body, not a bed' : 'Generate a look first'}</span>
                  </div>
                )}
              {outfit && tried.includes(current) && !trying && (
                <div style={{ position: 'absolute', top: 12, right: 12 }}>
                  <Chip label="AI try-on" icon="auto_awesome" iconColor="var(--action)" muted translucent />
                </div>
              )}
            </Stage>
            <div style={{ padding: '14px 6px 6px', marginTop: 'auto' }}>
              <p style={{ font: '400 13px/1.5 var(--font-ui)', color: 'var(--ink-muted)', margin: '0 0 14px' }}>
                {tried.includes(current) && outfit ? 'That settles it — hang it back or wear it out.' : 'One tap shows the whole look on your photo before you commit.'}
              </p>
              <Button
                label={outfit && tried.includes(current) ? 'Looks right' : 'Try this on'}
                loading={trying}
                onClick={tryOn}
                style={!outfit || (tried.includes(current)) ? { opacity: !outfit ? .5 : 1, pointerEvents: !outfit ? 'none' : 'none' } : undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.OufyExperience = Experience;
