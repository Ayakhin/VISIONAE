import { useEffect, useState, type FormEvent } from 'react'
import './styles/App.css'

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() ?? ''
const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '') ?? ''
const bookingUrl = import.meta.env.VITE_BOOKING_URL?.trim() ?? ''

const socialLinks = [
  { label: 'LinkedIn', href: import.meta.env.VITE_LINKEDIN_URL },
  { label: 'Instagram', href: import.meta.env.VITE_INSTAGRAM_URL },
].filter((link): link is { label: string; href: string } => Boolean(link.href?.trim()))

type Theme = 'dark' | 'light'

function readSavedTheme(): Theme {
  try {
    const savedTheme = window.localStorage.getItem('visionae-theme')
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark'
  } catch (error) {
    console.warn('Impossible de lire la préférence de thème enregistrée.', error)
    return 'dark'
  }
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h11M10 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function ThemeIcon({ theme }: { theme: Theme }) {
  return theme === 'dark' ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 1.8v2M10 16.2v2M18.2 10h-2M3.8 10h-2m14-5.8-1.4 1.4m-8.8 8.8-1.4 1.4m11.6 0-1.4-1.4M5.2 5.2 3.8 3.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M16.8 12.1A7.2 7.2 0 0 1 7.9 3.2a7.3 7.3 0 1 0 8.9 8.9Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
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
    const phone = String(formData.get('phone') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const subject = `Prise de contact Visionae — ${name}`
    const body = [
      `Nom : ${name}`,
      `Entreprise : ${company || 'Non renseignée'}`,
      `Téléphone : ${phone || 'Non renseigné'}`,
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
        Votre téléphone <span className="optional-label">(facultatif)</span>
        <input autoComplete="tel" name="phone" placeholder="+33 6 00 00 00 00" type="tel" />
      </label>
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
          'En envoyant ce formulaire, votre application de messagerie s’ouvrira. Vos informations ne sont pas transmises tant que vous n’envoyez pas l’e-mail.'}
      </p>
    </form>
  )
}

const services = [
  {
    name: 'Audit de marque',
    category: 'STRATÉGIE',
    description: 'Faire le point sur votre positionnement, votre image et la perception de votre marque.',
    objective: 'Comprendre les écarts entre votre intention et ce que votre marque exprime.',
    result: 'Un diagnostic priorisé et des pistes d’évolution.',
  },
  {
    name: 'Expérience client',
    category: 'PARCOURS',
    description: 'Observer les étapes vécues par vos clients et les moments qui comptent vraiment.',
    objective: 'Repérer les irritants, les ruptures et les occasions de créer du lien.',
    result: 'Un parcours plus clair et des attentions mieux pensées.',
  },
  {
    name: 'Stratégie de communication',
    category: 'COHÉRENCE',
    description: 'Donner un cap commun à vos messages, vos supports et vos prises de parole.',
    objective: 'Rendre votre communication reconnaissable et alignée avec vos objectifs.',
    result: 'Des messages clés et des priorités éditoriales.',
  },
  {
    name: 'Réseaux sociaux',
    category: 'PRÉSENCE',
    description: 'Clarifier le rôle de vos réseaux et la manière dont ils racontent votre activité.',
    objective: 'Publier avec plus de cohérence et moins de dispersion.',
    result: 'Des axes de contenu et une organisation réaliste.',
  },
  {
    name: 'Direction créative',
    category: 'EXPRESSION',
    description: 'Orienter l’expression visuelle et éditoriale pour rendre votre univers plus lisible.',
    objective: 'Relier l’intention de marque à ses expressions concrètes.',
    result: 'Un cap créatif et des repères de cohérence.',
  },
  {
    name: 'Accompagnement projet',
    category: 'MISE EN ŒUVRE',
    description: 'Faire avancer une évolution de marque, une expérience ou une nouvelle initiative.',
    objective: 'Garder le cap et faciliter les arbitrages au fil du projet.',
    result: 'Des étapes structurées et des décisions mieux éclairées.',
  },
  {
    name: 'Développement de concept',
    category: 'DÉVELOPPEMENT',
    description: 'Explorer et structurer une idée pour en faire une proposition cohérente.',
    objective: 'Vérifier l’alignement entre besoin, expérience et identité.',
    result: 'Un concept clarifié, prêt à être évalué et développé.',
  },
]

const resources = [
  {
    topic: 'IMAGE DE MARQUE',
    title: 'Votre marque est-elle reconnaissable avant même de lire son nom ?',
    description: 'Quelques repères pour examiner la cohérence de vos signes, de vos messages et de votre promesse.',
    insight: 'Commencez par réunir les éléments qui parlent au nom de votre entreprise : présentation commerciale, site, réseaux sociaux et échanges avec les clients. La promesse reste-t-elle la même ? Les mots employés traduisent-ils la même personnalité ? Les signes visuels aident-ils à identifier votre univers ? La cohérence ne signifie pas répéter partout le même message, mais faire ressentir la même intention. Repérez les écarts avant de chercher à tout refaire.',
  },
  {
    topic: 'EXPÉRIENCE CLIENT',
    title: 'Parcours client : repérer les détails qui changent la perception',
    description: 'Une grille de lecture simple pour observer les moments forts et les points de friction.',
    insight: 'Parcourez le chemin comme le ferait une personne qui découvre votre activité : première recherche, prise de contact, achat ou réservation, puis suivi. À chaque étape, notez ce qui est simple, ce qui demande un effort et ce qui reste flou. Les petits irritants répétés pèsent parfois plus qu’un grand changement isolé. Choisissez un moment à améliorer en priorité, puis vérifiez que l’amélioration répond à un besoin réellement observé.',
  },
  {
    topic: 'RÉSEAUX SOCIAUX',
    title: 'Publier moins, mais avec une intention plus claire',
    description: 'Revenir aux objectifs, aux publics et aux sujets qui méritent réellement votre attention.',
    insight: 'Avant d’ajouter des publications à votre calendrier, précisez le rôle de chaque prise de parole : faire connaître votre approche, éclairer une question client, montrer une réalisation ou ouvrir la conversation. Quelques thèmes éditoriaux utiles et réguliers apportent davantage de cohérence qu’une présence dispersée. Le bon rythme est celui que votre équipe peut tenir dans la durée, sans sacrifier la qualité ni le sens des messages.',
  },
  {
    topic: 'DÉVELOPPEMENT',
    title: 'Une idée de projet : les bonnes questions avant de se lancer',
    description: 'Clarifier le besoin, l’expérience proposée et les conditions qui rendront l’idée pertinente.',
    insight: 'Une idée mérite d’abord d’être formulée comme une réponse à un besoin précis. Pour qui est-elle conçue ? Quelle difficulté aide-t-elle à résoudre ? En quoi l’expérience proposée est-elle différente ? Quelles ressources seront nécessaires pour la tester ? Une première expérimentation limitée permet de recueillir des retours et de confronter les hypothèses au terrain avant d’engager davantage de temps ou de budget.',
  },
  {
    topic: 'HOSPITALITY',
    title: 'L’hospitalité se joue aussi dans les détails invisibles',
    description: 'Observer les gestes, les transitions et les attentions qui rendent un accueil mémorable.',
    insight: 'L’accueil ne commence pas uniquement au premier bonjour. Il se prépare dans les informations transmises avant la visite, se poursuit dans la fluidité des étapes et se prolonge après le départ. Observez les transitions : faut-il chercher son chemin, répéter une demande ou attendre sans explication ? Une attention pertinente n’a pas besoin d’être spectaculaire. Elle aide la personne à se sentir attendue et considérée.',
  },
]

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(readSavedTheme)
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Bonjour, je souhaite échanger avec Visionae.')}`
    : undefined
  const appointmentUrl = bookingUrl || '#contact'

  useEffect(() => {
    document.documentElement.dataset.theme = theme

    try {
      window.localStorage.setItem('visionae-theme', theme)
    } catch (error) {
      console.warn('Impossible d’enregistrer la préférence de thème.', error)
    }
  }, [theme])

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#accueil" aria-label="Visionae, accueil">
            visionae<span>.</span>
          </a>
          <nav className={`main-nav${isMenuOpen ? ' is-open' : ''}`} aria-label="Navigation principale">
            <a href="#apropos" onClick={() => setIsMenuOpen(false)}>À propos</a>
            <a href="#audit" onClick={() => setIsMenuOpen(false)}>Audit</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#methode" onClick={() => setIsMenuOpen(false)}>Méthode</a>
            <a href="#realisations" onClick={() => setIsMenuOpen(false)}>Réalisations</a>
            <a href="#ressources" onClick={() => setIsMenuOpen(false)}>Ressources</a>
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
          <button
            aria-label={`Activer le thème ${theme === 'dark' ? 'clair' : 'sombre'}`}
            className="theme-toggle"
            onClick={() => setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark')}
            type="button"
          >
            <ThemeIcon theme={theme} />
            <span>{theme === 'dark' ? 'Clair' : 'Sombre'}</span>
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
            <p className="eyebrow eyebrow-light"><span /> Stratégie · Image de marque · Expérience</p>
            <h1>Révéler le potentiel<br />de votre entreprise</h1>
            <p className="hero-description">
              grâce à une vision claire, cohérente et stratégique.
            </p>
            <p className="hero-offers">
              Audit, image de marque, expérience client, communication et développement de projets.
            </p>
            <div className="hero-actions">
              <a className="button button-champagne" href="#contact">
                Demander un audit <ArrowIcon />
              </a>
              <a
                className="hero-secondary-link"
                href={appointmentUrl}
                rel={bookingUrl ? 'noreferrer' : undefined}
                target={bookingUrl ? '_blank' : undefined}
              >
                Prendre rendez-vous
              </a>
            </div>
            <div className="hero-footnote">
              <span className="hero-footnote-line" />
              <span>Pour les entrepreneurs et les entreprises en mouvement.</span>
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
                Je suis Sonia, fondatrice de Visionae. J’accompagne les entrepreneurs qui veulent
                prendre du recul, mieux comprendre leur marque et choisir leur prochaine étape
                avec clarté.
              </p>
              <p>
                Mon approche associe observation de terrain, écoute et analyse stratégique. Elle
                part de vos réalités et de vos contraintes pour faire émerger des recommandations
                applicables, sans recette toute faite.
              </p>
            </div>
          </div>
          <div className="section-shell about-pillars">
            <article>
              <span>01 / MON PARCOURS</span>
              <h3>Le terrain avant les recettes.</h3>
              <p>Comprendre le quotidien d’une entreprise, ses équipes et ses clients est le point de départ de chaque réflexion.</p>
            </article>
            <article>
              <span>02 / MA VISION</span>
              <h3>La cohérence se ressent.</h3>
              <p>L’image, les messages et l’expérience gagnent en force lorsqu’ils racontent la même histoire.</p>
            </article>
            <article>
              <span>03 / POURQUOI VISIONAE</span>
              <h3>Un regard extérieur, utile.</h3>
              <p>Pour révéler les angles morts, faire ressortir les forces et transformer les constats en choix lisibles.</p>
            </article>
            <article>
              <span>04 / MES EXPERTISES</span>
              <h3>Une lecture d’ensemble.</h3>
              <p>Image de marque, expérience client, communication, présence digitale et développement de projets.</p>
            </article>
          </div>
          <div className="principle-strip">
            <div><span>01</span> Regard indépendant</div>
            <div><span>02</span> Analyse attentive</div>
            <div><span>03</span> Recommandations concrètes</div>
          </div>
        </section>

        <section className="audit section-dark" id="audit">
          <div className="section-shell">
            <div className="audit-heading">
              <div>
                <p className="eyebrow eyebrow-light"><span /> Le cœur de Visionae</p>
                <h2>Un audit pour voir<br /><em>ce qui peut changer.</em></h2>
              </div>
              <p>
                Un état des lieux structuré pour comprendre votre marque telle qu’elle est vécue
                aujourd’hui, puis décider où agir en priorité.
              </p>
            </div>
            <div className="audit-details">
              <div className="audit-scope">
                <h3>Ce que nous regardons</h3>
                <ul>
                  <li>Image de marque et positionnement</li>
                  <li>Communication et cohérence des messages</li>
                  <li>Expérience client et parcours</li>
                  <li>Présence digitale et réseaux sociaux</li>
                  <li>Cohérence globale des points de contact</li>
                  <li>Opportunités de développement</li>
                </ul>
              </div>
              <div className="audit-deliverables">
                <h3>Ce que vous recevez</h3>
                <ol>
                  <li><span>01</span> Un diagnostic clair</li>
                  <li><span>02</span> La mise en lumière de vos forces</li>
                  <li><span>03</span> Les points de vigilance à traiter</li>
                  <li><span>04</span> Des recommandations priorisées</li>
                  <li><span>05</span> Un plan d’action concret</li>
                </ol>
                <a className="button button-champagne" href="#contact">Demander un audit <ArrowIcon /></a>
              </div>
            </div>
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
              {services.map((service, index) => (
                <article className="service-card" key={service.name}>
                  <span className="service-number">{String(index + 1).padStart(2, '0')} / {service.category}</span>
                  <span className={`service-icon${index % 3 === 1 ? ' service-icon--moka' : ''}${index % 3 === 2 ? ' service-icon--outline' : ''}`} aria-hidden="true">
                    <SparkIcon />
                  </span>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <dl className="service-outcomes">
                    <div><dt>Objectif</dt><dd>{service.objective}</dd></div>
                    <div><dt>Résultat attendu</dt><dd>{service.result}</dd></div>
                  </dl>
                  <a href="#contact" aria-label={`Parler du service ${service.name}`}><ArrowIcon /></a>
                </article>
              ))}
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
                <h3>Découverte du projet</h3>
                <p>Prendre le temps de comprendre votre histoire, vos objectifs et les questions qui vous amènent.</p>
              </article>
              <article>
                <span className="step-number">02</span>
                <div className="step-rule" />
                <h3>Audit et analyse</h3>
                <p>Observer les éléments clés de votre marque, de votre communication et de l’expérience client.</p>
              </article>
              <article>
                <span className="step-number">03</span>
                <div className="step-rule" />
                <h3>Construction de la stratégie</h3>
                <p>Relier les constats à vos enjeux et faire émerger une direction cohérente avec votre réalité.</p>
              </article>
              <article>
                <span className="step-number">04</span>
                <div className="step-rule" />
                <h3>Remise des recommandations</h3>
                <p>Partager un diagnostic, des priorités et un plan d’action concret pour avancer avec clarté.</p>
              </article>
              <article>
                <span className="step-number">05</span>
                <div className="step-rule" />
                <h3>Accompagnement (optionnel)</h3>
                <p>Prolonger la réflexion à vos côtés pour mettre en œuvre les recommandations retenues.</p>
              </article>
            </div>
            <div className="method-footer"><span /> Vous choisissez le niveau d’accompagnement adapté à votre projet.</div>
          </div>
        </section>

        <section className="proof section-light" id="realisations">
          <div className="section-shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow"><span /> Réalisations & études de cas</p>
                <h2>Des idées mises<br />en <em>perspective.</em></h2>
              </div>
              <p className="section-aside">
                Des réflexions stratégiques ancrées dans des projets,<br />sans résultats inventés ni promesses abstraites.
              </p>
            </div>
            <div className="case-grid">
              <article className="case-card case-card--featured">
                <span className="case-number">ÉTUDE DE CAS · DOUG E</span>
                <h3>Faire dialoguer identité, expérience et récit.</h3>
                <p>
                  Une réflexion autour de la transformation de Doug E et de la cohérence entre son
                  identité, son expérience client, ses abonnements et son storytelling.
                </p>
                <div className="case-tags">
                  <span>Identité</span><span>Expérience client</span><span>Abonnements</span><span>Storytelling</span>
                </div>
                <span className="case-footnote">Axes présentés sans indicateurs de résultat non vérifiés.</span>
              </article>
              <article className="case-card">
                <span className="case-number">PROJET FONDATEUR · VISIONAE</span>
                <h3>Appliquer la méthode à sa propre marque.</h3>
                <p>
                  La construction de Visionae comme terrain de réflexion : clarifier le
                  positionnement, structurer l’offre et créer une expérience cohérente.
                </p>
                <a className="text-link" href="#methode">Voir la méthode <ArrowIcon /></a>
              </article>
              <article className="case-card case-card--future">
                <span className="case-number">À VENIR · PROJETS FUTURS</span>
                <h3>Rendre visibles les réflexions qui font avancer.</h3>
                <p>
                  De nouvelles études de cas viendront documenter les contextes, les choix
                  stratégiques et les apprentissages, avec l’accord des entreprises concernées.
                </p>
                <a className="text-link" href="#contact">Proposer un échange <ArrowIcon /></a>
              </article>
            </div>
          </div>
        </section>

        <section className="resources section-ivory" id="ressources">
          <div className="section-shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow"><span /> Ressources & réflexions</p>
                <h2>Des pistes pour<br /><em>prendre du recul.</em></h2>
              </div>
              <p className="section-aside">
                Des repères pour questionner votre marque,<br />votre expérience et vos prochaines idées.
              </p>
            </div>
            <div className="resource-grid">
              {resources.map((resource, index) => (
                <article className="resource-card" key={resource.title}>
                  <span className="resource-number">0{index + 1}</span>
                  <p className="resource-topic">{resource.topic}</p>
                  <h3>{resource.title}</h3>
                  <p className="resource-description">{resource.description}</p>
                  <details className="resource-reading">
                    <summary>Lire la réflexion <span>+</span></summary>
                    <p>{resource.insight}</p>
                  </details>
                  <a href="#contact" aria-label={`Échanger avec Sonia sur le thème : ${resource.topic}`}>
                    En parler avec Sonia <ArrowIcon />
                  </a>
                </article>
              ))}
            </div>
            <p className="resources-note">Des repères concrets pour nourrir votre réflexion, à adapter à la réalité de votre entreprise.</p>
          </div>
        </section>

        <section className="faq section-light" id="faq">
          <div className="section-shell faq-grid">
            <div>
              <p className="eyebrow"><span /> Questions fréquentes</p>
              <h2>Avant le<br /><em>premier échange.</em></h2>
              <p>Un projet commence souvent par une question. Voici quelques repères pour vous aider.</p>
            </div>
            <div className="faq-list">
              <details>
                <summary>À qui s’adresse un audit Visionae ? <span>+</span></summary>
                <p>Aux entrepreneurs et aux entreprises qui souhaitent mieux comprendre leur image, leur communication ou l’expérience proposée à leurs clients.</p>
              </details>
              <details>
                <summary>Que faut-il préparer avant de prendre contact ? <span>+</span></summary>
                <p>Rien de formel. Quelques mots sur votre activité, votre contexte et les questions que vous vous posez suffisent pour commencer.</p>
              </details>
              <details>
                <summary>Quelles sont les étapes d’un audit ? <span>+</span></summary>
                <p>Nous découvrons votre projet, menons l’audit et l’analyse, construisons une stratégie, puis vous remettons des recommandations et un plan d’action.</p>
              </details>
              <details>
                <summary>L’accompagnement après l’audit est-il obligatoire ? <span>+</span></summary>
                <p>Non. L’accompagnement à la mise en œuvre est optionnel et se définit selon vos besoins et vos priorités.</p>
              </details>
              <details>
                <summary>Comment se déroule le premier échange ? <span>+</span></summary>
                <p>Il permet de comprendre votre besoin, de vérifier si l’approche Visionae est adaptée et d’envisager ensemble une suite pertinente.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="future section-dark" aria-labelledby="future-title">
          <div className="section-shell future-content">
            <p className="eyebrow eyebrow-light"><span /> Une base pensée pour évoluer</p>
            <h2 id="future-title">Aujourd’hui un regard.<br /><em>Demain, de nouvelles ressources.</em></h2>
            <p>
              La structure éditoriale peut accueillir, au fil des besoins, des formations, des
              guides à télécharger, une newsletter et un espace client. La réservation et le
              paiement en ligne pourront être ajoutés lorsqu’ils feront partie de l’offre.
            </p>
            <a className="button button-champagne" href="#contact">Construire la suite ensemble <ArrowIcon /></a>
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
                <a
                  href={appointmentUrl}
                  rel={bookingUrl ? 'noreferrer' : undefined}
                  target={bookingUrl ? '_blank' : undefined}
                >
                  Réserver un appel découverte <ArrowIcon />
                </a>
                {!bookingUrl && (
                  <span className="channel-note">Le calendrier de réservation sera connecté avant la mise en ligne.</span>
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
            <a href="#ressources">Ressources</a>
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
