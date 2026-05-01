# Configuration Google Tag Manager (GTM) pour Box Landing Page

## 📋 Vue d'ensemble

Ce document explique comment configurer Google Tag Manager pour tracker :
- ✅ Les visiteurs (GA4 automatique)
- ✅ Les clics sur tous les boutons

**GTM ID du site :** `GTM-NXZHZGKD`

---

## 1️⃣ CONFIGURATION DE BASE GA4

### Étape 1 : Créer la Balise Google (remplace GA4 Configuration)

1. **Aller dans GTM** → **Tags** → **Nouveau**
2. **Nom du tag :** `Balise Google`
3. **Type de tag :** `Balise Google` (ou `Google Tag`)
4. **Id de la balise :** Entrer votre ID de mesure GA4 : `G-11S9PKSYSV`
5. **Déclencheur :** `All Pages` (Initialization - All Pages est recommandé, mais All Pages fonctionne aussi)

### Étape 2 : Configurer les paramètres GA4 avancés

Dans le tag GA4 Configuration, aller dans **Paramètres avancés** et configurer :

#### Variables à remonter automatiquement :
- **Source / Medium** (automatique via les paramètres UTM)
- **Pays / Ville** (automatique via IP)
- **Type d'appareil** (automatique)
- **OS + Navigateur** (automatique)
- **Nouveaux vs Récurrents** (automatique via cookies)
- **Langue du navigateur** (automatique)
- **Résolution écran** (automatique)
- **Temps passé sur le site** (automatique via session)

Ces données sont **automatiquement collectées par GA4** - aucune configuration supplémentaire nécessaire ! 🎉

### Étape 3 : Vérifier que GA4 reçoit bien les données

1. Aller dans **GA4** → **Rapports** → **Temps réel**
2. Visiter votre site : `https://boxcaissemobile.babilonbg.net/`
3. Vérifier que vous apparaissez dans le rapport temps réel

**Données à vérifier :**
- ✅ Page vue
- ✅ Pays / Ville
- ✅ Appareil (mobile/desktop/tablet)
- ✅ OS + Navigateur
- ✅ Source / Medium

---

## 2️⃣ TRACKING DES CLICS BOUTONS

### Événements trackés automatiquement

Le code JavaScript envoie automatiquement dans `dataLayer` les événements suivants pour chaque clic sur un bouton :

```javascript
{
  event: "click_download" | "click_appstore" | "click_googleplay" | "click_créer_un_compte" | etc.,
  button_text: "Télécharger",
  button_id: "header_download_desktop",
  button_name: "header_download",
  button_href: "#hero" | "https://...",
  page_path: "/",
  page_url: "https://boxcaissemobile.babilonbg.net/",
  page_title: "Box - La caisse mobile...",
  timestamp: "2024-01-01T12:00:00.000Z",
  event_category: "button_click",
  event_label: "Télécharger"
}
```

### Liste des événements trackés

| Événement | Bouton | Emplacement |
|-----------|--------|-------------|
| `click_download` | Télécharger | Header (desktop + mobile) |
| `click_appstore` | Télécharger sur App Store | Hero + Footer |
| `click_googleplay` | Disponible sur Google Play | Hero + Footer |
| `click_créer_un_compte` | Créer un compte | Section "Comment ça marche" |
| `click_créer_une_caisse` | Créer une caisse | Section "Comment ça marche" |
| `click_choisir_ma_fréquence` | Choisir ma fréquence | Section "Comment ça marche" |
| `click_commencer_à_épargner` | Commencer à épargner | Section "Comment ça marche" |

---

## 3️⃣ CRÉER LES TRIGGERS GTM

### Étape 1 : Créer un Trigger pour les clics sur boutons (via dataLayer)

1. **GTM** → **Déclencheurs (Triggers)** → **Nouveau**
2. **Nom :** `All Button Clicks`
3. **Type de déclencheur :** `Événement personnalisé` (Custom Event)
4. **Configuration :**
   - **Nom de l'événement :** Utiliser une expression régulière (regex)
   - Cocher ✅ **Utiliser une correspondance avec expression régulière**
   - **Nom de l'événement :** `^click_.*`
   - Ce déclencheur s'activera pour tous les événements commençant par "click_" (ex: click_download, click_appstore, etc.)

### Étape 2 : Créer des triggers individuels (optionnel, pour plus de contrôle)

