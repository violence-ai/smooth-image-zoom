# Smooth Image Zoom

### Zoom image with smooth animation

https://user-images.githubusercontent.com/51386157/184543160-135b64b7-846d-42ab-86c8-042c574f300f.mp4

<hr>

# Import to your project

```typescript
import Notify from "smooth-image-zoom"
```

# Usage

```typescript
// Initialize
new SmoothZoom().init()
```

```html
<!-- Add the "zoom" attribute to all images that should increase when clicked -->
<img class="image" src="/image_url" zoom>
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
}

SmoothZoom().init(options)
```
