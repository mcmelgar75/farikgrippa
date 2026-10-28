import React, { useState, useEffect } from 'react';

// --- CONFIGURACIÓN DE DATOS (Fácilmente editables) ---

const CAMPAIGN_DATA = {
  title: "Buscando la próxima voz",
  description: "La música se disfruta más de a dos, por eso estoy buscando un artista para colaborar en mi próxima canción. Sube tu video a TikTok, etiquétame y usa el hashtag #TalentoSobra",
  mainVideo: {
    embedId: "7212345678901234567", // Solo necesitas pegar el ID del video de TikTok aquí
  },
  ctaText: "PARTICIPAR EN TIKTOK",
  ctaUrl: "#link-participacion-pendiente",
  participants: [
    { id: 1, user: "@artista_uno", embedId: "7212345678901234567" },
    { id: 2, user: "@cantante_dos", embedId: "7212345678901234567" },
    { id: 3, user: "@voz_tres", embedId: "7212345678901234567" },
    { id: 4, user: "@talento_cuatro", embedId: "7212345678901234567" },
    { id: 5, user: "@artista_cinco", embedId: "7212345678901234567" },
    { id: 6, user: "@voz_seis", embedId: "7212345678901234567" },
    { id: 7, user: "@talento_siete", embedId: "7212345678901234567" },
    { id: 8, user: "@cantante_ocho", embedId: "7212345678901234567" },
  ]
};