Pour chaque type de clic, créer un trigger séparé :

**Trigger : `Button Click - Download`**
- Type : `Événement personnalisé`
- Nom de l'événement : `click_download`

**Trigger : `Button Click - App Store`**
- Type : `Événement personnalisé`
- Nom de l'événement : `click_appstore`

**Trigger : `Button Click - Google Play`**
- Type : `Événement personnalisé`
- Nom de l'événement : `click_googleplay`

... etc.

---

## 4️⃣ CRÉER LE TAG GA4 EVENT POUR LES CLICS

### Étape 1 : Créer le Tag GA4 Event

1. **GTM** → **Tags** → **Nouveau**
2. **Nom :** `GA4 - Button Clicks`
3. **Type :** `Google Analytics : GA4 Event`
4. **Configuration :**
   - **Measurement ID :** `G-11S9PKSYSV` (ou sélectionner la variable Google Tag si créée)
   - **Nom de l'événement :** `{{Event}}` (utilise la variable event du dataLayer)
5. **Paramètres d'événement :**
   - `button_text` : `{{button_text}}`
   - `button_id` : `{{button_id}}`
   - `button_name` : `{{button_name}}`
   - `button_href` : `{{button_href}}`
   - `page_path` : `{{page_path}}`
   - `page_url` : `{{page_url}}`
6. **Déclencheur :** `Button Click - All` (ou les triggers individuels)

### Étape 2 : Créer les Variables GTM (si nécessaire)

Si les variables ne sont pas automatiquement disponibles, créer des **Variables de Data Layer** :

1. **GTM** → **Variables** → **Nouveau**
2. Créer les variables suivantes :
   - **Nom :** `button_text` → **Type :** `Variable Data Layer` → **Nom de la variable Data Layer :** `button_text`
   - **Nom :** `button_id` → **Type :** `Variable Data Layer` → **Nom de la variable Data Layer :** `button_id`
   - **Nom :** `button_name` → **Type :** `Variable Data Layer` → **Nom de la variable Data Layer :** `button_name`
   - **Nom :** `button_href` → **Type :** `Variable Data Layer` → **Nom de la variable Data Layer :** `button_href`
   - **Nom :** `page_path` → **Type :** `Variable Data Layer` → **Nom de la variable Data Layer :** `page_path`
   - **Nom :** `page_url` → **Type :** `Variable Data Layer` → **Nom de la variable Data Layer :** `page_url`

---

## 5️⃣ VARIABLES GTM PRÉDÉFINIES À ACTIVER

Aller dans **Variables** → **Variables intégrées** et activer :

✅ **Clic**
- ✅ Élément de clic
- ✅ Classes de clic
- ✅ ID d'élément de clic
- ✅ URL de clic
- ✅ Texte de clic

✅ **Pages**
- ✅ URL de la page
- ✅ Chemin de la page
- ✅ Titre de la page

✅ **Navigateur**
- ✅ Langue du navigateur
- ✅ Résolution d'écran

---

## 6️⃣ TESTER LA CONFIGURATION

### Mode Aperçu GTM

1. Dans GTM, cliquer sur **Aperçu**
2. Entrer l'URL : `https://boxcaissemobile.babilonbg.net/`
3. Cliquer sur les boutons sur le site
4. Vérifier dans le panneau d'aperçu que :
   - ✅ Les événements apparaissent
   - ✅ Les variables sont bien remplies
   - ✅ Les tags se déclenchent

### Vérification dans GA4 Temps réel

1. Aller dans **GA4** → **Rapports** → **Temps réel**
2. Cliquer sur **Événements**
3. Cliquer sur un bouton sur le site
4. Vérifier que l'événement apparaît (ex: `click_download`)

### Debug avec dataLayer

Ouvrir la console du navigateur et taper :

```javascript
// Voir tout le dataLayer
console.log(window.dataLayer)

// Filtrer les événements de clic
window.dataLayer.filter(e => e.event && e.event.startsWith('click_'))
```

---

## 7️⃣ PUBLIER LA CONFIGURATION

Une fois les tests validés :

1. **GTM** → **Soumettre**
2. Ajouter un nom de version (ex: "Tracking boutons + GA4")
3. Ajouter une description
4. **Publier**

---

## 8️⃣ VÉRIFICATIONS POST-DÉPLOIEMENT

