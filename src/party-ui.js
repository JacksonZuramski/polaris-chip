import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";
 
export class partyUI extends DDD {

    static get tag() {
        return 'party-ui';
      }

    constructor(){
        super();
        this.userArray = [];
        this.maxUsers = 5;
        this.tempUser = "";
    }

  static get styles() {
    return [
      super.styles,
      css`
      :host {
        display: block;
      }
      .my-div {
        padding: var(--ddd-spacing-5);
        margin: var(--ddd-spacing-2) var(--ddd-spacing-0);
        color: var(--ddd-theme-default-keystoneYellow);
      }

      .party-ui-wrapper {
        text-align: center;
        display: block;
        background-color: var(--ddd-theme-default-beaver70);
        padding: 16px;
        border: 2px;
        margin: 8px;
        height: 300px;
        width: 500px;
      }

      .characters-wrapper {
        padding: 20px;
        width: 350px;
        display: flex;
        margin: auto;
        margin-bottom: 10px;
        justify-content: center;
        align-items: center;
        border: 2px;
      }

      .user {
        color: white;
        font-size: 30px;
        text-align: center;
        padding: 0px;
        width: 50px;
      }

      .add-user-button{
        color: blue;
        font-size: 20px;
      }

      .delete-button{
        color: green;
      }

      .save-wrapper{
        padding: 20px;
        width: 250px;
        display: flex;
        flex-direction: column;
        margin: auto;
        margin-bottom: 20px;
        justify-content: center;
        align-items: center;
        border: 2px;

      }

      .save-button{
        color: green;
      }

      .bar{
        height: 100px;
        width: 4px;
        background-color: black;
        display: flex;
      }

    `];
  }


  updateName(event)
  {
    this.tempUser = event.target.value;

  }

  addUser(event){
    if (this.userArray.length < this.maxUsers) {
      this.userArray.push(this.tempUser);
      this.shadowRoot.querySelector('.text-input').value = "";
      this.requestUpdate();
  }


}

deleteUser() {

  if (this.userArray.length > 0) {
      this.userArray.pop();
  }

  this.requestUpdate();
}

  characterView(name){
    // console.log(name + " is running")

    return html`
        <rpg-character id="rpg" hat="random" seed= ${name} style= "height: 100px; width: 100px;"></rpg-character>
    `;
  }

  render() {
    
    return html`
    <div class="party-ui-wrapper">
      <div class="usernames-wrapper">
          <input class="text-input" type="text" value=${this.user} @input=${this.updateName}>
          <button id="add-user-button" @click="${this.addUser}" ?disabled="${this.userArray.length >= this.maxUsers}">Add User</button>
      </div>
      <div class="characters-wrapper">
          ${this.userArray.map(element => 
            this.characterView(element)
          )}

        <div class="bar"></div>
        ${this.characterView(this.tempUser)}

        </div>

          <div class="user"></div>
      <div class="save-wrapper"></div>
        <button id="save-button">Save</button>
        <button id="delete-button" @click="${this.deleteUser}">Delete</button>
        </div>
      </div>
    </div>
    `;
  }
 
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      user: { type: String, reflect: true},
      userArray: { type: Array, reflect: true},
      maxUsers: { type: Number},
      tempUser: { type: String, reflect: true},
    }
  }
}

globalThis.customElements.define(partyUI.tag, partyUI);