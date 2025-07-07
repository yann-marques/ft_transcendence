import { Component } from "../decorators/component.js";
import { addFriend, toggleStats } from "../utils.js";
import { i18n } from "../common/i18n.js";


function renderConnected(props) {
    if (props.connected == true) {
        return `
            <div class="w-[10px] h-[10px] rounded-full bg-green-400"></div> 
        `;
    } else {
        return `
            <div class="w-[10px] h-[10px] rounded-full bg-red-400"></div> 
        `; 
    }
}

@Component({
  template: (props) => /* html */ `

    <div class="flex items-center gap-4">
        <div class="flex justify-between items-center gap-2 px-2 rounded h-8">
            <div class="flex items-center gap-2">
                <div class="flex">
                    <img class="h-[22px] w-[22px] rounded-full" src="${props.avatar}"/>
                </div>
                <div class="flex">
                    <a name="linkFriend" username=${props.username}  class="text-white text-xs hover:underline cursor-pointer">${props.username}</a> 
                </div>
            </div>
            <div class="flex">
                ${renderConnected({connected: props.connected})}
            </div>
        </div>
    </div>
    `
})
export class friendsUser {
	static render: any

	constructor() {

        const friendsLink = document.getElementsByName("linkFriend");
        for (const link of Array.from(friendsLink)) {
        
            link.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const username = target.getAttribute('username');
                toggleStats(username, true);
            })
            
        }
    }
}