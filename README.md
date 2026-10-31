# Visionae

Site vitrine Visionae — React, TypeScript et Vite.

## Développement local

```bash
npm install
npm run dev
```

## Thème

Le site démarre en thème sombre. Le bouton « Clair » dans l’en-tête permet de basculer vers le
thème clair ; le choix est conservé dans le navigateur sur cet appareil.

## Coordonnées et réseaux

Le formulaire prépare un e-mail via l’application de messagerie par défaut. Avant de le publier,
créez un fichier `.env.local` à la racine du projet et renseignez les coordonnées réelles :

```dotenv
VITE_CONTACT_EMAIL=
VITE_WHATSAPP_NUMBER=
VITE_BOOKING_URL=
VITE_LINKEDIN_URL=
VITE_INSTAGRAM_URL=
```

Le numéro WhatsApp doit inclure l’indicatif international. Le formulaire ouvre l’application
de messagerie du visiteur : il ne transmet pas les données à un serveur. Configurez une solution
de traitement de formulaire avant d’en faire un canal de réception en production.

Les liens WhatsApp, réservation et réseaux sociaux sont affichés uniquement lorsqu’ils sont
configurés. Redémarrez Vite après toute modification de `.env.local`.

L’hébergement de production devra servir le site en HTTPS. Les formulaires, la prise de rendez-vous,
le blog complet et les fonctions de vente pourront être connectés à des services adaptés au moment
de leur lancement.
