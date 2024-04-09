import { html, css } from "lit";
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";
 
export class PartyUI extends DDD {

    static get tag() {
        return 'haxcms-party-ui';
      }

    constructor(){
        super();
        this.user = [];
        this.max = 5;
        this.temp = "";
        this.sideBar = false;
    }

  static get styles() {
    return [
      super.styles,
      css`
      :host {
        display: block;

      }
         
      .my-div {
        padding: var(--ddd-spacing-4);
        margin: var(--ddd-spacing-2) var(--ddd-spacing-0);
      }

      .everything-wrapper {
        display: inline-flex;
        flex-direction: row;
        padding: var(--ddd-spacing-4);
        margin: var(--ddd-spacing-2);
      }

      .sidebar {
        display: flex;
        width: var(--ddd-spacing-2);
      }

      .party-ui-wrapper {
        text-align: center;
        display: block;
        background-color: var(--ddd-theme-default-keystoneYellow);
        padding: var(--ddd-spacing-4);
        margin: var(--ddd-spacing-2);
        height: var(--party-ui-party-container-max-height, 340px);
        width: var(--party-ui-party-container-max-width, 700px);
        border: var(--ddd-border-lg);
        border-color: var(--ddd-theme-default-black);
      }

      .characters-wrapper {
        padding: var(--ddd-spacing-4);
        width: 350px;
        display: flex;
        margin: auto;
        justify-content: center;
        align-items: center;
        border: var(--ddd-spacing-4);
        color: var(--ddd-theme-default-coalyGray);
      }

      .user {
        font-size: 30px;
        text-align: center;
        width: 50px;
      }

      .add-user-button{
        font-size: 20px;
        font-family: "Press Start 2P", system-ui;
      }

      .delete-button{
        font-family: "Press Start 2P", system-ui;
      }

      .save-wrapper{
        padding: var(--ddd-spacing-2);
        width: var(--party-ui-party-container-max-width, 250px);
        display: flex;
        flex-direction: column;
        margin: auto;
        margin-bottom: var(--ddd-spacing-4);
        justify-content: center;
        align-items: center;
        border: var(--ddd-spacing-2);

      }

      .save-button{
        font-family: "Press Start 2P", system-ui;
      }

      .user-name-text{
        text-align: center;
        display: flex;
        color: var(--ddd-theme-default-black);
        width: 95%;
        margin: auto;
        margin-top: var(--ddd-spacing-4);
        align-items: center;
        justify-content: center;
        font-weight: var(--ddd-font-primary-medium);
        margin: auto;
      }

      .vertical-wrapper{
        display:block;
      }

      .popUp {
            display: flex;
            flex-direction: column;
            background-color: var(--ddd-theme-default-potential0);
            border: var(--ddd-border-lg);
            color: var(--ddd-theme-default-nittanyNavy);
            
          }

        rpg-character
        {
          max-width: var(--party-ui-party-container-max-width, 100px);
          max-height: var(--party-ui-party-container-max-height, 700px);
          padding: var(--ddd-spacing-4);
          margin-bottom: var(--ddd-spacing-8);
          margin-left: var(--ddd-spacing-4);
          margin-right: var(--ddd-spacing-4);
          height:100%;
          width:100%;
        }

    `];

  }



  updateName(event)
  {
    this.temp = event.target.value;

  }


  addUser(event){
    if (this.temp.trim() !== "") {
    if (this.user.length < this.max) {
      this.user.push(this.temp);
      this.temp = "";
      this.shadowRoot.querySelector('.text-input').value = "";
      this.sideBar = false;
      this.requestUpdate();
  }
}


}

saveParty() {
  this.makeItRain();
  alert(`Saved party with the following: ${this.user.join(', ')}`);
}

deleteUser() {

  if (this.user.length > 0) {
      this.user.pop();
  }

  this.requestUpdate();
}

  characterView(name){
    // console.log(name + " is running")
    const hatList = [
      "bunny",
      "coffee",
      "construction",
      "cowboy",
      "education",
      "knight",
      "ninja",
      "party",
      "pirate",
      "watermelon",
    ];

    let number = name.charCodeAt(0) % hatList.length;
    

    return html`
    <div class="vertical-wrapper">
        <rpg-character id="rpg" hat=${hatList[number]} seed= ${name} style= "height: 100px; width: 100px;"></rpg-character>
        <div class="user-name-text">${name}</div>
      </div>
    `;
  }

  render() {
    
    return html`
    <div class="everything-wrapper">
    <div class="party-ui-wrapper">
      <div class="usernames-wrapper">
          <input class="text-input" type="text" value=${this.user} @input=${this.updateName} @keyup="${this.handleInput}">
          <button id="add-user-button" @click="${this.addUser}" ?disabled="${this.user.length >= this.max}">Add User</button>
      </div>
      <confetti-container id="confetti">
      <div class="characters-wrapper">
          ${this.user.map(element => 
            this.characterView(element)
          )}
      
        <!-- ${this.characterView(this.temp)} -->
        </div>
        </confetti-container>

        <div class="user"></div>
          

      <div class="save-wrapper"></div>
    
        <button id="save-button" @click="${this.saveParty}" ?disabled="${this.user.length === 0}">Save</button>
        <button id="delete-button" @click="${this.deleteUser}" ?disabled="${this.user.length === 0}">Delete</button>
        <!-- </div>
      </div> -->
    </div>
    <div class="sidebar" style="${(!this.sideBar) ? "display:none;" : ""}">
        <div class=popUp>
        
            
            ${this.characterView(this.temp)}
            
            
            
        </div>
  </div>
    
    `;
  }

  handleInput(event) {
    var userInput = event.target.value;
    userInput = userInput.slice(0, 10); 

    const invalidCharacter = userInput.match(/[^a-z0-9]/g)
    if (invalidCharacter) {
      alert(`The character "${invalidCharacter[0]}" is not allowed.`);
      userInput = userInput.replace(invalidCharacter[0], '');
      this.sideBar = false;
    } else {
      this.sideBar = true;
    }
    this.temp = userInput;
    event.target.value = this.temp;
  }

  

  makeItRain() {
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
 
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      user: { type: String, reflect: true},
      user: { type: Array, reflect: true},
      max: { type: Number},
      temp: { type: String, reflect: true},
      sideBar: {type: Boolean, reflect: true},
    }
  }
}

globalThis.customElements.define(PartyUI.tag, PartyUI);