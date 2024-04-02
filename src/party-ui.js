import { html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";
import "@lrnwebcomponents/multiple-choice/lib/confetti-container.js";


export class partyUI extends DDD {

  static get tag() {
    return 'party-ui';
  }

  constructor() {
    super();
    this.users = [];
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.users) {
      this.users = []; // Initialize users array if not already initialized
    }
  }

  static get styles() {
    return css`
        :host {
            display: block;
        }
        .party-ui {
        //width: 100%;
        height: 100%;
        position: relative;
        top: 80px; left: 0px;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: all;
        color: var(--ddd-theme-default-slateGray);
      }

      .party-ui-modal {
        background-color: var(--ddd-theme-default-skyBlue);
        font-family: "Press Start 2P", sans-serif;
        text-align: center;
        width: 50vw;
        border: 2px solid var(--ddd-theme-default-success); 
        border-radius: var(--ddd-radius-sm);
        box-sizing: border-box;
        padding: 20px;
      }

      .party-ui-controls {
        background-color: var(--ddd-theme-default-skyMaxLight);
        font-family: "Press Start 2P", sans-serif;
        width: 100%;
        height: 25%;
        border: 2px solid var(--ddd-theme-default-success);
        border-radius: var(--ddd-radius-sm);
        position: relative;
        margin-bottom: 10px;
      }

      .party-ui-users-scroll {
        overflow-y: scroll;
        display: flex;
        overflow: auto;
        white-space: nowrap;
      }

      .partyui-user-container {
        background-color: var(--ddd-theme-default-gradient-navBar);
        font-family: "Press Start 2P", sans-serif;
        color: var(--ddd-theme-default-keystoneYellow);
        margin-right: 40px;
        display: flex;
        border: 2px solid var(--ddd-theme-default-errorLight);
        border-radius: var(--ddd-radius-sm);
        flex-direction: column;
        padding-bottom: 16px;
      }

      .partyui-user-container:hover {
        border-color: black;
}

      .input {
        background: transparent;
        border: 3px solid var(--ddd-theme-default-nittanyNavy); 
        border-radius: var(--ddd-radius-sm);
        font-family: "Press Start 2P", sans-serif;
        padding: 10px; 
        font-size: 16px; 
        color: var(--ddd-theme-default-potentialMidnigh);
        transition: border-color 0.3s ease;  
        margin: 10px 0px 20px 0px;
      }
       svg {
        background-color: transparent;
        position: absolute;
        top: 0;
        right: 0;
        color: var(--ddd-theme-default-landgrantBrown);
        border: none;
        height: 35px;
        width: 35px;
        cursor: pointer;
        font-family: "Press Start 2P", sans-serif;
        font-size: 3rem;
        margin: 5px;
      }
      .addBTN {
        background-color: var(--ddd-theme-default-opportunityGreen);
        color: white;
        font-size: 16px;
        font-family: "Press Start 2P", sans-serif;
        border: 1px solid white;
        border-radius: var(--ddd-radius-sm);
        padding: 10px 20px;
        margin: 5px;
        cursor: pointer;
      }
      .removeBTN {
        background-color: var(--ddd-theme-default-original87Pink);
        color: white;
        font-family: "Press Start 2P", sans-serif;
        font-size: 16px;
        border: 1px solid white;
        border-radius: var(--ddd-radius-sm);
        padding: 10px 20px;
        margin: 12px;
        cursor: pointer;
      }
      .saveBTN {
        background-color: var(--ddd-theme-default-roarGolden);
        color: white;
        font-family: "Press Start 2P", sans-serif;
        font-size: 16px;
        border: 1px solid white;
        border-radius: var(--ddd-radius-sm);
        padding: 10px 20px;
        margin: 12px;
        cursor: pointer;
      }

      .addBTN:hover, .removeBTN:hover, .saveBTN:hover {
        border-color: var(--ddd-theme-default-pughBlue);
        transform: scale(1.1);
        transition: 0.2s ease-in-out

      }

      .addBTN:focus .removeBTN:focus .saveBTN:focus{
        border: 1px solid yellow;
      }

      .bottom-title {
        background-color: var(--ddd-theme-default-navy80);
        color: var(--ddd-theme-default-keystoneYellow);
        font-family: "Press Start 2P", sans-serif;
        font-size: 16px;
        font-weight: var(--ddd-font-navigation-bold);
        margin: 12px;
      }
      .user-name {
        margin: 10px;
      }
      .user-delete-btn {
        background-color: var(--ddd-theme-default-original87Pink);
        color: white;
        font-family: "Press Start 2P", sans-serif;
        font-size: 8px;
        border: 1px solid white;
        border-radius: var(--ddd-radius-sm);
        margin: 5px;
        padding: 5px 10px;
        cursor: pointer;
      }
    `;
  }


  toggleAlert() {
    const modal = this.shadowRoot.querySelector('.party-ui-modal');
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      localStorage.removeItem('modalIsOpen', 'true');
      modal.style.display = 'none';
    } else {
      localStorage.setItem('modalIsOpen', 'false');
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.addUser();
    }
  }

  addUser() {
    const inputElement = this.shadowRoot.querySelector('.input');
    if (!inputElement) {
      console.warn('There is no input');
      return;
    }

    const userInput = inputElement.value;
    if (!userInput) {
      console.warn('Input is empty.');
      return;
    }

    const checkUsername = /^[a-z0-9]{2,8}$/;
    if (!checkUsername.test(userInput)) {
      console.warn('Username does not meet the requirements.');
      alert(`Username does not meet the requirements.`)
      return;
    }

    if (this.users.includes(userInput)) {
      alert('User already exists in the party.')
      return;
    }

    this.users.push(userInput);
    inputElement.value = '';
    this.requestUpdate();

    console.log('User added:', userInput);

    // Render the users dynamically
    const partyUiUsersScroll = this.shadowRoot.querySelector('.party-ui-users-scroll');
    if (!partyUiUsersScroll) {
      console.warn('Scroll container not found.');
      return;
    }

    partyUiUsersScroll.innerHTML = ''; // Clear the container

    this.users.map(user => {
      const newUserContainer = document.createElement('div');
      newUserContainer.classList.add('partyui-user-container');
      newUserContainer.innerHTML = `
            <rpg-character seed="${user}"></rpg-character>
            <div>${user}</div>
            <div>
              <button class="user-delete-btn">Delete</button>
            </div>
        `;
      partyUiUsersScroll.appendChild(newUserContainer);

      console.log('New user container created for:', user);

      const deleteButton = newUserContainer.querySelector('.user-delete-btn');
      deleteButton.addEventListener('click', this.deleteUser.bind(this));
    });
  }



  deleteUser(event) {
    // Get the username associated with the delete button clicked
    const username = event.target.parentNode.previousElementSibling.innerText;

    // Remove the user from the array
    const index = this.users.indexOf(username);
    if (index !== -1) {
      this.users.splice(index, 1);
    }

    // Remove the user container from the display
    event.target.parentNode.parentNode.remove();
    this.shadowRoot.querySelector('#sound2').play();

    console.log('User deleted:', username);
    console.log('Updated users array:', this.users);
  }

  invalidAlert() {
    return html`
            <div class="modalView" id="modalView">
            <div id="modalView__closeBtn"></div>
            <div class="modalView__content centered">
                <p>Does not meet requirements</p>
            </div>
            </div>
        `
  }

  saveParty() {
    const namesString = this.users.join(', ');
    console.log('Party saved. Users:', this.users);
    alert(`Party saved. Users: ${namesString}`);
    this.shadowRoot.querySelector('#sound').play();
    this.makeItRain();
  }

  render() {
    return html`
    <audio id="sound" src="coin.mp3"></audio>
    <audio id="sound2" src="fart.mp3"></audio>
    <div class="party-start">
    <a href="#" role="button" class="random-btn">Start a Party</a>
  </div>
    <div class="party-ui">
      <confetti-container id="confetti">
      <div class="party-ui-modal">
        <div class="party-ui-controls">
            <div>
              <h3>Add a User</h3>
              <p>Must have 8 characters. No uppercase, numbers or special characters</p>
            </div>
            <div>
                <input class="input" type='text' placeholder="Type name here..." pattern="[a-z0-9]*" @keydown=${this.handleKeyPress}>
                <button class="addBTN" @click=${this.addUser}>Add User</button>
            </div>
            <svg @click="${this.toggleAlert}" viewBox="-3.6 -3.6 31.20 31.20" fill="none" xmlns="http://www.w3.org/2000/svg" stroke=var(--ddd-theme-default-original87Pink) transform="rotate(90)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z" fill=var(--ddd-theme-default-original87Pink)></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z" fill=var(--ddd-theme-default-original87Pink)></path> </g></svg>
        </div>

        <div class="bottom-title">
          Users in the Party:
        </div>
        <div class="party-ui-users-scroll">
          <!-- Sample person -->
          <div class="partyui-user-container">
            <rpg-character seed="svb4647"></rpg-character>
            <div>sample</div>
            <div>
              <button class="user-delete-btn" @click=${this.deleteUser}>Delete</button>
            </div>
            
        </div>

      </div>
      <!-- <button class="removeBTN" @click=${this.deleteUser}>Remove User</button> -->
      <button class="saveBTN" @click=${this.saveParty}>Save Party!</button>
  </confetti-container>
    </div>
    `;
  }

  static get properties() {
    return {
      users: { type: Array }
    };
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
}

globalThis.customElements.define(partyUI.tag, partyUI);