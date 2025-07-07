import { Component } from "../decorators/component.js";
import { closePopup } from "../utils.js";

@Component({
  template: /* html */ `
    <div id="popup" class="fixed z-999 invisible opacity-0 flex w-full h-full justify-center items-center">
        <div class="absolute w-full h-full backdrop-blur"></div>
        <div class="flex relative h-[400px] w-[700px] bg-black rounded-2xl border border-zinc-800">
            <div class="absolute right-5 top-5">
                <button id="closePopup" class="cursor-pointer">
                    <img class="w-[35px] h-[35px]" src="/static/icons/close.svg" />
                </button>
            </div>
            <div id="popupContent" class="flex flex-col w-full justify-center items-center"></div>
        </div>
    </div>
  `
})
export class popup {
    static render: any;

    constructor() {
        
        const closePopupElm = document.getElementById("closePopup");
        closePopupElm.addEventListener('click', () => {
            closePopup();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key == 'Escape')
                closePopup();
        });
    }
}