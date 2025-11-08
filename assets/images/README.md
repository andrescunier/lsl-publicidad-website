# LSL Publicidad - Guía de Imágenes y Assets

## Estructura de Imágenes Recomendada

### Hero Section
- `gallery/carteleria-01.jpg` - Fachada iluminada para slide 1
- `gallery/gigantografia-04.jpg` - Gigantografía urbana para slide 2
- `gallery/vehicular-02.jpg` - Flota intervenida para slide 3

### Logos
- `brand-logo-dark.png` - Logo principal
- `brand-logo-light.png` - Logo para fondos oscuros
- `favicon.png` - Icono del sitio (PNG)

### Galería por Servicio
- `gallery/carteleria-0*.jpg` - Cartelería y señalización real
- `gallery/corporeos-0*.jpg` - Letras y tótems corpóreos
- `gallery/gigantografia-0*.jpg` - Gigantografías y lonas
- `gallery/vehicular-0*.jpg` - Decoración vehicular y flotas
- `gallery/pop-0*.jpg` - Material POP y displays
- `gallery/pinturerias-0*.jpg` - Intervenciones artísticas
- `gallery/proyectos-0*.jpg` - Proyectos especiales / instalaciones

### Sobre Nosotros
- `gallery/proyectos-02.jpg` - Equipo y montajes en sitio

## Imágenes Curadas

Las carpetas originales con cientos de fotos fueron depuradas y renombradas dentro de `assets/images/gallery/` para facilitar su reutilización. Cada servicio cuenta con al menos cuatro imágenes listas para usarse en sliders, portfolios o galerías.

## Optimización Recomendada

### Tamaños de Imagen:
- **Hero Images**: 1920x1080px, formato JPG, calidad 85%
- **Portfolio**: 600x400px, formato JPG, calidad 80%
- **Logos**: PNG con transparencia
- **Íconos**: SVG preferible, PNG como fallback

### Herramientas Sugeridas:
- TinyPNG para compresión
- SVGO para optimización de SVG
- WebP para navegadores compatibles

## Assets Adicionales Necesarios

### Fuentes:
- Montserrat (Google Fonts) - Títulos
- Inter (Google Fonts) - Texto

### Íconos:
- Font Awesome (CDN incluido)
- Íconos personalizados en SVG si es necesario

### Scripts:
- AOS (Animate on Scroll)
- Isotope (para filtros de portfolio - opcional)

## Copias de Seguridad
- Mantener versiones originales de alta resolución
- Crear múltiples tamaños para responsive design
- Usar formato WebP cuando sea posible

## Notas de Implementación
1. Todas las imágenes del hero deben tener overlay para legibilidad del texto
2. Las imágenes del portfolio necesitan hover effects
3. Implementar lazy loading para mejorar performance
4. Usar srcset para imágenes responsive

## Buenas Prácticas

- Mantener respaldo de las fotografías en alta resolución fuera del repositorio.
- Optimizar copias que se coloquen en `gallery/` (≤ 2000px lado mayor, JPG calidad 80%).
- Reutilizar la nomenclatura `<servicio>-0X.jpg` para futuras incorporaciones.
