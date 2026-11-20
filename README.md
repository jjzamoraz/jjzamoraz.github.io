# Portfolio — Jimmy Zamora

Portfolio personal estático y bilingüe (**ES / EN**): **HTML + CSS + JavaScript**, sin build
ni dependencias. Pensado para desplegarse en **GitHub Pages** con dominio propio opcional.

## Vista previa local

Desde la raíz del proyecto:

```bash
python3 -m http.server 8000
```

Abre <http://localhost:8000> para la versión en español o <http://localhost:8000/en/>
para la inglesa.

> Usa un servidor local en lugar de abrir `index.html` con `file://`. La página `404.html`
> utiliza rutas absolutas (`/assets/...`) porque GitHub Pages la sirve desde rutas arbitrarias.

## Estructura

```
.
├── index.html                 # Inicio (ES)
├── certificaciones.html       # Certificaciones (ES)
├── sobre-mi.html              # Acerca de (ES)
├── contacto.html              # Contacto (ES)
├── 404.html                   # Página no encontrada (ES)
├── en/
│   ├── index.html             # Home (EN)
│   ├── certifications.html    # Certifications (EN)
│   ├── about.html             # About (EN)
│   ├── contact.html           # Contact (EN)
│   └── 404.html               # Not found (EN)
├── assets/
│   ├── css/style.css          # Sistema de diseño completo
│   ├── js/main.js             # Menú, typewriter, copiar e idioma
│   ├── cv.pdf                 # CV de ejemplo (ES)
│   └── cv-en.pdf              # CV de ejemplo (EN)
├── images/
│   ├── og.png                 # Imagen social ES (1200×630)
│   ├── og-en.png              # Imagen social EN (1200×630)
│   ├── og.svg                 # Fuente editable ES
│   └── og-en.svg              # Fuente editable EN
├── favicon.svg
├── favicon-32.png
├── apple-touch-icon.png
├── robots.txt
├── sitemap.xml
└── .nojekyll
```

## Idiomas

El sitio usa **páginas separadas** en lugar de traducción dinámica. Esto mantiene el HTML
indexable en ambos idiomas y evita parpadeos.

| Español | English |
|---|---|
| `index.html` | `en/index.html` |
| `certificaciones.html` | `en/certifications.html` |
| `sobre-mi.html` | `en/about.html` |
| `contacto.html` | `en/contact.html` |
| `404.html` | `en/404.html` |

Cada página incluye:

- Selector **ES / EN** en el sidebar y en la barra superior.
- `<link rel="alternate" hreflang="es|en|x-default">`.
- `canonical` propio y metadatos Open Graph en su idioma.

Al añadir o renombrar una página, actualiza también su pareja en el otro idioma, los
`hreflang`, el selector de idioma y `sitemap.xml`.

## Personalizar

### 1. Datos de contacto y redes

Sustituye estos valores en **todos** los archivos:

| Placeholder | Dónde aparece |
|---|---|
| `jimmy@example.com` | Sidebar, contacto, 404, `assets/js/main.js` y ambos CV |
| `https://github.com/tuusuario` | Sidebar, footer, contacto, JSON-LD de `index.html` |
| `https://linkedin.com/in/tuusuario` | Sidebar, footer, contacto, JSON-LD de `index.html` |
| `https://tuusuario.github.io` | Canonical, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt` |

Puedes hacerlo de una vez con `grep -rl` y `sed`, o editar los archivos a mano.

### 2. Fechas y ubicación

- Años de las certificaciones: `index.html`, `certificaciones.html`, `sobre-mi.html`,
  sus equivalentes en `en/` y ambos PDF.
- Ubicación y zona horaria: `sobre-mi.html`, `contacto.html`, `en/about.html` y `en/contact.html`.
- Experiencia: ajusta las entradas del timeline a tu trayectoria real.

### 3. CV

`assets/cv.pdf` y `assets/cv-en.pdf` son **PDF de ejemplo** generados para que los enlaces
no estén rotos. Sustitúyelos por tus CV reales manteniendo los mismos nombres y rutas.
Si prefieres un único CV, apunta los botones de `en/` a `../assets/cv.pdf`.

### 4. Foto de perfil

Ahora mismo el avatar son las iniciales `JZ`. Si quieres usar una foto:

1. Guarda la imagen en `images/perfil.jpg` (cuadrada, mínimo 300×300).
2. En el sidebar, cambia el bloque del avatar por:

```html
<a class="avatar" href="index.html" aria-label="Jimmy Zamora — Inicio">
  <img src="images/perfil.jpg" alt="Jimmy Zamora" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
