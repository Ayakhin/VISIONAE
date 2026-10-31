import { useState, type FormEvent } from 'react'
import './styles/App.css'

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() ?? ''
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '') ?? ''

const socialLinks = [
  { label: 'LinkedIn', href: import.meta.env.VITE_LINKEDIN_URL },
  { label: 'Instagram', href: import.meta.env.VITE_INSTAGRAM_URL },
].filter((link): link is { label: string; href: string } => Boolean(link.href?.trim()))

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h11M10 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function SparkIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" fill="none">
      <path d="M24 2v44M2 24h44M8.4 8.4l31.2 31.2m0-31.2L8.4 39.6" stroke="currentColor" strokeWidth=".7" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth=".7" />
    </svg>
  )
}

function ContactForm() {
  const [formMessage, setFormMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!contactEmail) {
      setFormMessage(
        'Le formulaire est prêt. L’adresse de réception doit être configurée avant de pouvoir envoyer votre message.',
      )
      return
    }

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const company = String(formData.get('company') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const subject = `Prise de contact Visionae — ${name}`
    const body = [
      `Nom : ${name}`,
      `Entreprise : ${company || 'Non renseignée'}`,
      `E-mail : ${email}`,
      '',
      message,
    ].join('\n')

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setFormMessage('Votre application de messagerie va s’ouvrir avec votre message.')
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Votre nom
          <input autoComplete="name" name="name" placeholder="Nom et prénom" required />
        </label>
        <label>
          Votre entreprise
          <input autoComplete="organization" name="company" placeholder="Nom de l’entreprise" />
        </label>
      </div>
      <label>
        Votre adresse e-mail
        <input
          autoComplete="email"
          name="email"
          placeholder="vous@entreprise.fr"
          required
          type="email"
        />
      </label>
      <label>
        Parlez-nous de votre projet
        <textarea
          name="message"
          placeholder="Votre contexte, vos enjeux, ce que vous souhaitez faire évoluer…"
          required
          rows={4}
        />
      </label>
      <button className="button button-champagne" type="submit">
        Envoyer votre demande <ArrowIcon />
      </button>
      <p className="form-note" aria-live="polite">
        {formMessage ||
          'Vos informations restent confidentielles et sont utilisées uniquement pour vous répondre.'}
      </p>
    </form>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Bonjour, je souhaite échanger avec Visionae.')}`
    : undefined

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#accueil" aria-label="Visionae, accueil">
            visionae<span>.</span>
          </a>
          <nav className={`main-nav${isMenuOpen ? ' is-open' : ''}`} aria-label="Navigation principale">
            <a href="#apropos" onClick={() => setIsMenuOpen(false)}>À propos</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#methode" onClick={() => setIsMenuOpen(false)}>Méthode</a>
            <a href="#realisations" onClick={() => setIsMenuOpen(false)}>Réalisations</a>
            <a className="mobile-contact-link" href="#contact" onClick={() => setIsMenuOpen(false)}>
              Contact <ArrowIcon />
            </a>
          </nav>
          <button
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className={`nav-toggle${isMenuOpen ? ' is-open' : ''}`}
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            <span />
            <span />
          </button>
          <a className="header-contact" href="#contact">
            Parlons de votre projet <ArrowIcon />
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-decoration" aria-hidden="true">
            <span className="hero-ring hero-ring--outer" />
            <span className="hero-ring hero-ring--inner" />
            <span className="hero-cross hero-cross--horizontal" />
            <span className="hero-cross hero-cross--vertical" />
            <span className="hero-spark"><SparkIcon /></span>
          </div>
          <div className="hero-content">
            <p className="eyebrow eyebrow-light"><span /> Conseil en image de marque & expérience client</p>
            <h1>Votre marque<br />mérite d’être <em>vue.</em></h1>
            <p className="hero-description">
              Nous révélons ce qui rend votre entreprise singulière et transformons ce regard en
              actions concrètes, cohérentes et durables.
            </p>
            <div className="hero-actions">
              <a className="button button-champagne" href="#contact">
                Échangeons sur vos enjeux <ArrowIcon />
              </a>
              <a className="hero-secondary-link" href="#methode">Découvrir notre méthode</a>
            </div>
            <div className="hero-footnote">
              <span className="hero-footnote-line" />
              <span>Observer avec justesse. Recommander avec sens.</span>
            </div>
          </div>
          <div className="hero-index" aria-hidden="true">01 <span>—</span> 04</div>
          <a className="scroll-cue" href="#apropos"><span /> Défiler pour découvrir</a>
        </section>

        <section className="positioning section-light" id="apropos">
          <div className="section-shell positioning-grid">
            <div className="section-intro">
              <p className="eyebrow"><span /> À propos de Visionae</p>
              <h2>Voir au-delà<br />de <em>l’évidence.</em></h2>
            </div>
            <div className="positioning-copy">
              <p className="lead-copy">
                Une image de marque forte ne se résume pas à ce que l’on montre. Elle se ressent
                dans chaque interaction, chaque attention, chaque détail du parcours client.
              </p>
              <p>
                Visionae accompagne les entreprises qui souhaitent mieux comprendre la perception
                de leur marque, clarifier leur positionnement et créer une expérience plus juste,
                de la première impression à la relation durable.
              </p>
              <a className="text-link" href="#services">Découvrir nos accompagnements <ArrowIcon /></a>
            </div>
          </div>
          <div className="principle-strip">
            <div><span>01</span> Regard indépendant</div>
            <div><span>02</span> Analyse attentive</div>
            <div><span>03</span> Recommandations concrètes</div>
          </div>
        </section>

        <section className="services section-ivory" id="services">
          <div className="section-shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow"><span /> Nos services</p>
                <h2>Faire de votre image<br />un <em>levier de confiance.</em></h2>
              </div>
              <p className="section-aside">
                Un accompagnement adapté à votre réalité,<br />à votre rythme et à vos ambitions.
              </p>
            </div>
            <div className="service-grid">
              <article className="service-card">
                <span className="service-number">01 / STRATÉGIE</span>
                <span className="service-icon" aria-hidden="true"><SparkIcon /></span>
                <h3>Image de marque</h3>
                <p>
                  Clarifier votre positionnement et faire émerger une expression de marque
                  reconnaissable, cohérente et fidèle à votre identité.
                </p>
                <a href="#contact" aria-label="Parler de votre image de marque"><ArrowIcon /></a>
              </article>
              <article className="service-card">
                <span className="service-number">02 / EXPÉRIENCE</span>
                <span className="service-icon service-icon--moka" aria-hidden="true"><SparkIcon /></span>
                <h3>Expérience client</h3>
                <p>
                  Comprendre les perceptions et les moments clés pour rendre chaque interaction
                  plus fluide, plus humaine et plus mémorable.
                </p>
                <a href="#contact" aria-label="Parler de votre expérience client"><ArrowIcon /></a>
              </article>
              <article className="service-card">
                <span className="service-number">03 / COHÉRENCE</span>
                <span className="service-icon service-icon--outline" aria-hidden="true"><SparkIcon /></span>
                <h3>Communication</h3>
                <p>
                  Relier vos messages, vos supports et vos points de contact pour construire une
                  communication claire et cohérente.
                </p>
                <a href="#contact" aria-label="Parler de votre communication"><ArrowIcon /></a>
              </article>
            </div>
          </div>
        </section>

        <section className="method section-dark" id="methode">
          <div className="section-shell">
            <div className="method-heading">
              <div>
                <p className="eyebrow eyebrow-light"><span /> Notre méthode</p>
                <h2>Comprendre d’abord.<br /><em>Agir avec justesse.</em></h2>
              </div>
              <p>
                Des observations précises aux décisions éclairées, chaque étape donne du sens à
                la suivante.
              </p>
            </div>
            <div className="method-steps">
              <article>
                <span className="step-number">01</span>
                <div className="step-rule" />
                <h3>Observer</h3>
                <p>Écouter vos équipes, parcourir vos supports et découvrir votre expérience telle qu’elle est vécue.</p>
              </article>
              <article>
                <span className="step-number">02</span>
                <div className="step-rule" />
                <h3>Auditer</h3>
                <p>Mettre en lumière vos forces, les écarts de perception et les opportunités à saisir.</p>
              </article>
              <article>
                <span className="step-number">03</span>
                <div className="step-rule" />
                <h3>Analyser</h3>
                <p>Relier les constats à vos objectifs pour comprendre les causes et fixer les bonnes priorités.</p>
              </article>
              <article>
                <span className="step-number">04</span>
                <div className="step-rule" />
                <h3>Recommander</h3>
                <p>Vous remettre une feuille de route claire, réaliste et pensée pour passer à l’action.</p>
              </article>
            </div>
            <div className="method-footer"><span /> Chaque recommandation part de votre réalité, jamais d’une recette toute faite.</div>
          </div>
        </section>

        <section className="proof section-light" id="realisations">
          <div className="section-shell proof-grid">
            <div className="proof-mark" aria-hidden="true">
              <span className="proof-mark-ring" />
              <span className="proof-mark-center">V.</span>
              <span className="proof-mark-label">VISIONAE · REGARD · CLARTÉ · ACTION</span>
            </div>
            <div className="proof-copy">
              <p className="eyebrow"><span /> Réalisations & études de cas</p>
              <h2>La confiance se construit<br />sur des <em>faits.</em></h2>
              <p>
                Chaque mission commence par une écoute attentive et se traduit par des pistes
                d’action adaptées. Les études de cas présentées ici seront ajoutées avec des
                exemples réels, partagés avec l’accord des entreprises accompagnées.
              </p>
              <a className="text-link" href="#contact">Échanger sur vos enjeux <ArrowIcon /></a>
            </div>
          </div>
        </section>

        <section className="contact section-ivory" id="contact">
          <div className="section-shell contact-grid">
            <div className="contact-copy">
              <p className="eyebrow"><span /> Prenons le temps d’échanger</p>
              <h2>Et si l’on<br /><em>regardait autrement ?</em></h2>
              <p>
                Vous souhaitez prendre du recul sur votre image, votre communication ou
                l’expérience vécue par vos clients ? Présentez-nous votre situation.
              </p>
              <div className="contact-direct">
                {contactEmail ? (
                  <a href={`mailto:${contactEmail}`}>{contactEmail} <ArrowIcon /></a>
                ) : (
                  <span>Écrivez-nous via le formulaire</span>
                )}
                {whatsappUrl ? (
                  <a href={whatsappUrl} rel="noreferrer" target="_blank">
                    Échanger sur WhatsApp <ArrowIcon />
                  </a>
                ) : (
                  <span className="channel-note">WhatsApp sera disponible dès la configuration de la ligne.</span>
                )}
              </div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="wordmark wordmark-light" href="#accueil">visionae<span>.</span></a>
          <p>Un regard juste.<br />Des actions qui ont du sens.</p>
          <nav className="footer-nav" aria-label="Navigation de pied de page">
            <a href="#apropos">À propos</a>
            <a href="#services">Services</a>
            <a href="#methode">Méthode</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="footer-socials">
            {socialLinks.map((link) => (
              <a href={link.href} key={link.label} rel="noreferrer" target="_blank">{link.label}</a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Visionae. Tous droits réservés.</span>
          <a href="#contact">Confidentialité des échanges</a>
          <a className="back-to-top" href="#accueil">Retour en haut ↑</a>
        </div>
      </footer>
    </>
  )
}

export default App