const MUSIC_CATALOG = [
  { 
    id: "peligro", 
    title: "En Peligro de Extinción", 
    thumbnail: "https://img.youtube.com/vi/BiBbZRG5Bqc/maxresdefault.jpg", 
    links: { spotify: "https://open.spotify.com/intl-es/track/5M6snyfng6U35ZllkPqGWu?si=a2b04eba1721407a", apple: "https://music.apple.com/pe/album/en-peligro-de-extinci%C3%B3n/6813534066?i=6813534072", youtube: "https://youtu.be/BiBbZRG5Bqc" } 
  },
  { 
    id: "karma", 
    title: "El Karma", 
    thumbnail: "https://img.youtube.com/vi/FXUIWaDnY6U/maxresdefault.jpg", 
    links: { spotify: "https://open.spotify.com/intl-es/track/07NHt64NnsOO0lJceKYGxX?si=3320aeac562c4f8f", apple: "https://music.apple.com/pe/album/el-karma/6813534066?i=6813534344", youtube: "https://youtu.be/FXUIWaDnY6U" } 
  },
  { 
    id: "dudo", 
    title: "Lo Dudo", 
    thumbnail: "https://img.youtube.com/vi/ElTa8OapI4Y/maxresdefault.jpg", 
    links: { spotify: "https://open.spotify.com/intl-es/track/26pnoAIJ3gT9ZTEaCWE5Zk?si=66e0b1ef85394160", apple: "https://music.apple.com/pe/album/lo-dudo/6813534066?i=6813534068", youtube: "https://youtu.be/ElTa8OapI4Y" } 
  },
  { 
    id: "te-vas", 
    title: "Ya Lo Sé Que Tú Te Vas", 
    thumbnail: "https://img.youtube.com/vi/BmioQJsfqJU/maxresdefault.jpg", 
    links: { spotify: "https://open.spotify.com/intl-es/track/4m7q9rLM5zkHibdMcnfOHO?si=94b300ceb5db4463", apple: "https://music.apple.com/pe/album/ya-lo-s%C3%A9-que-t%C3%BA-te-vas/6813534066?i=6813534355", youtube: "https://youtu.be/BmioQJsfqJU" } 
  },
  { 
    id: "hablame", 
    title: "Háblame de Ti", 
    thumbnail: "https://img.youtube.com/vi/KuhWAeqOgOg/maxresdefault.jpg", 
    links: { spotify: "https://open.spotify.com/intl-es/track/7eCE1RHUfuYQUJEBAoIGK7?si=97035c8b4f75473d", apple: "https://music.apple.com/pe/song/h%C3%A1blame-de-ti-versi%C3%B3n-balada/1488535484", youtube: "https://youtu.be/KuhWAeqOgOg" } 
  },
  { 
    id: "somos-dos", 
    title: "Somos Dos (Ft. Alvaro Rod)", 
    thumbnail: "https://img.youtube.com/vi/laOsdabOuL0/maxresdefault.jpg", 
    links: { spotify: "https://open.spotify.com/intl-es/track/4exSDjVKDy9JZHSdxUL56g?si=2142dd9b68494192", apple: "https://music.apple.com/us/album/somos-dos-versi%C3%B3n-balada-single/1549586365", youtube: "https://youtu.be/laOsdabOuL0" } 
  },
  { 
    id: "tu-ausencia", 
    title: "Tu Ausencia (Ft. Corazón Serrano)", 
    thumbnail: "https://img.youtube.com/vi/yFBFxlNFMZ8/maxresdefault.jpg", 
    links: { spotify: "https://open.spotify.com/intl-es/track/4Vy8gFPwZHuR35cwlYNoSE?si=57c7c6f9fef542a9", apple: "https://music.apple.com/pe/song/tu-ausencia-en-vivo/1677684757", youtube: "https://youtu.be/yFBFxlNFMZ8" } 
  },
  { 
    id: "no-renunciare", 
    title: "No Renunciaré", 
    thumbnail: "https://img.youtube.com/vi/0cC5T1WcYY4/maxresdefault.jpg", 
    links: { spotify: "https://open.spotify.com/album/0H49thMmVaF2UioJEtBIRn?si=mu_IzHzARiKzhMS_2vv4Zg", apple: "https://music.apple.com/us/album/no-renunciar%C3%A9-single/1842174233", youtube: "https://youtu.be/0cC5T1WcYY4" } 
  },
  { 
    id: "todo-daria", 
    title: "Todo Daría (Ft. Gaitanes)", 
    thumbnail: "https://img.youtube.com/vi/zGq7yOHXLSM/maxresdefault.jpg", 
    links: { spotify: "https://open.spotify.com/album/6AX4T20T3UbNQWv0YetAg2?si=VanDSzcMTwq304mpF_COgA", apple: "https://music.apple.com/es/album/todo-dar%C3%ADa-single/1811343403", youtube: "https://youtu.be/zGq7yOHXLSM" } 
  },
  { 
    id: "maldito-destino", 
    title: "Maldito Destino", 
    thumbnail: "https://img.youtube.com/vi/d7FEuHooRw4/maxresdefault.jpg", 
    links: { spotify: "https://open.spotify.com/album/2O4Mcgsp4sKtAHyXbzAWQe?si=HqB11iWXSq-WiXcVBxGAXA", apple: "https://music.apple.com/tm/album/maldito-destino-single/1755251152", youtube: "https://youtu.be/d7FEuHooRw4" } 
  },
  { 
    id: "partido-en-dos", 
    title: "Partido en Dos (Ft. N'Samble)", 
    thumbnail: "https://img.youtube.com/vi/BIRTATHnsVw/maxresdefault.jpg", 
    links: { spotify: "https://open.spotify.com/album/4swPBwp3yr5DxO0ANjWgef?si=0O2qMa90S3GyCUXffZ51QA", apple: "https://music.apple.com/es/album/partido-en-dos-versi%C3%B3n-salsa-single/1747974065", youtube: "https://youtu.be/BIRTATHnsVw" } 
  },
  { 
    id: "dos-copas", 
    title: "Dos Copas de Vino", 
    thumbnail: "https://img.youtube.com/vi/fjRYKAUfvEM/maxresdefault.jpg", 
    links: { spotify: "https://open.spotify.com/album/2Qs6mBxOknHtEPyIgjbtrM", apple: "https://music.apple.com/cl/song/somos-dos-dos-copas-de-vino-salsa-remix/1717806563", youtube: "https://youtu.be/fjRYKAUfvEM" } 
  },
  { 
    id: "a-ella", 
    title: "A Ella", 
    thumbnail: "https://img.youtube.com/vi/2ZucPE9qKso/maxresdefault.jpg", 
    links: { spotify: "https://open.spotify.com/album/5Ag5diSKbJLN8u6QKTM08b?si=l_Nu_Rp2SjOzmJlUKQxdiw", apple: "https://music.apple.com/es/album/a-ella-live-unplugged-single/1800829205", youtube: "https://youtu.be/2ZucPE9qKso" } 
  }
];