</a>
```

En las páginas inglesas, usa `../images/perfil.jpg` y `href="index.html"`.

### 5. Imagen Open Graph

Hay una imagen por idioma. Si cambias el texto de los SVG, regenéralas:

```bash
rsvg-convert -w 1200 -h 630 images/og.svg -o images/og.png
rsvg-convert -w 1200 -h 630 images/og-en.svg -o images/og-en.png
```

### 6. Contacto

La página de contacto no usa formulario: muestra el email, los enlaces sociales y la
disponibilidad. Para cambiarlos, edita `contacto.html` y `en/contact.html`.
El botón de copiar del email también está en ambos idiomas.

## Despliegue en GitHub Pages

1. Crea un repositorio **público** llamado `tuusuario.github.io`.
2. Sube el proyecto:

```bash
cd /home/jimmy/Escritorio/Portfolio
git init
git add .
git commit -m "Portfolio inicial"
git branch -M main
git remote add origin https://github.com/tuusuario/tuusuario.github.io.git
git push -u origin main
```

3. En GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
4. Espera un minuto y visita `https://tuusuario.github.io` (ES) o
   `https://tuusuario.github.io/en/` (EN).

Cada `git push` a `main` vuelve a desplegar la web automáticamente.

## Dominio propio (Namecheap)

El orden recomendado es:

1. En **Settings → Pages → Custom domain**, escribe tu dominio (`tudominio.dev`) y guarda.
   GitHub creará un archivo `CNAME` en la raíz. Haz `git pull` antes de tu siguiente push.
2. En Namecheap: **Domain List → Manage → Advanced DNS**. Borra los registros por defecto
   (`Parking Page`, `URL Redirect Record`) y añade:

| Tipo | Host | Valor |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `tuusuario.github.io` |

3. Cuando GitHub valide el DNS, activa **Enforce HTTPS**.
4. Actualiza `canonical`, `og:url`, `og:image`, `hreflang`, el JSON-LD, `sitemap.xml` y
   `robots.txt` con el dominio definitivo, en las versiones ES y EN.

## Checklist antes de publicar

- [ ] Email, GitHub y LinkedIn reales.
- [ ] Años y enlaces de verificación de las certificaciones (ES y EN).
- [ ] Experiencia y ubicación ajustadas en ambos idiomas.
- [ ] `assets/cv.pdf` y `assets/cv-en.pdf` sustituidos por los CV reales.
- [ ] Email, GitHub y LinkedIn reales en la página de contacto (ES y EN).
- [ ] Dominio actualizado en canonical, OG, hreflang, JSON-LD, sitemap y robots.
- [ ] Enlaces externos comprobados.
- [ ] Selector ES/EN probado en todas las páginas.
- [ ] Probado en móvil (360 px) y escritorio.
- [ ] `404.html` comprobado en una URL inexistente.
- [ ] Imagen OG visible al compartir en LinkedIn/WhatsApp (ES y EN).

## Notas técnicas

- Sin frameworks, sin build, sin dependencias de npm.
- Tipografías: Inter y JetBrains Mono desde Google Fonts. Si prefieres evitar peticiones
  externas, descárgalas y autoalojalas en `assets/fonts/`.
- El CSS usa variables para toda la paleta (azul `#38bdf8`), el espaciado y los radios.
- `main.js` detecta el idioma mediante `<html lang>` para el typewriter y los textos de
  copiar/menú.
- `prefers-reduced-motion` desactiva animaciones.
- Enlace de salto, `aria-current`, `aria-expanded` y focus visible.
- `.nojekyll` evita que GitHub Pages procese el sitio con Jekyll.

## Licencia

Contenido personal. El código puede reutilizarse como base, pero sustituye textos,
imágenes y datos personales antes de publicar una copia.
