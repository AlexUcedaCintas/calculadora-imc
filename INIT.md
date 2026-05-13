# Calculadora IMC — Contexto del proyecto

## Repositorio y despliegue

| | |
|---|---|
| **GitHub** | https://github.com/AlexUcedaCintas/calculadora-imc |
| **Producción (GitHub Pages)** | https://alexucedacintas.github.io/calculadora-imc/ |
| **Dominio previsto** | https://calculadora-imc.es/ (en canonical/og tags, dominio aún no activo) |
| **Rama principal** | `main` |
| **GitHub Pages fuente** | rama `main`, directorio raíz `/` |

## Servidor local

```bash
cd "/home/auceda/RubymineProjects/calculadora IMC"
python3 -m http.server 8080
# http://localhost:8080/
```

Si hay problemas de caché del navegador, usar un servidor con cabeceras no-cache:

```python
# server_nocache.py
import http.server, socketserver
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control','no-store')
        super().end_headers()
with socketserver.TCPServer(("",8080),H) as s:
    s.serve_forever()
```

Luego Ctrl+Shift+R en el navegador para forzar recarga.

## Estructura de páginas

| Directorio | Calculadora | H1 actual |
|---|---|---|
| `/` (index.html) | IMC principal | "Calculadora de IMC — Índice de Masa Corporal" |
| `/peso-ideal/` | Peso ideal | "Calculadora de Peso Ideal según altura y sexo" |
| `/calorias-diarias/` | Calorías diarias (TDEE) | "Calculadora de Calorías Diarias — TDEE y TMB" |
| `/calorias-quemadas/` | Calorías quemadas por ejercicio | "Calculadora de Calorías Quemadas por actividad" |
| `/tmb/` | Tasa Metabólica Basal | "Calculadora de TMB — Tasa Metabólica Basal" |
| `/macros/` | Distribución de macronutrientes | "Calculadora de Macros — Proteínas, Carbohidratos y Grasas" |
| `/ffmi/` | Fat-Free Mass Index | "Calculadora FFMI — Índice de Masa Libre de Grasa" |
| `/grasa-corporal/` | % Grasa corporal | "Calculadora de Grasa Corporal" |
| `/agua-diaria/` | Agua diaria recomendada | "¿Cuánta agua debo beber al día?" |

## Stack técnico

- HTML/CSS/JS puro — sin bundler ni build step
- **Tailwind CSS** vía CDN (`https://cdn.tailwindcss.com`)
- **Chart.js** vía CDN (`chart.js@4.4.0`) — gráfico de barras en página IMC
- `js/storage.js` — persistencia con `localStorage` (solo página IMC)
- `js/calculator.js` — lógica IMC principal
- `js/units.js` — conversión métrico/imperial
- `js/gauge.js` — aguja indicadora
- `js/chart.js` — gráfico Chart.js
- `js/theme.js` — modo claro/oscuro (único JS externo cargado en sub-páginas)
- `js/share.js` — compartir resultado (solo IMC, ffmi, grasa-corporal)
- `js/ui.js` — utilidades UI
- `js/faq.js` — acordeón FAQ (solo IMC, lee de `data/faqs.js`)
- Sub-páginas tienen toda la lógica JS inline al final del `<body>`

## Decisiones técnicas clave

### Rutas de navegación
Todos los `href` son **relativos** (ej. `../peso-ideal/`), no absolutos (`/peso-ideal/`).  
Razón: GitHub Pages sirve el sitio en `/calculadora-imc/`, no en la raíz, y rutas absolutas rompen la navegación.

### Precarga de resultados al cargar la página
Cada calculadora tiene valores `value="X"` en sus inputs HTML y llama a `calculate()` de forma síncrona al final del `<script>`, antes del cierre de `</body>`.  
**No usar** `window.addEventListener('load', ...)` — espera a que carguen los CDN externos y los gráficos no aparecen.

### FAQ accordion
- Página IMC: usa `faq.js` con función `toggleFAQ(index)` y datos de `data/faqs.js`
- Sub-páginas con FAQ custom (calorias-diarias, quemadas, tmb, macros, ffmi, grasa-corporal): función `toggleFaq(btn)` definida inline
- `peso-ideal` y `agua-diaria`: usan `<details>/<summary>` HTML nativo, sin JS

### Valores preset por calculadora
| Calculadora | Valores preset |
|---|---|
| IMC | altura 175, peso 78, edad 30, género male |
| Peso ideal | altura 175 |
| Calorías diarias | peso 78, altura 175, edad 30 |
| Calorías quemadas | peso 78, duración 30, actividad "Correr 8km/h" |
| TMB | peso 78, altura 175, edad 30 |
| Macros | kcal 2500, peso 78 |
| FFMI | peso 78, altura 175, grasa 15% |
| Grasa corporal | altura 175, cuello 37, cintura 84, peso 78 |
| Agua diaria | peso 78 |

## SEO — Estado actual (2026-05-13)

### Archivos SEO
- `sitemap.xml` — 9 URLs con prioridades, lastmod 2026-05-13
- `robots.txt` — Allow: /, Sitemap: https://calculadora-imc.es/sitemap.xml
- Link `<link rel="sitemap">` en el `<head>` de todas las páginas

### Meta tags
- Todas las páginas tienen: `<title>`, `<meta description>`, `<meta keywords>`, `<meta robots>`
- Todas tienen og:title, og:description, og:image (1200×630), og:locale, twitter:card, twitter:image
- Canonicals apuntan a `calculadora-imc.es` (dominio previsto, aún no activo)
- Structured data JSON-LD: WebApplication + FAQPage + BreadcrumbList en todas las páginas

### Pendiente SEO
- Crear og:image real (actualmente referencia a `og-image.jpg` que no existe)
- Activar dominio `calculadora-imc.es` y apuntarlo a GitHub Pages
- Enviar sitemap a Google Search Console
- Crear og:images únicas por calculadora

## Monetización con anuncios
- Estructura multi-página es óptima (cada página rankea keyword propia)
- Añadir Google AdSense: insertar script en `<head>` + bloques de anuncio en el HTML de cada página
- Posiciones ideales: tras el bloque de resultado, entre calculadora y sección de contenido

## Historial de commits

| Hash | Descripción |
|---|---|
| `fa34b0c` | revisión SEO global: sitemap, robots, año 2026, keywords, H1s, footers |
| `82829bf` | añadir INIT.md |
| `04e4016` | corregir rutas de navegación a relativas para GitHub Pages |
| `8df0af0` | añadir valores preset y auto-cálculo al cargar en todas las calculadoras |
| `220aa5d` | primeros pasos para el resto de calculadoras |
| `ba04127` | fix comillas escapadas, gráfico, edad y sexo en resultado |
| `130e48b` | calculadora IMC — versión inicial completa |
