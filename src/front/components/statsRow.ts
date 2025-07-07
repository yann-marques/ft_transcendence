import { Component } from "../decorators/component.js";
import { i18n } from "../common/i18n.js";

@Component({
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
export class statsRow {
    static render: any;
}