const CLUB_CHANNELS = [
  { platform: "WhatsApp", name: "Comunidad Oficial Club de Fans", description: "Noticias exclusivas y anuncios antes que nadie.", url: "#whatsapp", icon: "whatsapp" },
  { platform: "Instagram", name: "La Banda de Farik", description: "Fotos, detrás de cámaras y dinámicas.", url: "https://www.instagram.com/channel/Jo8nfjyWhD0fAn1E/", icon: "instagram" },
  { platform: "TikTok", name: "Boletín de Farik Grippa", description: "Únete a los trends y comparte tu contenido.", url: "https://vt.tiktok.com/ZS9yBd5tdyNUW-qxtJ0/", icon: "tiktok" }
];

const LIVE_VIDEOS = [
  { id: 1, title: "Show de Farik Grippa", thumbnail: "https://img.youtube.com/vi/p4vtuBlFNck/maxresdefault.jpg", url: "https://youtu.be/p4vtuBlFNck" },
  { id: 2, title: "Farik Grippa en tu marca", thumbnail: "https://img.youtube.com/vi/HCC-ZsemWvY/maxresdefault.jpg", url: "https://youtu.be/HCC-ZsemWvY" }
];

const CONTACT_INFO = [
  { type: "Prensa", desc: "Entrevistas, medios y cobertura editorial.", link: "https://wa.me/51951746477" },
  { type: "Management", desc: "Gestión artística, proyectos y colaboraciones.", link: "https://wa.me/51951746477" },
  { type: "Booking", desc: "Contrataciones, conciertos y eventos corporativos.", link: "https://wa.me/51908546086" }
];

const SOCIAL_LINKS = [
  { name: "Instagram", url: "http://bit.ly/FarikIG", icon: "instagram" },
  { name: "YouTube", url: "http://bit.ly/FarikYT", icon: "youtube" },
  { name: "Spotify", url: "https://spoti.fi/3EtAY4R", icon: "spotify" },
  { name: "TikTok", url: "https://bit.ly/468YhiG", icon: "tiktok" },
  { name: "Facebook", url: "http://bit.ly/FarikFB", icon: "facebook" },
  { name: "Apple Music", url: "https://music.apple.com/pe/artist/farik-grippa/1431894480", icon: "apple" }
];

