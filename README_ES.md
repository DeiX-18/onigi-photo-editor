# Onigi - Editor de Fotos

Un editor de fotos ligero que funciona completamente en tu navegador. Sin cargas, sin servidores, sin rastreo.

## Características

- **Ajustes de Imagen**
  - Control de brillo (0-200%)
  - Ajuste de contraste (0-200%)
  - Control de saturación (0-200%)
  - Efecto de desenfoque (0-10px)
  - Filtro escala de grises (0-100%)
  - Tono sepia (0-100%)

- **Filtros Preestablecidos**
  - Ninguno (predeterminado)
  - Vintage
  - Frío
  - Cálido
  - Decolorado
  - Dramático

- **Herramienta de Recorte** - Selecciona y recorta cualquier región de tu imagen

- **Descarga** - Guarda tu imagen editada como PNG

## Cómo Usar

1. **Sube una Imagen**
   - Haz clic en la zona de carga o arrastra y suelta una imagen
   - Formatos compatibles: JPG, PNG, GIF, WebP, etc.

2. **Edita tu Foto**
   - Usa los controles deslizantes para ajustar brillo, contraste, saturación y otros efectos
   - Haz clic en los botones de filtro preestablecido para un estilo rápido
   - Todos los cambios se aplican en tiempo real

3. **Recortar (Opcional)**
   - Haz clic en el botón "Recortar" para activar el modo de recorte
   - Dibuja un rectángulo en tu imagen
   - Haz clic en "Aplicar recorte" para confirmar o "Cancelar" para descartar

4. **Descargar**
   - Haz clic en "Descargar" para guardar tu imagen editada como PNG

5. **Restablecer o Cambiar**
   - "Restablecer" - restaura todos los ajustes a predeterminados
   - "Cambiar Foto" - sube una nueva imagen

## Detalles Técnicos

- **Sin Servidor Requerido** - Todo funciona en tu navegador
- **Procesamiento del Lado del Cliente** - Tus imágenes nunca salen de tu dispositivo
- **HTML/CSS/JavaScript Puro** - Sin dependencias ni marcos de trabajo
- **Diseño Responsivo** - Funciona en escritorio y dispositivos móviles

## Instalación

Simplemente abre `index.html` en un navegador web. No se requiere ningún proceso de compilación ni dependencias.

```bash
# Si deseas servirlo localmente
python -m http.server 8000
# Luego visita http://localhost:8000
```

## Compatibilidad de Navegadores

Funciona en todos los navegadores modernos que admiten:
- Canvas HTML5
- API FileReader
- Filtros CSS

