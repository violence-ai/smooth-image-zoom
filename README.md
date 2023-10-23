# Smooth Image Zoom

### Demo

https://github.com/violence-ai/smooth-image-zoom/assets/51386157/e5bfa895-e3ca-425b-a08c-e25d4e154734

<hr>

# Import to your project

```typescript
import SmoothZoom from "smooth-image-zoom"
```

# Usage

```typescript
// Initialize
new SmoothZoom().init()
```

```html
<!-- Add the "smooth-image-zoom" class to all images that should increase when clicked -->
<img class="image smooth-image-zoom" src="/image_url">
```

# Options

```typescript
// You can get base options for further overriding (see "options" below)
const defaultStyles = SmoothZoom.defaultOptions

const options = {
    styles: {
      root: {
        position: 'fixed',
      },

      overlay: {
        position: 'fixed',
        background: '#000',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '9999',
        transition: '500ms ease',
      },

      overlayHide: {
        opacity: '0'
      },

      overlayShow: {
        opacity: '0.7'
      },

      img: {
        position: 'fixed',
        zIndex: '10000',
        transition: '500ms ease-in-out',
      },
    },
    // 
    maxSizePercent: 80,
}

SmoothZoom().init(options)
```
