type ApiRequests = Record<string, () => Promise<Response>>;

export const requests: ApiRequests = {
  titles: () => fetch("http://www.mocky.io/v2/5bcdd8732f00007300c855da"),
  categories: () => fetch("http://www.mocky.io/v2/5bcdd3942f00002c00c855ba"),
  responsible: () => fetch("http://www.mocky.io/v2/5bcdd7992f00006300c855d5")
};
