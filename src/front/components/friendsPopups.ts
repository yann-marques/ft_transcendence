import { Component } from "../decorators/component.js";
import { sendCustomization, updateUsers } from "../utils.js";
import { i18n } from "../common/i18n.js";

@Component({
  template: () => /* html */ `
	<div class="flex justify-between grow w-full flex-col p-14">

        <div id="popupFriendsContent" class="flex flex-col max-w-full gap-4">

            <h1 class="text-xl transition-all font-extrabold bg-gradient-to-r from-green-200 via-green-300 to-green-200 bg-clip-text text-transparent">
                ${i18n.t("friends.add")}
            </h1>

            <div style="height: 260px" class="overflow-y-auto">

                <div id="listUser" style="flex-wrap: wrap" class="flex flex-wrap gap-4 overflow-y-auto py-7 max-h-[260px] w-full"><h1 class="text-white">No user to add</h1><div>
            
            </div>

            
        </div>

	</div> 
	`
})
export class friendsPopup {
	static render: any

	constructor(props: any) {
        updateUsers();
    }
}