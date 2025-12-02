export const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://mulveerjewellers.com").trim();

export const brandName = "Mulveer Jewellers";
export const brandTagline = "Promises of Purity and Perfection";
export const businessPhone = "+91 7204456583";
export const businessEmail = "care@mulveerjewellers.com";
export const businessAddress = {
  street: "Jamboti Road, Piranwadi",
  city: "Belagavi",
  state: "Karnataka",
  postalCode: "590011",
  country: "India",
};

export const primaryKeywords = [
  "Mulveer Jewellers",
  "best jewellery store in Belgaum",
  "best jewellers in Belgaum",
  "jewellery shop in Belagavi",
  "gold jewellery shop Belagavi",
  "silver jewellery shop in Belgaum",
  "bridal jewellery collections in Belagavi",
  "custom jewellery designers in Belgaum",
  "BIS hallmarked gold jewellery Belagavi",
  "diamond jewellery Belgaum",
  "silver ornaments Belagavi",
];

export const seoImage =
  "https://mulveerjewellers.com/mulverhero.webp".replace(
    "https://mulveerjewellers.com",
    siteUrl
  );

export const absoluteUrl = (path: string) => {
  const trimmedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${trimmedPath}`;
};
