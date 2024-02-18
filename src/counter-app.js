import { LitElement, html, css } from 'lit';

export class CounterApp extends LitElement {

  static get tag() {
      return 'counter-app';
  }
  
  constructor() {
      super();
      this.myTitle = "Counter";
      this.min = 10;
      this.max = 25;
      this.num = 16;
    } 
  
  static get styles() {
      return css`
        :host {
          display: block;
        }

        :host([num="18"]) .counter {
            color: green;
        }

        :host([num="21"]) .counter {
            color: blue;
        }

        .counter {
            background-color: #416f88;
            border: 8px solid black;
            padding: 8px;
            margin: 16px;
            text-align: center;
            max-width: 300px;
        }

        .numText {
            font-size: 50px;
        }
        
        button {
            font-size: 50px;
            width: 75px;
        }

      .plus:focus,
      .plus:hover {
        background-color: green;
        color: white;
      }

      .minus:focus,
      .minus:hover {
        background-color: red;
        color: white;
      }

      `;
    }

    minus() {
        if (this.num > this.min) {
            this.num--;
        }
    }

    plus() {
        if (this.num < this.max) {
            this.num++;
        }
    }
  
    updated(changedProperties) {
        if (changedProperties.has('num')) {
            this.updateNumStyles();
            if (this.num === 21) {
                this.makeItRain();
            }
        }
    }

    updateNumStyles() {
        if (this.num === this.min || this.num === this.max) {
            this.style.color = 'red';
        }
        else {
            this.style.color = 'white';
        }
    }

    makeItRain() {
        // this is called a dynamic import. It means it won't import the code for confetti until this method is called
        // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
        // will only run AFTER the code is imported and available to us
        import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
          (module) => {
            // This is a minor timing 'hack'. We know the code library above will import prior to this running
            // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
            // this "hack" ensures the element has had time to process in the DOM so that when we set popped
            // it's listening for changes so it can react
            setTimeout(() => {
              // forcibly set the poppped attribute on something with id confetti
              // while I've said in general NOT to do this, the confetti container element will reset this
              // after the animation runs so it's a simple way to generate the effect over and over again
              this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
            }, 0);
          }
        );
      }

  render() {
      return html`
        
        
        <confetti-container id="confetti">
            <div class="counter">
                <h1 class="title-text">${this.myTitle}</h1>
                <p class="numText">${this.num}</p>
                <button class="minus" @click="${this.minus}" ?disabled="${this.min === this.num}">-</button>
                <button class="plus" @click="${this.plus}" ?disabled="${this.max === this.num}">+</button>
            </div>
        </confetti-container>
      `; 
    }
  
  static get properties() {
      return {
        min: { type: Number, reflect: true },
        max: { type: Number, reflect: true },
        num: { type: Number, reflect: true },
      };
    }
}
  
globalThis.customElements.define(CounterApp.tag, CounterApp);