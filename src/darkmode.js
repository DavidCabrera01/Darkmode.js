export default class Darkmode {
  constructor(options) {
    const bottom = options && options.bottom ? options.bottom : '32px';
    const right = options && options.right ? options.right : '32px';
    const left = options && options.left ? options.left : 'unset';
    const time = options && options.time ? options.time : '0.3s';
    /* eslint-disable */
    const saveInCookies = options && options.saveInCookies === false ? false : true;
    /* eslint-enable */

    const css = `
      .darkmode-layer {
        position: fixed;
        pointer-events: none;
        background: white;
        transition: all ${time} ease;
        mix-blend-mode: difference;
      }

      .darkmode-layer--button {
        width: 2.9rem;
        height: 2.9rem;
        border-radius: 50%;
        right: ${right};
        bottom: ${bottom};
        left: ${left};
      }

      .darkmode-layer--simple {
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
      }
      
      .darkmode-layer--expanded {
        transform: scale(100);
      }
      
      .darkmode-toggle {
        background: #100f2c;
        width: 3rem;
        height: 3rem;
        position: fixed;
        border-radius: 50%;
        right: ${right};
        bottom: ${bottom};
        left: ${left};
        cursor: pointer;
        transition: all 0.5s ease;
      }
      
      .darkmode-toggle--white {
        background: #fff;
      }
      
      img, .darkmode-ignore {
        isolation: isolate;
        display: inline-block;
      }
    `;

    const layer = document.createElement('div');
    const button = document.createElement('div');

    layer.classList.add('darkmode-layer');

    const darkmodeActivated = window.localStorage.getItem('darkmode') === 'true';

    if (darkmodeActivated === true && saveInCookies) {
      layer.classList.add('darkmode-layer--simple');
      button.classList.add('darkmode-toggle--white');
      document.body.classList.add('darkmode--activated');
    }

    document.body.insertBefore(button, document.body.firstChild);
    document.body.insertBefore(layer, document.body.firstChild);

    this.addStyle(css);

    this.button = button;
    this.layer = layer;
    this.saveInCookies = saveInCookies;
  }

  addStyle(css) {
    const linkElement = document.createElement('link');

    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('type', 'text/css');
    linkElement.setAttribute('href', 'data:text/css;charset=UTF-8,' + encodeURIComponent(css));
    document.head.appendChild(linkElement);
  }

  showWidget() {
    const button = this.button;
    const layer = this.layer;

    if (layer.classList.contains('darkmode-layer--simple') && this.saveInCookies) {
      layer.classList.remove('darkmode-layer--simple');
      layer.classList.add('darkmode-layer--expanded');
    }

    button.classList.add('darkmode-toggle');
    layer.classList.add('darkmode-layer--button');

    button.addEventListener('click', () => {
      layer.classList.toggle('darkmode-layer--expanded');
      button.classList.toggle('darkmode-toggle--white');
      document.body.classList.toggle('darkmode--activated');
      window.localStorage.setItem('darkmode', layer.classList.contains('darkmode-layer--expanded'));
    });
  }

  toggle() {
    const layer = this.layer;

    layer.classList.toggle('darkmode-layer--simple');
    document.body.classList.toggle('darkmode--activated');
    window.localStorage.setItem('darkmode', layer.classList.contains('darkmode-layer--simple'));
  }
}