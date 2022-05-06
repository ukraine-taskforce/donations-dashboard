export type DonationPoint = {
  id: number;
  name: string;
  address: string,
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contactName: string;
  phoneNumber: string;
  description: string;
  openingHours: string;
  expireDate: Date;
};

export const donationPoints: DonationPoint[] = [
 {
   id: 1,
   name: "Tübingen Hilft Ukraine",
   address: "Schleifmühleweg 82,  72070 Tübingen, Deutschland",
   coordinates: {
     latitude: 48.5204946,
     longitude: 9.0359159,
   },
   contactName: "Oleksandr Hleba",
   phoneNumber: "+491743414286",
   description: "продукти довготривалого зберігання, дитяче харчування, продукти дорослої та дитячої гігієни, спальники, каримати, аптечки першої медичної допомоги, знеболюючі препарати, противірусні препарати.. більш детально на нашому сайті: https://tuebingen-hilft-ukraine.de",
   openingHours: "Вівторок, Четвер 17:00-20:00. Субота 10:00-14:00",
   expireDate: new Date("2022-12-31"),
 },
];
