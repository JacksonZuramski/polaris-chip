import { LitElement, html, css } from 'lit';

export class Alert extends LitElement {

  static get tag() {
    return 'campus-alert';
  }

  constructor() {
    super();
    this.issueLevel = "";
    this.message = "This is a default message.";
    this.sticky = false;
    this.opened = true;
  }

  static get styles() {
    return css`
      :host {
        font-size: 16px; 
      }
      :host([number="25"]){
        color: orange;
      }

      .sticky {
        position: sticky;
        top: 0;
        z-index: 100;
        opacity: 1.0;
      }

      .campus-alert {
        font-size: 1em;
        display: block;
        padding: 16px;
        margin: 16px;
      }

      .message {
        font-size: 20px;
        color: white;
      }
    `;
  }

  openedView(color) {
    return html `
      <div class="campus-alert ${(this.sticky) ? "sticky" : ""}" style="background-color:${color}">
        <p class="message">${this.message}</p>
      </div>
    `;
  }

  closedView() {
    return html `
      <div>This is closed</div>
    `;
  }

  render() {
    let color = "white";
    if(this.issueLevel === "notice") color = "green";
    if(this.issueLevel === "warning") color = "orange";
    if(this.issueLevel === "alert") color = "red";
    if(this.issueLevel === "welcome") color = "grey";

    if(this.issueLevel === "welcome") (this.message) = "Welcome!";
    if(this.issueLevel === "notice") (this.message) = "Small notice: watch out for this today.";
    if(this.issueLevel === "warning") (this.message) = "This is a warning. Exceed some caution."
    if(this.issueLevel === "alert") (this.message) = "This is an alert. PROCEED WITH IMMENSE CAUTION!";
    
    return (this.opened) ? this.openedView(color) : this.closedView();
  }

  static get properties() {
    return {
      issueLevel: { type: String },
      message: { type: String },
      sticky: { type: Boolean },
      opened: { type: Boolean, reflect: true },
    };
  }

  toggle() {
    this.opened = !this.opened;
    if (!this.opened) {
      localStorage.setItem('alertClosed', 'true');
    } else {
      localStorage.removeItem('alertClosed');
    }
    const oppositeButton = this.shadowRoot.querySelector('.btn');
    if (oppositeButton) {
      oppositeButton.focus();
    }
  }
}

customElements.define(Alert.tag, Alert);
