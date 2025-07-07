import { i18n } from './common/i18n.js';
import { RouterHandler } from './common/routeHandler.js';
import { customPopup } from './components/customPopup.js';
import { friendsPopupUser } from './components/friendsPopupUser.js';
import { friendsUser } from './components/friendsUser.js';
import { lobbyMatchPlayer } from './components/lobbyMatchPlayer.js';
import { lobbyPlayer } from './components/lobbyPlayer.js';
import { statsPopup } from './components/statsPopup.js';
export async function logoutUser(username) {
    try {
        const jsonData = { 'username': username };
        const response = await fetch('/api/logoutUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
        if (response.ok) {
            if (username == 'me') {
                const router = new RouterHandler;
                localStorage.removeItem('me');
                router.changeData("/");
                return;
            }
            updateAuthUserOnLobby();
            return;
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
}
export async function isLogin() {
    try {
        const response = await fetch('/api/status', {
            credentials: 'include', // send cookies
        });
        if (!response.ok) {
            const router = new RouterHandler;
            router.changeData("/");
            return false;
        }
        const data = await response.json();
        if (data)
            localStorage.setItem('me', JSON.stringify(data.user));
        await updateUsersCustomization();
        return true;
    }
    catch (error) {
        console.error('Error:', error);
    }
}
export async function updateStatus() {
    try {
        const response = await fetch('/api/status', {
            credentials: 'include', // send cookies
        });
        if (!response.ok) {
            return false;
        }
        const data = await response.json();
        if (data)
            localStorage.setItem('me', JSON.stringify(data.user));
        return true;
    }
    catch (error) {
        return false;
    }
}
export async function updateUsersCustomization() {
    try {
        const response = await fetch('/api/getAuthUsersCustom');
        const data = await response.json();
        localStorage.setItem('customPlayer', JSON.stringify(data));
    }
    catch (error) {
        console.log('Error:', error);
    }
}
export async function sendCustomization(jsonData) {
    try {
        const response = await fetch('/api/setCustomization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
        await updateUsersCustomization();
    }
    catch (error) {
        console.log('Error:', error);
    }
}
export async function uploadAvatar(imgBase64) {
    try {
        const jsonData = { "imgBase64": imgBase64 };
        const response = await fetch('/api/uploadAvatar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
    }
    catch (error) {
        console.log('Error:', error);
    }
}
export async function getQRCode() {
    try {
        const response = await fetch('/api/enable-2fa', {
            method: 'POST'
        });
        if (!response.body)
            return '';
        const data = await response.json();
        return data.qrcode;
    }
    catch (error) {
        console.log('Error:', error);
    }
}
export async function disable2fa() {
    try {
        const response = await fetch('/api/disable-2fa', {
            method: 'POST'
        });
    }
    catch (error) {
        console.log('Error:', error);
    }
}
export async function verifyQRCode(code) {
    try {
        const jsonData = { "totpCode": code };
        const response = await fetch('/api/verify-2fa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
        if (response.ok)
            return true;
        return false;
    }
    catch (error) {
        console.log('Error:', error);
    }
}
async function updateMatchUserOnLobby(data, maxPlayerGame) {
    const playersInGame = [];
    const lobbyMatchOrder = document.getElementById("lobbyMatchOrder");
    lobbyMatchOrder.innerHTML = '';
    if (localStorage.getItem('lobby') == '1vIA') {
        const player1 = data[0] != null ? data[0].username : '?';
        const playerMatchComponent = lobbyMatchPlayer.render({ player1: player1, player2: 'AI' });
        lobbyMatchOrder.innerHTML += playerMatchComponent;
        new lobbyMatchPlayer();
        playersInGame.push(data[0], { username: 'IA' });
        const usernames = [...new Set(playersInGame.filter(u => u && u.username).map(u => u.username))];
        localStorage.setItem('playersInGame', JSON.stringify(usernames));
        return;
    }
    for (let i = 0; i < data.length; i += 2) {
        if (maxPlayerGame != -1 && i >= maxPlayerGame)
            break;
        playersInGame.push(data[i], data[i + 1]);
    }
    playersInGame.sort((a, b) => b.winRate - a.winRate);
    const usernames = [...new Set(playersInGame.filter(u => u && u.username).map(u => u.username))];
    for (let i = 0; i < playersInGame.length; i += 2) {
        const player1 = playersInGame[i] != null ? playersInGame[i].username : '?';
        const player2 = playersInGame[i + 1] != null ? playersInGame[i + 1].username : '?';
        const playerMatchComponent = lobbyMatchPlayer.render({ player1: player1, player2: player2 });
        lobbyMatchOrder.innerHTML += playerMatchComponent;
        new lobbyMatchPlayer();
    }
    localStorage.setItem('playersInGame', JSON.stringify(usernames));
}
export function setPopupContent(html) {
    const popupContent = document.getElementById("popupContent");
    if (popupContent) {
        popupContent.innerHTML = '';
        popupContent.innerHTML += html;
    }
}
export function toggleErrorText(eltId, text) {
    const error = document.getElementById(eltId);
    if (error) {
        error.classList.add("visible");
        error.innerText = text;
        setTimeout(() => {
            error.classList.remove("visible");
        }, 3500);
        return;
    }
}
export function closePopup() {
    const popup = document.getElementById("popup");
    if (popup) {
        popup.classList.add('invisible');
        popup.classList.remove("opacity-100");
    }
}
export function toggleElt(eltId) {
    const element = document.getElementById(eltId);
    if (!element)
        return;
    const isHidden = element.classList.contains("hidden") || element.classList.contains("invisible");
    if (isHidden) {
        element.classList.remove("hidden", "invisible", "opacity-0");
    }
    else {
        element.classList.add("hidden", "invisible", "opacity-100");
    }
}
export async function updateAuthUserOnLobby() {
    try {
        await isLogin();
        await updateFriends();
        const response = await fetch('/api/getAuthUsers');
        if (response.ok) {
            const data = await response.json();
            const lobbyPlayerList = document.getElementById("lobbyPlayerList");
            if (!lobbyPlayerList)
                return;
            const dataLobby = localStorage.getItem('lobby');
            if (!dataLobby)
                return;
            localStorage.removeItem('game_token');
            let maxPlayerGame = -1;
            if (dataLobby == "1v1")
                maxPlayerGame = 2;
            if (dataLobby == "1vIA")
                maxPlayerGame = 1;
            await updateMatchUserOnLobby(data, maxPlayerGame);
            lobbyPlayerList.innerHTML = '';
            let nbLogin = 0;
            data.forEach(user => {
                if (maxPlayerGame != -1 && nbLogin >= maxPlayerGame)
                    return;
                const playerComponent = lobbyPlayer.render({ username: user.username, avatar: user.avatar, host: user.host, winRate: user.winRate });
                lobbyPlayerList.innerHTML += playerComponent;
                new lobbyPlayer();
                nbLogin++;
            });
            function isPowerOfTwo(n) {
                if (n == 0 || n == 1)
                    return false;
                return parseInt((Math.ceil((Math.log(n) / Math.log(2)))))
                    == parseInt((Math.floor(((Math.log(n) / Math.log(2))))));
            }
            const buttonPlay = document.getElementById("playPong");
            if (!isPowerOfTwo(nbLogin) && nbLogin != maxPlayerGame) {
                buttonPlay.disabled = true;
                buttonPlay.classList.remove('hover:shadow-green-300/50', 'cursor-pointer');
                buttonPlay.classList.add('opacity-30');
            }
            else {
                buttonPlay.disabled = false;
                buttonPlay.classList.remove('opacity-30');
                buttonPlay.classList.add('hover:shadow-green-300/50', 'cursor-pointer');
            }
            const buttonAddPlayer = document.getElementById("addPlayer");
            if (dataLobby == '1vIA')
                buttonAddPlayer.hidden = true;
            if (maxPlayerGame != -1 && nbLogin >= maxPlayerGame) {
                buttonAddPlayer.innerText = i18n.t("lobby.lobbyFull");
                buttonAddPlayer.disabled = true;
                buttonAddPlayer.classList.remove('hover:shadow-[_0_5px_15px_rgba(255,_161,_45,_1)]', 'text-orange-300', 'cursor-pointer');
                buttonAddPlayer.classList.add('opacity-30', 'border-zinc-500', 'text-white', 'shadow-none', 'cursor-not-allowed');
            }
            else {
                buttonAddPlayer.innerText = i18n.t("lobby.addPlayer") + '+';
                buttonAddPlayer.disabled = false;
                buttonAddPlayer.classList.remove('opacity-30', 'border-zinc-500', 'text-white', 'shadow-none', 'cursor-not-allowed');
                buttonAddPlayer.classList.add('hover:shadow-[_0_5px_15px_rgba(255,_161,_45,_1)]', 'text-white', 'cursor-pointer');
            }
            const popupContent = document.getElementById("popupContent");
            const buttonsCustomizationLobby = document.getElementsByName("customizationLobby");
            for (const settingButton of Array.from(buttonsCustomizationLobby)) {
                settingButton.addEventListener('click', () => {
                    const data = settingButton.getAttribute("data");
                    const customPopupContent = customPopup.render({ username: data });
                    popupContent.innerHTML = customPopupContent;
                    new customPopup({ username: data });
                    toggleElt('popup');
                });
            }
            const labelColorPicker = document.getElementsByName("labelColorPicker");
            for (const label of Array.from(labelColorPicker)) {
                const input = label.querySelector('input[type="color"]');
                if (!input)
                    continue;
                const username = label.getAttribute('data');
                const dataCustoms = JSON.parse(localStorage.getItem('customPlayer'));
                const dataPlayer = dataCustoms.find((user) => user.username === username) || null;
                input.value = dataPlayer.color;
                label.style.backgroundColor = input.value;
                input.addEventListener("input", () => {
                    label.style.backgroundColor = input.value;
                });
                input.addEventListener("change", () => {
                    sendCustomization({
                        username: username,
                        color: input.value,
                    });
                });
            }
            const buttonsLogoutUser = document.getElementsByName("logoutUser");
            for (const logoutButton of Array.from(buttonsLogoutUser)) {
                logoutButton.addEventListener('click', () => {
                    const username = logoutButton.getAttribute("username");
                    const isMe = logoutButton.getAttribute("isMe");
                    if (isMe == 'true')
                        logoutUser('me');
                    else
                        logoutUser(username);
                });
            }
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
}
export async function updateUsers() {
    try {
        const response = await fetch('/api/getUsers');
        const friendsReq = await fetch('/api/getFriends');
        const friends = await friendsReq.json();
        if (response.ok) {
            const data = await response.json();
            const userList = document.getElementById("listUser");
            if (!userList)
                return;
            userList.innerHTML = '';
            data.forEach(user => {
                const me = JSON.parse(localStorage.getItem('me'));
                if (me.username != user.username && !friends.find(u => u.username === user.username)) {
                    const friendsUserElt = friendsPopupUser.render({ username: user.username, avatar: user.avatar });
                    userList.innerHTML += friendsUserElt;
                    new friendsPopupUser();
                }
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}
export async function updateFriends() {
    try {
        const response = await fetch('/api/getFriends');
        if (response.ok) {
            const data = await response.json();
            const userList = document.getElementById("listFriends");
            if (!userList)
                return;
            if (data.length != 0)
                userList.innerHTML = '';
            data.forEach(user => {
                const friendsUserElt = friendsUser.render({ username: user.username, avatar: user.avatar, connected: user.connected });
                userList.innerHTML += friendsUserElt;
                new friendsUser();
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}
export async function fillProfile() {
    try {
        const response = await fetch('/api/getSettings');
        if (response.ok) {
            const data = await response.json();
            if (!data)
                return;
            const usernameInput = document.getElementById('profileUsername');
            const fullnameInput = document.getElementById('profileFullname');
            const emailInput = document.getElementById('profileEmail');
            usernameInput.value = data.username;
            fullnameInput.value = data.fullname;
            emailInput.value = data.email;
        }
    }
    catch (err) {
        console.log(err);
    }
}
export async function addFriend(username) {
    try {
        const jsonData = { target: username };
        const response = await fetch('/api/addFriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
        if (response.ok) {
            toggleElt('popup');
            updateFriends();
        }
    }
    catch (err) {
        console.log(err);
    }
}
export async function createGame(players) {
    try {
        localStorage.removeItem('game_token');
        const jsonData = { players: players };
        const response = await fetch('/api/createGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
        if (response.ok) {
            const data = await response.json();
            if (!data)
                return;
            const gameToken = data.token;
            localStorage.setItem('game_token', gameToken);
        }
        else {
            console.log('Error to launch the game');
            const router = new RouterHandler();
            router.changeData('/lobby');
        }
    }
    catch (err) {
        console.log(err);
        const router = new RouterHandler();
        router.changeData('/lobby');
    }
}
export async function addWinner(username) {
    try {
        const game_token = localStorage.getItem('game_token');
        if (!game_token) {
            const router = new RouterHandler();
            router.changeData('/lobby');
        }
        const jsonData = { game_token, username };
        const response = await fetch('/api/addWinner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });
        if (!response.ok) {
            const router = new RouterHandler();
            router.changeData('/lobby');
            return;
        }
        localStorage.removeItem('game_token');
        localStorage.removeItem('playersInGame');
    }
    catch (err) {
        console.log(err);
    }
}
export async function getLang() {
    try {
        const response = await fetch('/api/user/getLanguage');
        if (response.ok) {
            return (await response.json());
        }
    }
    catch (err) {
        console.log(err);
    }
}
export async function getStats(username) {
    try {
        const response = await fetch('/api/getStats/' + username);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    }
    catch (err) {
        console.log(err);
    }
}
export async function toggleStats(username, toogle) {
    const statsPopupComponent = statsPopup.render({ username: username });
    setPopupContent(statsPopupComponent);
    const stats = await getStats(username);
    new statsPopup(stats);
    if (toogle)
        toggleElt('popup');
}
