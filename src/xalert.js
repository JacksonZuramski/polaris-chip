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

  