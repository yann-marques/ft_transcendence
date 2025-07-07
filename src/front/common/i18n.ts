import { TranslationService } from "./translationService.js";

export const i18n = new TranslationService();
(window as any).i18n = i18n;