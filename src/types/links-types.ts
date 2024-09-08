export type LinksType = {
  route: string;
  title: string;
};

export type SocialLinksType = LinksType & {
  icon: string;
};

export type NavLinksType = Omit<SocialLinksType, "route">;
