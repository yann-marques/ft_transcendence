import { Component } from "../decorators/component.js";
import { setPopupContent, toggleElt, updateFriends } from "../utils.js";
import { friendsPopup } from "./friendsPopups.js";
import { i18n } from "../common/i18n.js";

@Component({
  template: (props) => ` 
    <div id="friendsBar" class="flex invisible min-w-[400px] max-[410px]:min-w-[300px] max-w-[1029px] min-h-[100px] left-[20px] mb-[100px] mt-[30px] transition-opacity ease-in-out duration-300 justify-center items-center">
        <div class="flex flex-col justify-center relative h-full w-full bg-black rounded-2xl opacity-80 border border-green-800 shadow-2xl shadow-green-500/60">
            
            <div class="flex mt-3 justify-between px-4">
                <div class="flex">
                    <h1 class="text-lg transition-all font-extrabold bg-gradient-to-r from-green-200 via-green-300 to-green-200 bg-clip-text text-transparent">
                        ${i18n.t("friends.title")} 
                    </h1>
                </div>
                <div class="flex">
                    <button id="addFriend" class="text-white text-sm cursor-pointer px-3 py-1 transition-all border rounded-2xl border-green-500 shadow-lg shadow-green-500/50 bg-green-500/50 hover:shadow-green-300/50">
                        ${i18n.t("friends.add")}  
                    </button>
                </div>
            </div> 
        
            <div id="listFriends" class="flex max-w-[1000px] grow justify-center items-center"><h1 class="text-white">${i18n.t("friends.empty")}</h1></div>
        </div>
    </div>
  `
})
export class friendsNav {
    static render: any;

    constructor() {

        const friendsBar = document.getElementById('friendsBar');
        const isLog = localStorage.getItem('me');
        if (friendsBar && isLog)
            friendsBar.classList.add('visible')

        updateFriends();
        const addFriendBtn = document.getElementById('addFriend');
        addFriendBtn.addEventListener('click', (e) => {
            const friendsPopupEl = friendsPopup.render();
            setPopupContent(friendsPopupEl);
            new friendsPopup({});
            toggleElt('popup');
        })

    }
}