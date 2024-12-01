import { writable } from "svelte/store";

export type ClinicInfo = {
  FAVICON?: string;
  BLOG_URL?: string;
  HOME_URL?: string;
  LOGO_URL?: string;
  OG_IMAGE?: string;
  SITE_URL?: string;
  ABOUT_URL?: string;
  META_TITLE?: string;
  PROFESSION?: string;
  CONTACT_URL?: string;
  SERVICE_URL?: string;
  META_DESCRIPTION?: string;
  CALLBACK_URL?: string;
  terms?: string;
};

function ClinicInfo() {
  const { set, update, subscribe } = writable<ClinicInfo>({});

  return {
    set,
    update,
    subscribe,
  };
}

export const clinicInfo = ClinicInfo();
