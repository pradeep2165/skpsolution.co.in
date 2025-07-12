declare module "./allIndiaStations.js" {
  interface Station {
    name: string;
    image: string;
    stream: string;
    radio_id: string;
    radio_name: string;
    radio_image: string;
    radio_url: string;
    genre: string;
    country_id: string;
    country_name: string;
    country_flag: string;
  }

  const stationData: {
    stations: Station[];
  };

  export default stationData;
}
