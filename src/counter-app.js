import { LitElement, html, css } from 'lit';


export class CounterApp extends LitElement {

  static get tag() {
    return 'counter-app';
  } 

  constructor() {
    super();
    this.counter = 15;
    this.min = 10;
    this.max = 25;
  }

  static get styles() {

    return css`

      :host {
        display: block;
      }
      :host([counter="18"]) .header {
        color: red;
      }
      :host([counter="21"]) .header {
        color: orange;
      }

      .wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }

      .card {
        background-color: cyan;
        padding: 16px;
        margin: 32px 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
      }

      .header {
        font-size: 50px;
        color: black;
        text-align: center;
      }

      .buttonRow {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }
      
      .addBtn,
      .subtractBtn {
        background-color: blue;
        color: white;
        text-align: center;
        padding: 20px;
        transition: .6s all ease-in-out;
        margin: 16px 16px 16px 16px;
      }

      .addBtn:focus,
      .addBtn:hover,
      .subtractBtn:focus,
      .subtractBtn:hover {
        background-color: darkblue;
      }

    `;
  }

  addOne(e) {
    
    this.counter+=1;
    
  }

  subtractOne(e) {
    
    this.counter-=1;
    
  }

  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      if (this.counter === 21) {
        this.makeItRain();
      }
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
      <style>
        :host([counter="${this.min}"]) .header {
          color: green;
        }
        :host([counter="${this.max}"]) .header {
          color: purple;
        }
      </style>
      <div class="wrapper">
          <div class="card">
            <div class="header">
              <header>${this.counter}</header>
            </div>
            <div class="buttonRow">
              <button @click="${this.subtractOne}" ?disabled="${this.min === this.counter}" class="subtractBtn">-</button>
              <button @click="${this.addOne}" ?disabled="${this.max === this.counter}" class="addBtn">+</button>
            </div>
          </div>
      </div>
      <confetti-container id="confetti"></confetti-container>
    `;
  }

  static get properties() {
    return {
        counter: { type: Number, reflect: true },
        min: {type: Number, reflect: true },
        max: {type: Number, reflect: true },
    };
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);