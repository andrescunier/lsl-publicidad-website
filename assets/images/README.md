# LSL Publicidad - Guía de Imágenes y Assets

## Estructura de Imágenes Recomendada

### Hero Section
- `hero-1.jpg` - Imagen principal del slider (1920x1080)
- `hero-2.jpg` - Segunda imagen del slider (1920x1080)

### Logos
- `logo-lsl.png` - Logo principal en color
- `logo-lsl-white.png` - Logo blanco para footer
- `favicon.ico` - Icono del sitio

### Servicios (Portfolio)
- `portfolio-1.jpg` - Proyecto de Cartelería (600x400)
- `portfolio-2.jpg` - Proyecto de Corporeos (600x400)
- `portfolio-3.jpg` - Proyecto de Gigantografías (600x400)
- `portfolio-4.jpg` - Proyecto de Decoración Vehicular (600x400)

### Sobre Nosotros
- `about-team.jpg` - Foto del equipo (800x600)

## Imágenes Existentes Utilizables

### De la carpeta wp-content/uploads/img/:
- `logo.png` - Puede usarse como logo principal
- `01.jpg, 02.jpg, 03.jpg, 04.jpg` - Pueden usarse para el hero slider
- `42.jpg` - Imagen de servicios
- Las imágenes numeradas pueden usarse para el portfolio

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

## Mapeo de Imágenes Existentes a la Nueva Web

```
wp-content/uploads/img/logo.png → assets/images/logo-lsl.png
wp-content/uploads/img/01.jpg → assets/images/hero-1.jpg
wp-content/uploads/img/02.jpg → assets/images/hero-2.jpg
wp-content/uploads/img/42.jpg → assets/images/about-team.jpg
```

## Imágenes para Portfolio

Las siguientes imágenes pueden usarse para el portfolio:
- Cartelería: image293.jpg, image297.jpg, image299.jpg
- Corporeos: image301.jpg, image303.jpg, image318.jpg
- Gigantografías: image319.jpg, image322.jpg, image326.jpg
- Decoración Vehicular: image327.png, image331.jpg, image333.jpg