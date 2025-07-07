import { Component } from "../decorators/component.js";
import { addFriend, toggleStats } from "../utils.js";
import { i18n } from "../common/i18n.js";

@Component({
  template: (props) => /* html */ `

    <div class="flex flex-col gap-2 items-center py-2 w-[130px] justify-center border rounded-2xl border-green-500 shadow-lg shadow-green-500/50 bg-green-500/50">
        <div class="flex">
            <img class="flex w-[50px] h-[50px] object-fit rounded-full" src="${props.avatar}"/>
        </div>
        <a name="userLink" username=${props.username} class="text-white text-xs font-bold cursor-pointer hover:underline">${props.username}</a>

        <button name="userAdd" username=${props.username} class="flex cursor-pointer text-center text-xs border font-bold text-white items-center p-0.5 px-4 bg-[conic-gradient(at_top,_#b5b5b5,_#232323,_#4d4d4d)] rounded">
            Add
        </button>
    </div>
    
    `
})
export class friendsPopupUser {
	static render: any

	constructor() {

        const userAdd = document.getElementsByName("userAdd");
        for (const link of Array.from(userAdd)) {
            link.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const username = target.getAttribute('username');
                addFriend(username);
            })
        }

        const userLink = document.getElementsByName("userLink");
        for (const link of Array.from(userLink)) {
        
            link.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const username = target.getAttribute('username');
                toggleStats(username, false);
            })
            
        }
    }
}