Après publication, vérifier :

1. **GA4 Temps réel** → Les événements de clics apparaissent-ils ?
2. **GA4 Événements** → Voir tous les événements trackés
3. **GTM** → Vérifier le nombre de déclenchements des tags

---

## 📊 RAPPORTS GA4 RECOMMANDÉS

### Créer un rapport personnalisé pour les clics boutons

1. **GA4** → **Explore** → **Rapport en blanc**
2. Ajouter les dimensions :
   - `Event name`
   - `button_text`
   - `button_id`
   - `page_path`
3. Ajouter les métriques :
   - `Event count`
   - `Total users`
4. Filtrer : `Event name` contient `click_`

---

## 🔍 DÉPANNAGE

### Les événements n'apparaissent pas dans GA4

1. ✅ Vérifier que GTM est bien chargé (inspecter l'élément `<body>`)
2. ✅ Vérifier que le tag GA4 Configuration est déclenché
3. ✅ Vérifier que les triggers sont bien configurés
4. ✅ Utiliser le mode Aperçu GTM pour déboguer

### Les variables sont vides

1. ✅ Vérifier que les variables Data Layer sont bien créées
2. ✅ Vérifier dans la console : `window.dataLayer`
3. ✅ Vérifier que les attributs `data-track-*` sont présents sur les boutons

### Les clics ne sont pas trackés

1. ✅ Vérifier que `GTMAutoTracking` est bien chargé (composant dans layout.tsx)
2. ✅ Ouvrir la console et vérifier les erreurs JavaScript
3. ✅ Vérifier que `initAutoTracking()` est bien appelé

---

## 📝 NOTES IMPORTANTES

- ✅ Le tracking fonctionne automatiquement grâce aux attributs `data-track-*` sur les boutons
- ✅ Aucune modification de code nécessaire pour ajouter de nouveaux boutons : il suffit d'ajouter les attributs
- ✅ Le script JavaScript vanilla écoute tous les clics sur les éléments avec `data-track-event`
- ✅ Tous les événements sont envoyés au `dataLayer` GTM avant d'être transférés vers GA4

---

## 🎯 PROCHAINES ÉTAPES (OPTIONNEL)

- Ajouter le tracking des formulaires (déjà présent dans le code)
- Ajouter le tracking des scrolls (déjà présent pour les sections)
- Ajouter des événements e-commerce si nécessaire
- Créer des audiences GA4 basées sur les clics boutons

---

## 🚀 INTÉGRATION META (FACEBOOK) PIXEL VIA GTM

Comme GTM est déjà installé sur le site, il est fortement recommandé d'utiliser GTM pour intégrer votre Meta Pixel. Voici la procédure étape par étape :

### Étape 1 : Créer la Balise Meta Pixel (Initialisation)

1. **GTM** → **Tags** → **Nouveau**
2. **Nom du tag :** `Meta Pixel - Base Code`
3. **Type de tag :** `Code HTML personnalisé` (Custom HTML)
4. **Code :** Copiez et collez le code suivant (votre Pixel ID est déjà inclus) :
```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '747263664629832');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=747263664629832&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```
5. **Déclencheur (Trigger) :** `Initialization - All Pages` (ou `All Pages`)

### Étape 2 : Tracker les événements spécifiques (Conversions)

Pour tracker les clics sur les boutons (ex: Téléchargements) en tant qu'événements Facebook, vous pouvez créer un nouveau tag :

1. **Nom du tag :** `Meta Pixel - Event Download`
2. **Type :** `Code HTML personnalisé`
3. **Code :**
```html
<script>
  fbq('track', 'CompleteRegistration', { content_name: 'Download App' });
</script>
```
4. **Déclencheur :** `Button Click - Download` (ou utilisez le trigger `All Button Clicks` avec une exception si nécessaire).

### Étape 3 : Vérifier l'intégration

1. Utilisez le **Mode Aperçu GTM** pour vérifier que le tag s'exécute.
2. Installez l'extension Chrome **"Meta Pixel Helper"**.
3. Naviguez sur votre site et vérifiez que le Pixel Helper affiche une coche verte pour `PageView`.

---

**Date de création :** 2024  
**Dernière mise à jour :** 2024  
**GTM ID :** GTM-NXZHZGKD  
**Site :** https://boxcaissemobile.babilonbg.net/

