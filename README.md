<p align="center">
  <a href="https://violence.dev/logo-big" target="blank">
      <img src="https://violence.dev/img/logo-big.svg" width="180" alt="Violence Logo" />
  </a>
</p>

# Smooth Image Zoom

### Demo

https://github.com/violence-ai/smooth-image-zoom/assets/51386157/e5bfa895-e3ca-425b-a08c-e25d4e154734

<hr>

# Import to your project

```typescript
import SmoothZoomImage from "smooth-image-zoom"
```

# Usage

```typescript
// Initialize
const smoothZoomImage = new SmoothZoomImage()
smoothZoomImage.init()

// Destroy (be sure to use it when unmounting in React components and the like)
smoothZoomImage.destroy()
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
    // Default styles
    styles: {
      root: {
        position: 'fixed',
        zIndex: '999999999',
      },

      overlay: {
        position: 'fixed',
        background: '#000',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '1',
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
        zIndex: '2',
        transition: '500ms ease-in-out',
      },
    },
    // The maximum size of the fill in the browser window as a percentage
    // Default: 100 - will stretch to the window frames
    // Note: The image will not stretch 100% to the browser frame if the size of the original resolution is smaller than the browser window.
    // This is done so that the image quality does not deteriorate and looks aesthetically pleasing
    maxSizePercent: 100,
}

SmoothZoom().init(options)
```
