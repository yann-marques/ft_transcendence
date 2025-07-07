import { Component } from "../decorators/component.js";
import { i18n } from "../common/i18n.js";

@Component({
  template: () => /* html */ `
    <div class="flex w-full py-2 justify-center text-center bg-black shadow-[_0_20px_50px_rgba(204,_204,_204,_1)]">
        <div class="flex">
            <h1 class="text-white text-sm">2025 @ <span class="font-extrabold bg-gradient-to-r from-orange-500 via-blue-500 to-teal-500 text-transparent bg-clip-text">ft_transcendence</span> ${i18n.t("footer.credits")}</h1>
        </div>
    </div>
  `
})
export class footer {
    static render: any;
}