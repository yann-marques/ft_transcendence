var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "../decorators/component.js";
let statsRow = class statsRow {
};
statsRow = __decorate([
    Component({
        template: (props) => /* html */ `
    <tr class="border-b text-xs dark:border-gray-700 border-gray-200">
        <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ${props.date}
        </th>
        <td class="px-3 py-4">
            ${props.opponent}
        </td>
        <td class="px-3 py-4">
            ${props.duration}
        </td>
        <td class="px-3 py-4">
            ${props.winner}
        </td>
    </tr>
  `
    })
], statsRow);
export { statsRow };
