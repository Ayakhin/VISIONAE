# Visionae

Site vitrine Visionae — React, TypeScript et Vite.

## Développement local

```bash
npm install
npm run dev
```

## Coordonnées et réseaux

Le formulaire prépare un e-mail via l’application de messagerie par défaut. Avant de le publier,
créez un fichier `.env.local` à la racine du projet et renseignez les coordonnées réelles :

```dotenv
VITE_CONTACT_EMAIL=
VITE_WHATSAPP_NUMBER=
VITE_LINKEDIN_URL=
VITE_INSTAGRAM_URL=
```

Le numéro WhatsApp doit inclure l’indicatif international. Les liens de contact et de réseaux
sociaux sont affichés uniquement lorsqu’ils sont configurés. Redémarrez Vite après toute
modification de `.env.local`.
