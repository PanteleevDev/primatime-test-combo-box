export type WebsiteLink = `http${"s" | ""}://www.${string}`;
export type UniversityType = {
  alpha_two_code: string;
  country: string;
  "state-province": string | null;
  domains?: string[];
  name: string;
  web_pages?: WebsiteLink[];
};
