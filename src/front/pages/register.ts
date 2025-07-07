import { RouterHandler } from "../common/routeHandler.js";
import { footer } from "../components/footer.js";
import { navbar } from "../components/navBar.js";
import { PageComponent } from "../decorators/page.js";
import { i18n } from "../common/i18n.js";
import { toggleErrorText, updateStatus } from "../utils.js";


@PageComponent({
  template: () => /* html */ `

    ${navbar.render({
      shadow: "shadow-lg shadow-purple-500/50",
      title: `${i18n.t("register.title")}`
    })}

    <main class="flex flex-col grow justify-center items-center">
      <div class="flex w-[900px] h-[450px] rounded-lg justify-center items-center backdrop-blur border border-zinc-800 shadow-lg shadow-purple-500/50">
        <div class="flex flex-col gap-5 w-full max-w-[600px] px-4">

          <div class="flex flex-col my-3 items-center h-[50px]">
            <h1 class="relative -translate-y-4 text-xl font-extrabold bg-gradient-to-r from-purple-400 via-purple-600 to-purple-700 bg-clip-text text-transparent self-center mb-0">
              ${i18n.t("register.title")}
            </h1>
            <h1 id="errorText" class="text-red-400 mt-5 invisible text-center"></h1>
          </div>

          <form id="formRegister" class="flex flex-col gap-4">
              <input type="text" name="username" placeholder="${i18n.t("register.username")}" class="w-full text-black text-left transition bg-gray-200 shadow-md shadow-purple-500/60 inset-shadow-sm inset-shadow-purple-900 rounded-xl text-xs px-3 py-2.5 placeholder-gray-900 focus:outline-none">
              <input type="email" name="email" placeholder="${i18n.t("register.email")}" class="w-full text-black text-left transition bg-gray-200 shadow-md shadow-purple-500/60 inset-shadow-sm inset-shadow-purple-900 rounded-xl text-xs px-3 py-2.5 placeholder-gray-900 focus:outline-none">
              <input type="text" name="fullname" placeholder="${i18n.t("register.fullname")}" class="w-full text-black text-left transition bg-gray-200 shadow-md shadow-purple-500/60 inset-shadow-sm inset-shadow-purple-900 rounded-xl text-xs px-3 py-2.5 placeholder-gray-900 focus:outline-none">
  
              <div class="flex flex-row justify-between gap-4">
                  <input type="password" name="password" placeholder="${i18n.t("register.password")}" class="flex-1 text-black text-left transition bg-gray-200 shadow-md shadow-purple-500/60 inset-shadow-sm inset-shadow-purple-700 rounded-xl text-xs px-3 py-2.5 placeholder-gray-900 focus:outline-none">
                  <input type="password" name="confirmPassword"  placeholder="${i18n.t("register.confirmPassword")}" class="flex-1 text-black text-left transition bg-gray-200 shadow-md shadow-purple-500/60 inset-shadow-sm inset-shadow-purple-700 rounded-xl text-xs px-3 py-2.5 placeholder-gray-900 focus:outline-none">
              </div>
  
              <input type="submit" class="w-60 cursor-pointer self-center mt-6 text-white font-extrabold transition bg-gradient-to-r from-purple-400 via-purple-600 to-purple-700 shadow-md hover:shadow-lg shadow-purple-500/60 hover:shadow-purple-400/60 inset-shadow-sm inset-shadow-purple-900 rounded-xl text-sm px-3 py-1.5 text-center me-2"
                  placeholder="${i18n.t("register.submit")}" value="${i18n.t("register.submit")}"
              />
          </form>
    
        </div>
      </div>
    </main>

    ${footer.render()}
  `
})
export class register {
  constructor() {
    new navbar();
    new footer();

    const formRegister = document.getElementById('formRegister');
    formRegister.addEventListener('submit', async function(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData)
            });
            
            const username = jsonData['username'];
            if (username == 'me' || username == 'AI') {
                toggleErrorText('errorText', i18n.t("register.errorTakenUsername"));
                return ;
            }

            if (username.length >= 10) {
                toggleErrorText('errorText', i18n.t("register.errorUsernameLong"));
                return ;
            }

            const password = jsonData['password'];
            const confirmPassword = jsonData['confirmPassword'];
            if (password != confirmPassword) {
                toggleErrorText('errorText', i18n.t("register.errorSamePassword"))
                return ;
            }

            if (password.length < 8) {
                toggleErrorText('errorText', i18n.t("register.errorPasswordLong"));
                return ;
            }

            if (!response.ok) {
                toggleErrorText('errorText', i18n.t("register.error"));
                return;
            }

            await updateStatus();
            const router = new RouterHandler();
            router.changeData("/");

        } catch (error) {
        console.error("Error:", error);
        }
    });
  }
}