// --- COMPONENTES ICONOS (SVGs integrados para evitar dependencias externas) ---
const Icons = {
  spotify: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.3 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>,
  apple: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.68.827-1.303 2.274-1.122 3.652 1.353.104 2.585-.611 3.41-1.64z"/></svg>,
  youtube: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  tiktok: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>,
  whatsapp: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12.031 0C5.394 0 .007 5.385.007 12.022c0 2.124.553 4.195 1.603 6.012L.012 23.98l6.103-1.601c1.761.942 3.738 1.439 5.811 1.439v-.002h.005c6.634 0 12.022-5.385 12.022-12.022S18.665 0 12.031 0zm0 21.815h-.003c-1.8 0-3.565-.483-5.111-1.396l-.367-.217-3.797.996 1.015-3.704-.239-.379c-1.002-1.593-1.533-3.44-1.533-5.367 0-5.529 4.5-10.029 10.035-10.029 2.678 0 5.195 1.045 7.089 2.94 1.895 1.895 2.941 4.412 2.941 7.091 0 5.53-4.502 10.029-10.03 10.029zm5.503-7.533c-.302-.152-1.79-.886-2.068-.988-.277-.101-.479-.151-.681.152-.202.302-.781.988-.958 1.19-.176.202-.353.227-.655.075-1.839-.933-3.23-1.814-4.46-3.864-.176-.303.176-.282.476-.883.076-.151.038-.282-.019-.434-.057-.152-.681-1.644-.933-2.253-.245-.591-.495-.51-.68-.519-.175-.008-.377-.01-.58-.01-.202 0-.53.076-.807.379-.278.303-1.059 1.036-1.059 2.527 0 1.491 1.084 2.932 1.236 3.134.152.203 2.14 3.267 5.185 4.58.725.313 1.29.501 1.733.642.727.232 1.389.199 1.912.12.585-.088 1.79-.731 2.042-1.439.252-.708.252-1.314.176-1.439-.076-.126-.277-.202-.58-.354z"/></svg>,
  facebook: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.801 0 2.022.038 2.52.079v3.33h-1.68c-1.545 0-2.322.37-2.322 1.961v1.89h3.838l-.928 3.667h-2.91v7.98H9.101z"/></svg>,
  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);

  // Inyección de fuentes y SEO para posicionamiento
  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // --- OPTIMIZACIÓN SEO TÉCNICO ---
    document.title = "Farik Grippa | Sitio Oficial - Salsa y Música Tropical";
    
    const setMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMeta('description', 'Sitio oficial de Farik Grippa. Cantante y compositor peruano. Descubre su catálogo musical, videos, presentaciones en vivo, biografía y contacto profesional.');
    setMeta('keywords', 'Farik Grippa, cantante peruano, música tropical, salsa peruana, En Peligro de Extinción, booking Farik Grippa, shows en vivo');
    setMeta('og:title', 'Farik Grippa | Sitio Oficial');
    setMeta('og:description', 'Sitio oficial de Farik Grippa. Cantante, compositor e intérprete peruano de salsa y música tropical.');
    setMeta('og:type', 'website');
    // Para compartir, usaremos la foto principal
    setMeta('og:image', 'FARIK GRIPPA_ Retrato urbano en color.png');

    // Datos estructurados JSON-LD para Google (Knowledge Graph)
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "MusicGroup",
      "name": "Farik Grippa",
      "image": "FARIK GRIPPA_ Retrato urbano en color.png",
      "description": "Cantante, compositor e intérprete peruano de la escena actual de la música tropical y latina.",
      "genre": ["Salsa", "Cumbia", "Música Tropical"],
      "nationality": { "@type": "Country", "name": "Perú" },
      "sameAs": SOCIAL_LINKS.map(link => link.url)
    };

    let script = document.querySelector('#seo-schema');
    if (!script) {
      script = document.createElement('script');
      script.id = 'seo-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.innerHTML = JSON.stringify(schemaData);
  }, []);

  const navLinks = [
    { name: "Manifiesto", href: "#manifiesto" },
    { name: "Campaña", href: "#campana" },
    { name: "Música", href: "#musica" },
    { name: "El Artista", href: "#artista" },
    { name: "Club FG", href: "#clubfg" },
    { name: "Live", href: "#live" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <div className="font-['Inter',sans-serif] bg-[#F1EEE8] text-[#101010] overflow-x-hidden">
      
      {/* NAVEGACIÓN */}
      <nav aria-label="Menú principal" className="fixed w-full z-50 mix-blend-difference text-[#F1EEE8] p-4 md:p-8 flex justify-between items-center transition-all">
        <a href="#hero" aria-label="Volver al inicio" className="font-['Bebas_Neue'] text-2xl tracking-widest uppercase hover:opacity-70 transition-opacity">FG</a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 text-sm font-medium uppercase tracking-widest">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-[#00BDB3] transition-colors">{link.name}</a>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden z-50 text-[#F1EEE8]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? Icons.close : Icons.menu}
        </button>
      </nav>

      {/* Menú Móvil Overlay */}
      <div className={`fixed inset-0 bg-[#101010] text-[#F1EEE8] z-40 flex flex-col justify-center items-center gap-8 transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="font-['Bebas_Neue'] text-4xl uppercase tracking-wider hover:text-[#FF5A50] transition-colors">
            {link.name}
          </a>
        ))}
      </div>

      {/* 1. HERO PRINCIPAL */}
      <section id="hero" className="relative min-h-[100svh] flex flex-col p-6 md:p-12 pt-24 overflow-hidden text-[#F1EEE8]">
        {/* Fondo Full Width */}
        <div className="absolute inset-0 z-0 bg-[#F1EEE8]">
          <img 
            src="FARIK GRIPPA_ Retrato urbano en color.png" 
            alt="Farik Grippa - Sitio Web Oficial del Cantante de Música Tropical y Salsa" 
            className="w-full h-full object-cover object-top md:object-center"
          />
          {/* Overlay concentrado en la parte inferior para no apagar los colores y el lettering de la foto original */}
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#101010] via-[#101010]/70 to-transparent"></div>
        </div>

        {/* Texto Hero encima - Alineado hacia abajo para respetar el rostro y el lettering superior de la imagen */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col justify-end items-center text-center flex-grow pb-8 md:pb-16 mt-32">
          {/* H1 oculto visualmente pero presente y fuertemente optimizado para SEO */}
          <h1 className="sr-only">Farik Grippa - Sitio Web Oficial | Cantante de Música Tropical, Salsa y Cumbia</h1>
          
          <h2 className="font-['Bebas_Neue'] text-5xl sm:text-6xl md:text-[5.5rem] leading-[0.9] uppercase mb-4 flex flex-col drop-shadow-xl text-[#F1EEE8]">
            <span>La nueva era</span>
            <span className="text-[#00BDB3]">Tropical</span>
          </h2>
          <p className="text-base md:text-lg font-light max-w-md mb-8 drop-shadow-md text-[#F1EEE8]/90">
            Más libre. Más personal. Redefiniendo el sonido y el show con una propuesta sin etiquetas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#musica" className="bg-[#FF5A50] text-[#F1EEE8] px-8 py-4 uppercase font-semibold tracking-wider text-sm hover:bg-[#F1EEE8] hover:text-[#101010] transition-colors text-center rounded-sm shadow-lg">
              Explorar su Música
            </a>
            <a href="#contacto" className="border border-[#F1EEE8] text-[#F1EEE8] px-8 py-4 uppercase font-semibold tracking-wider text-sm hover:bg-[#F1EEE8] hover:text-[#101010] transition-colors text-center rounded-sm shadow-lg bg-white/5 backdrop-blur-sm">
              Contacto Profesional
            </a>
          </div>
        </div>
      </section>

      {/* 2. QUÉ SUENE, MÁS FUERTE (Manifiesto) */}
      <section id="manifiesto" className="py-24 px-6 md:px-12 bg-[#FAF9F6]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-stretch">
          <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col justify-center">
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl uppercase mb-8 leading-none">
              QUÉ SUENE,<br/><span className="text-[#FF5A50]">MÁS FUERTE</span>
            </h2>
            
            {/* Box con scroll para mantener la coherencia del diseño sin alargar la página */}
            <div 
              className="text-base font-light space-y-4 max-w-lg text-[#101010]/90 max-h-[380px] overflow-y-auto pr-6 pb-4" 
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#00BDB3 #F1EEE8' }}
            >
              <p>Farik Grippa es un cantante, compositor e intérprete peruano que forma parte de la escena actual de la música tropical y latina. Con una voz reconocible, una interpretación cercana y una marcada versatilidad, ha construido una carrera que trasciende fronteras y conecta con audiencias en Latinoamérica, Estados Unidos y Europa.</p>
              <p>Su música nace de la esencia tropical y se mueve con libertad entre diferentes sonidos y formas de expresión. Salsa, cumbia, merengue, balada, pop y nuevas fusiones conviven en una propuesta en constante evolución, donde cada canción representa una nueva posibilidad de explorar su identidad artística.</p>
              <p>Farik es además el intérprete de “En Peligro de Extinción”, la única salsa peruana que ha superado los 110 millones de reproducciones en YouTube, consolidándose como uno de los grandes hitos de la música tropical peruana en la era digital. A lo largo de su trayectoria, también ha alcanzado canciones que llegaron al #1 en Perú y Panamá.</p>
              <p>Hoy abre un nuevo capítulo creativo: más libre, más personal y abierto a todo lo que la música latina tiene por descubrir.</p>
              <p className="font-medium text-[#101010]">Farik Grippa no sigue un solo camino. Está construyendo el suyo.</p>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <a href="https://open.spotify.com/intl-es/artist/00Xr47kjidyk1Kimx2Ypd2?si=2x9Yz8sPTSeyu2xbNQKSbQ" target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-semibold uppercase tracking-widest border-b border-[#101010] pb-1 hover:text-[#00BDB3] hover:border-[#00BDB3] transition-colors">
                Escucha a Farik
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="h-full min-h-[500px] md:min-h-[600px] w-full bg-gray-200 overflow-hidden relative rounded-sm shadow-lg">
               <img src="https://placehold.co/800x1200/00BDB3/101010?text=800x1200\nFOTOGRAFIA\nMANIFIESTO" alt="Farik Grippa en concierto - Intérprete peruano de música tropical" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
               <div className="absolute top-4 right-4 bg-black/70 text-white text-[10px] uppercase px-2 py-1 tracking-wider backdrop-blur-sm rounded">Size: 800x1200px</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAMPAÑA DESTACADA DEL MES */}
      <section id="campana" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="w-full md:w-1/2">
              <span className="text-[#FF5A50] font-semibold tracking-widest text-sm uppercase mb-2 block">Campaña Actual</span>
              <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl uppercase leading-none">{CAMPAIGN_DATA.title}</h2>
            </div>
            <p className="w-full md:w-1/2 text-sm md:text-base font-light text-[#101010]/80">{CAMPAIGN_DATA.description}</p>
          </div>

          {/* Video Principal */}
          <div className="w-full bg-[#101010] text-[#F1EEE8] rounded-lg overflow-hidden flex flex-col md:flex-row mb-16 shadow-2xl">
            <div className="md:w-[320px] aspect-[9/16] relative bg-gray-900 flex-shrink-0">
               {/* Integración de TikTok (Iframe) para reproducción in-situ */}
               <iframe
                 className="absolute inset-0 w-full h-full"
                 src={`https://www.tiktok.com/embed/v2/${CAMPAIGN_DATA.mainVideo.embedId}`}
                 allowFullScreen
                 scrolling="no"
                 allow="encrypted-media;"
                 title="Video de convocatoria"
               ></iframe>
            </div>
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-start">
              <h3 className="font-['Bebas_Neue'] text-3xl md:text-5xl uppercase mb-4">El Escenario es tuyo</h3>
              <p className="text-gray-300 font-light mb-8 max-w-lg">
                Sube tu interpretación de lo que quieras mostrar a TikTok. Estoy revisando todos los videos personalmente. El talento está ahí fuera y quiero escucharlo.
              </p>
              <a href={CAMPAIGN_DATA.ctaUrl} className="inline-flex items-center gap-2 bg-[#00BDB3] text-[#101010] px-6 py-3 font-semibold uppercase tracking-wider text-sm hover:bg-white transition-colors self-start rounded-sm">
                {Icons.tiktok} {CAMPAIGN_DATA.ctaText}
              </a>
            </div>
          </div>

          {/* Galería de Participantes (Scroll Horizontal) */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest">Talentos Destacados</h3>
              <span className="text-xs text-gray-500 font-normal hidden md:inline-block">Desliza para ver más &rarr;</span>
            </div>
            
            {/* Contenedor Flex con Scroll Horizontal Fluido */}
            <div className="flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x snap-mandatory" style={{ scrollbarWidth: 'thin', scrollbarColor: '#00BDB3 transparent' }}>
              {CAMPAIGN_DATA.participants.map(p => (
                <div key={p.id} className="snap-start flex-none w-[260px] md:w-[280px] aspect-[9/16] relative overflow-hidden rounded-sm bg-gray-200 shadow-md">
                  {/* Etiqueta del usuario superpuesta (desaparece al interactuar con el iframe) */}
                  <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none">
                    <span className="text-[#F1EEE8] text-xs font-medium">{p.user}</span>
                  </div>
                  
                  {/* Integración de TikTok de los participantes */}
                  <iframe
                     className="absolute inset-0 w-full h-full"
                     src={`https://www.tiktok.com/embed/v2/${p.embedId}`}
                     allowFullScreen
                     scrolling="no"
                     allow="encrypted-media;"
                     title={`Participación de ${p.user}`}
                     loading="lazy"
                   ></iframe>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MÚSICA */}
      <section id="musica" className="py-24 px-6 md:px-12 bg-[#101010] text-[#F1EEE8]">
        <div className="max-w-6xl mx-auto overflow-hidden">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl uppercase leading-none">El corazón es la música</h2>
            <span className="text-xs text-gray-500 font-normal hidden md:inline-block pb-2">Desliza para explorar &rarr;</span>
          </div>
          
          {/* Contenedor con Scroll Horizontal */}
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory" style={{ scrollbarWidth: 'thin', scrollbarColor: '#00BDB3 transparent' }}>
            {MUSIC_CATALOG.map(song => (
              <div key={song.id} className="snap-start flex-none w-[260px] md:w-[300px] group flex flex-col">
                
                {/* Miniatura enlazada a YouTube (640x360) */}
                <a href={song.links.youtube} target="_blank" rel="noopener noreferrer" className="aspect-video bg-gray-800 rounded-sm overflow-hidden mb-4 relative block group-hover:ring-2 ring-[#00BDB3] transition-all" title="Ver en YouTube">
                  <img src={song.thumbnail} alt={`Video de ${song.title}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {/* Icono de Play Superpuesto */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/10 transition-colors">
                     <svg viewBox="0 0 24 24" fill="white" className="w-12 h-12 drop-shadow-lg group-hover:scale-110 transition-transform"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </a>
                
                <h3 className="font-semibold text-lg mb-3 truncate px-1" title={song.title}>{song.title}</h3>
                
                {/* Enlaces de Streaming */}
                <div className="flex gap-4 mt-auto px-1">
                  {song.links.spotify ? (
                    <a href={song.links.spotify} className="text-gray-400 hover:text-[#1DB954] transition-colors flex items-center gap-2" title="Escuchar en Spotify">
                      {Icons.spotify}
                    </a>
                  ) : <span className="text-gray-700 cursor-not-allowed" title="No disponible en Spotify">{Icons.spotify}</span>}
                  
                  {song.links.apple ? (
                    <a href={song.links.apple} className="text-gray-400 hover:text-[#FA243C] transition-colors flex items-center gap-2" title="Escuchar en Apple Music">
                      {Icons.apple}
                    </a>
                  ) : <span className="text-gray-700 cursor-not-allowed" title="No disponible en Apple Music">{Icons.apple}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QUE NADIE TE IMPIDA SOÑAR (Artista) */}
      <section id="artista" className="py-24 px-6 md:px-12 bg-[#FAF9F6]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl uppercase mb-12 border-b border-gray-300 pb-4">
            Que nadie te impida soñar
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Foto Editorial Artista */}
            <div className="w-full lg:w-5/12 relative">
               <img src="https://placehold.co/1000x1200/101010/F1EEE8?text=1000x1200\nRETRATO\nBIO\nOFICIAL" alt="Biografía oficial de Farik Grippa - Trayectoria musical y artística" loading="lazy" className="w-full h-auto rounded-sm shadow-xl" />
               <div className="absolute top-4 left-4 bg-black/70 text-white text-[10px] uppercase px-2 py-1 tracking-wider backdrop-blur-sm rounded">Size: 1000x1200px</div>
            </div>
            
            {/* Contenido Bio */}
            <div className="w-full lg:w-7/12 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-6">La historia de un artista que se niega a dejar de sonar.</h3>
              
              <div className="font-light space-y-4 text-[#101010]/80">
                <p>Farik Grippa creció en El Rubío, una emblemática cevichería limeña donde la música latinoamericana formaba parte de la vida cotidiana. Rodeado de artistas que visitaban el Perú, descubrió su vocación desde niño. Un encuentro temprano con Jerry Rivera anticipó una historia que años después volvería a cruzarlos, esta vez en un escenario televisivo.</p>
                <p>Tras insistir en distintos concursos de canto, Farik ganó la tercera temporada de Los Cuatro Finalistas y dio el salto a la industria musical con En Peligro de Extinción, junto a Orquesta Bembé. El éxito lo llevó a girar por el Perú, presentarse en grandes escenarios y construir una conexión con audiencias de otros mercados. Canciones como Háblame de Ti y Somos Dos también alcanzaron el primer lugar en radios de Perú y Panamá.</p>
                
                {/* Panel Expandible para Bio Extensa */}
                <div className={`overflow-hidden transition-all duration-500 ${showFullBio ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="mt-4">Pero mientras su música conectaba con el público, las dificultades con equipos y proyectos profesionales frenaron su crecimiento en momentos decisivos. Después de años de avances y retrocesos, Farik llegó a pensar en abandonar la música. Una conversación con su esposa le recordó cuánto había recorrido y lo impulsó a tomar nuevamente las riendas de su carrera.</p>
                  <p className="mt-4">Hoy, Farik inicia una etapa de reinvención que mantiene la salsa como base y explora nuevas variantes de cumbia, fusiones y sonidos tropicales. MUSEO funciona como un puente entre lo vivido y lo que viene, mientras su mirada se dirige hacia mercados como Panamá, México, Chile y Colombia.</p>
                  <p className="mt-4">Su historia no es la de un artista que nunca cayó, sino la de alguien que encontró la fuerza para volver a empezar. «Que nadie te impida soñar» expresa su convicción; «Que suene, más fuerte» resume su decisión de seguir adelante.</p>
                  <p className="mt-4 font-semibold text-[#101010]">Farik Grippa. Que suene, más fuerte.</p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowFullBio(!showFullBio)}
                className="mt-6 self-start text-sm font-semibold uppercase tracking-widest text-[#00BDB3] hover:text-[#101010] transition-colors"
              >
                {showFullBio ? 'Leer menos' : 'Seguir leyendo'}
              </button>

              <div className="mt-12 pt-8 border-t border-gray-300">
                <h4 className="text-sm font-semibold uppercase tracking-widest mb-4">Recursos Profesionales</h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://drive.google.com/file/d/1AhV7VPkoLEjRz3gXr8uyGS6AzuAVJjAp/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-[#101010] px-6 py-3 font-semibold uppercase tracking-wider text-xs hover:bg-[#101010] hover:text-[#F1EEE8] transition-colors rounded-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    Historia Completa
                  </a>
                  <a href="https://drive.google.com/drive/folders/1a-WlhGxUy1bC0HllQDZHhq6sIDOYL0F0?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-[#101010] px-6 py-3 font-semibold uppercase tracking-wider text-xs bg-[#101010] text-[#F1EEE8] hover:bg-transparent hover:text-[#101010] transition-colors rounded-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                    Fotografías para Prensa
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLUB FG */}
      <section id="clubfg" className="py-24 px-6 md:px-12 bg-[#FF5A50] text-[#F1EEE8]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl uppercase mb-4">Club FG</h2>
          <p className="font-light mb-12 max-w-xl mx-auto">Únete a los canales oficiales de la comunidad. El lugar donde compartimos la música antes que nadie.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLUB_CHANNELS.map(channel => (
              <div key={channel.platform} className="bg-[#101010] p-8 flex flex-col items-center text-center rounded-sm hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 mb-4 text-[#FF5A50]">{Icons[channel.icon]}</div>
                <h3 className="font-bold text-xl mb-2">{channel.name}</h3>
                <p className="text-sm text-gray-400 font-light mb-6 flex-grow">{channel.description}</p>
                <a href={channel.url} target="_blank" rel="noopener noreferrer" className="w-full bg-[#F1EEE8] text-[#101010] py-3 uppercase text-xs font-bold tracking-widest hover:bg-[#00BDB3] hover:text-[#F1EEE8] transition-colors rounded-sm">
                  Unirme a {channel.platform}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FARIK LIVE */}
      <section id="live" className="py-24 px-6 md:px-12 bg-[#101010] text-[#F1EEE8]">
         <div className="max-w-6xl mx-auto">
          <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl uppercase mb-12 flex items-center gap-4">
            Farik <span className="text-[#00BDB3]">LIVE</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {LIVE_VIDEOS.map(video => (
              <div key={video.id} className="group relative">
                <div className="aspect-video bg-gray-900 rounded-sm overflow-hidden relative">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <a href={video.url} className="w-20 h-20 border-2 border-white/50 rounded-full flex items-center justify-center pl-1 group-hover:scale-110 group-hover:border-[#00BDB3] transition-all bg-black/30 backdrop-blur-sm">
                      <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 group-hover:fill-[#00BDB3] transition-colors"><path d="M8 5v14l11-7z"/></svg>
                    </a>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mt-4 text-gray-300 group-hover:text-white transition-colors">{video.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CONTACTO */}
      <section id="contacto" className="py-24 px-6 md:px-12 bg-[#F1EEE8]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-6xl uppercase mb-12 text-center text-[#101010]">Contacto Profesional</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CONTACT_INFO.map(contact => (
              <div key={contact.type} className="border border-[#101010]/20 p-8 rounded-sm bg-white hover:shadow-xl transition-shadow flex flex-col">
                <h3 className="font-['Bebas_Neue'] text-3xl uppercase mb-2 text-[#00BDB3]">{contact.type}</h3>
                <p className="text-sm font-light text-[#101010]/80 mb-8 flex-grow">{contact.desc}</p>
                <a href={contact.link} target="_blank" rel="noopener noreferrer" className="block text-center border border-[#101010] py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#101010] hover:text-white transition-colors rounded-sm">
                  Contactar a {contact.type}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. REDES SOCIALES Y FOOTER */}
      <footer className="bg-[#101010] text-[#F1EEE8] pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Lettering Footer */}
          <h2 className="font-['Bebas_Neue'] text-6xl md:text-[8rem] uppercase leading-none mb-12 opacity-90 text-center">
            Farik Grippa
          </h2>

          {/* Redes Oficiales */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16">
            {SOCIAL_LINKS.map(social => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" title={social.name} aria-label={`Visitar ${social.name} oficial de Farik Grippa`} className="text-gray-400 hover:text-[#00BDB3] transition-colors hover:-translate-y-1 transform duration-300">
                {Icons[social.icon]}
              </a>
            ))}
          </div>

          <div className="w-full border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-gray-500 uppercase tracking-wider">
            <p>&copy; {new Date().getFullYear()} Farik Grippa. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#privacidad" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#terminos" className="hover:text-white transition-colors">Términos</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}