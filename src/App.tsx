import { useMemo, useState } from 'react'
import './styles/App.css'

type Category = 'Élixirs' | 'Soins' | 'Rituels'
type Filter = 'Tout' | Category

type Product = {
  id: number
  name: string
  category: Category
  price: string
  subtitle: string
  description: string
  variant: 'amber' | 'sage' | 'rose' | 'cream'
  label?: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Élixir de lumière',
    category: 'Élixirs',
    price: '68 €',
    subtitle: 'Huile précieuse · 30 ml',
    description:
      'Une huile fine et enveloppante, pensée pour nourrir la peau et révéler son éclat naturel.',
    variant: 'amber',
    label: 'Signature',
  },
  {
    id: 2,
    name: 'Sérum botanique',
    category: 'Soins',
    price: '54 €',
    subtitle: 'Sérum visage · 30 ml',
    description:
      'Un soin quotidien léger aux notes végétales, pour une peau souple et confortable.',
    variant: 'sage',
    label: 'Best-seller',
  },
  {
    id: 3,
    name: 'Rituel essentiel',
    category: 'Rituels',
    price: '92 €',
    subtitle: 'Duo de soins · 2 pièces',
    description:
      'Deux essentiels réunis pour composer un rituel simple, du premier geste au dernier.',
    variant: 'rose',
  },
  {
    id: 4,
    name: 'Baume de nuit',
    category: 'Soins',
    price: '48 €',
    subtitle: 'Baume nourrissant · 50 ml',
    description:
      'Une texture riche qui accompagne le rituel du soir et laisse la peau douce au réveil.',
    variant: 'cream',
  },
]

const filters: Filter[] = ['Tout', 'Élixirs', 'Soins', 'Rituels']

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h11M10 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <circle cx="8.8" cy="8.8" r="5.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function ProductArtwork({ variant }: { variant: Product['variant'] }) {
  return (
    <div className={`product-art product-art--${variant}`} aria-hidden="true">
      <span className="art-glow" />
      <svg className="art-bottle" viewBox="0 0 180 230" fill="none">
        <ellipse cx="90" cy="207" rx="54" ry="8" fill="#252A27" opacity=".1" />
        <rect x="76" y="24" width="28" height="28" rx="5" fill="#A98760" />
        <rect x="70" y="47" width="40" height="13" rx="4" fill="#C5A982" />
        <path
          d="M62 64c0-5 4-9 9-9h38c5 0 9 4 9 9v112c0 12-10 22-22 22H84c-12 0-22-10-22-22V64Z"
          fill="url(#bottle)"
          stroke="#806B50"
          strokeOpacity=".35"
        />
        <path d="M72 77h36v74H72z" fill="#F7F2E9" fillOpacity=".85" />
        <path d="M79 96h22" stroke="#66776B" strokeWidth="2" />
        <path d="M82 103h16" stroke="#66776B" strokeWidth="1" opacity=".55" />
        <path d="M82 129h16" stroke="#66776B" strokeWidth="1" opacity=".35" />
        <defs>
          <linearGradient id="bottle" x1="62" y1="55" x2="124" y2="198" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F4E6C9" />
            <stop offset="1" stopColor="#C5A77A" />
          </linearGradient>
        </defs>
      </svg>
      <span className="art-caption">VISIONAE · PARIS</span>
    </div>
  )
}

