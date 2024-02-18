import { LitElement, html, css } from 'lit';
import "@lrnwebcomponents/meme-maker/meme-maker.js";
/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super(); 

    this.title = "My card!";
    this.link = "#";
    this.desc = "Welcome to this cool PSU card!";
    this.btnText = "Press";
    this.img = "";
    this.toptext = "toptext";
    this.bottomtext= "bottomtext";
    this.fancy = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      :host([fancy]) .card {
      display: block;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: linear-gradient(200deg, #4aec0a, #6dd3ff);
        border: 2px solid #00008c;
        transform: rotate(-360deg);
        transition: transform 20s ease-in-out;
        box-shadow: 10px 10px 10px green;
      }

      .hw2 {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
      }

      .card {
        width: 400px;
        height: 500px;
        background-color: gray;
        padding: 16px;
        margin: 32px 16px;
        border-radius: 6px;
        border: 3px solid black;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
      }

      .header {
        font-size: 50px;
        color: Blue;
        text-align: center;
      }

      .img {
        padding: 20px;
      }

      .paragraph {
        padding: 5px;
        font-weight: bold;
        font-size: 20px;
        margin: 30px;
      }

      .btn {
        background-color: blue;
        color: white;
        text-align: center;
        padding: 20px;
        transition: .6s all ease-in-out;
        border: 3px solid black;
        margin-top: 15px;
      }

      .btn:focus,
      .btn:hover {
        background-color: darkblue;
      }

      @media all and (min-width: 500px) and (max-width: 800px) {
        .card button {
          display: flex;
        }
      }

      @media all and (max-width: 500px) {
        .card {
          max-width: 200px;
          padding: 16px;
          font-size: 10px;
        }
        .card .paragraph {
          font-size: 12px;
        }
      }

      details summary {
        text-align: center;
        font-size: 20px;
        padding: 8px 0;
      }

      details[open] summary {
        font-weight: bold;
      }
      
      details div {
        border: 2px solid black;
        text-align: center;
        padding: 10px;
        height: 70px;
        overflow: auto;
      }
  
    `;
  }

  openChanged(e) {
    console.log(e.target.getAttribute('open'));
    if (e.target.getAttribute('open') !== null) {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }

  render() {
    return html`

      <div class="hw2">
        <div class="card"> 
          <div class="header">
            <header>${this.title}</header>
          </div>

          <meme-maker class="img" alt="meme-maker" image-url="${this.img}" top-text="${this.toptext}" bottom-text="${this.bottomtext}"></meme-maker>
          <details ?open="${this.fancy}" @toggle="${this.openChanged}">
            <summary>Description</summary>
            <div>
              <slot>${this.desc}</slot>
            </div>
          </details>
          <a href="${this.link}">
            <button class="btn">${this.btnText}</button>
          </a>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      link: { type: String},
      desc: { type: String},
      img: { type: String},
      toptext: { type: String},
      bottomtext: { type: String},
      btnText: { type: String},
      fancy: { type: Boolean, reflect: true},
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);