function App() {
  const [activeFilter, setActiveFilter] = useState<Filter>('Tout')
  const [search, setSearch] = useState('')

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('fr')
    return products.filter((product) => {
      const matchesCategory = activeFilter === 'Tout' || product.category === activeFilter
      const matchesSearch =
        query.length === 0 ||
        `${product.name} ${product.category} ${product.subtitle}`.toLocaleLowerCase('fr').includes(query)
      return matchesCategory && matchesSearch
    })
  }, [activeFilter, search])

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#accueil" aria-label="VISIONAE, accueil">
            VISIONAE<span>®</span>
          </a>
          <nav className="main-nav" aria-label="Navigation principale">
            <a href="#maison">La maison</a>
            <a href="#catalogue">Les élixirs</a>
            <a href="#rituels">Les rituels</a>
          </nav>
          <a className="header-link" href="#catalogue">
            Découvrir <ArrowIcon />
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Le soin, en conscience</p>
            <h1>La beauté<br />dans sa <em>justesse.</em></h1>
            <p className="hero-description">
              Des formules essentielles et des gestes choisis. Une invitation à ralentir, à
              ressentir, à revenir à soi.
            </p>
            <a className="button button-dark" href="#catalogue">
              Découvrir nos soins <ArrowIcon />
            </a>
            <div className="hero-note">
              <span className="note-line" />
              <span>Des essentiels pensés pour le quotidien</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image">
              <span className="hero-orbit hero-orbit--one" />
              <span className="hero-orbit hero-orbit--two" />
              <div className="hero-product">
                <ProductArtwork variant="amber" />
              </div>
              <p className="hero-image-caption">L'ÉLIXIR SIGNATURE <span>01 / 04</span></p>
            </div>
            <p className="hero-side-note">Rituel<br />de lumière</p>
          </div>
          <a className="scroll-cue" href="#maison"><span /> Défiler pour découvrir</a>
        </section>

        <section className="intro" id="maison">
          <p className="eyebrow">Notre vision</p>
          <h2>Moins, mais <em>mieux.</em></h2>
          <p>
            VISIONAE célèbre une beauté libre et consciente, portée par des formules lisibles,
            des textures sensorielles et le plaisir des gestes simples.
          </p>
          <a className="text-link" href="#catalogue">Explorer l'univers <ArrowIcon /></a>
        </section>

        <section className="catalogue section-wrap" id="catalogue">
          <div className="section-heading">
            <div>
              <p className="eyebrow">La sélection VISIONAE</p>
              <h2>Les essentiels <em>du rituel.</em></h2>
            </div>
            <p className="section-aside">Des soins choisis avec intention,<br />à retrouver jour après jour.</p>
          </div>

          <div className="catalogue-tools">
            <div className="filter-list" aria-label="Filtrer les produits">
              {filters.map((filter) => (
                <button
                  className={`filter-button${activeFilter === filter ? ' is-active' : ''}`}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  type="button"
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>
            <label className="search-field">
              <SearchIcon />
              <span className="visually-hidden">Rechercher un soin</span>
              <input
                type="search"
                placeholder="Rechercher un soin"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <ProductArtwork variant={product.variant} />
                  {product.label && <span className="product-label">{product.label}</span>}
                  <div className="product-info">
                    <div className="product-title-row">
                      <div>
                        <p className="product-category">{product.category}</p>
                        <h3>{product.name}</h3>
                      </div>
                      <span className="product-price">{product.price}</span>
                    </div>
                    <p className="product-subtitle">{product.subtitle}</p>
                    <details className="product-details">
                      <summary>Découvrir le soin <ArrowIcon /></summary>
                      <p>{product.description}</p>
                    </details>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="eyebrow">Aucun résultat</p>
              <p>Essayez un autre mot-clé ou choisissez une autre catégorie.</p>
              <button
                className="text-link"
                onClick={() => {
                  setSearch('')
                  setActiveFilter('Tout')
                }}
                type="button"
              >
                Réinitialiser les filtres <ArrowIcon />
              </button>
            </div>
          )}
        </section>

        <section className="ritual-banner" id="rituels">
          <div className="ritual-mark" aria-hidden="true">V.</div>
          <div>
            <p className="eyebrow">Le temps d'un geste</p>
            <h2>Votre rituel,<br /><em>à votre rythme.</em></h2>
          </div>
          <a className="button button-light" href="#catalogue">
            Trouver mon essentiel <ArrowIcon />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark" href="#accueil">VISIONAE<span>®</span></a>
        <p>La beauté dans sa justesse.</p>
        <a href="mailto:bonjour@visionae.fr">Nous écrire <ArrowIcon /></a>
        <small>© 2026 VISIONAE. Tous droits réservés.</small>
      </footer>
    </>
  )
}

export default App
