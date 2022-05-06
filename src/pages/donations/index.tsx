import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import MapComponent, { Popup, MapProvider, Marker } from "react-map-gl";

import { Layout } from "../../others/components/Layout";
import { Header } from "../../others/components/Header";
import { Main } from "../../others/components/Main";
import { Sidebar } from "../../others/components/Sidebar";
import { CollapsibleTable } from "../../others/components/CollapsibleListSimple";
import { Box, Typography } from "@mui/material";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { DonationPoint, donationPoints } from "../../others/fixtures/realData";

export function Donations() {
  const { t } = useTranslation();
  const [popupInfo, setPopupInfo] = useState<DonationPoint | null>(null);
  
  useEffect(() => {
    document.title = t("donations_page_title");
  }, [t]);

  const tableData = donationPoints.map((point: DonationPoint) => ({data: point}));

  const table = (
    <CollapsibleTable
      rows={tableData}
    />
  );

  const initialMapView = {
    latitude: 48.45,
    longitude: 10.5,
    zoom: 5,
  };

  return (
    <Layout header={<Header />}>
      <MapProvider>
        <Main
          aside={
            <Sidebar className="requests-sidebar">
              {table}
            </Sidebar>
          }
        >
          <Box sx={{ height: "100%", width: "100%" }}>
            <MapComponent
              mapLib={maplibregl}
              initialViewState={initialMapView}
              mapStyle="https://api.maptiler.com/maps/streets/style.json?key=8XnO8TF3UjHDY1RKP9jm"
              style={{ borderRadius: "24px" }}
            >
              {donationPoints.map((point: DonationPoint) => (
                <Marker key={point.id.toString()} longitude={point.coordinates.longitude} latitude={point.coordinates.latitude} onClick={e => {
                  e.originalEvent.stopPropagation();
                  setPopupInfo(point);
                }} />))}
              {popupInfo && (
               <Popup
                 longitude={popupInfo.coordinates.longitude}
                 latitude={popupInfo.coordinates.latitude}
                 onClose={() => setPopupInfo(null)}
                 closeButton={false}
                 closeOnClick={true}
                 style={{
                   color: "#000000",
                 }}
               >
                 <div>
                   <Typography variant="h6" component="div">
                     {popupInfo.name}
                   </Typography>
                     {popupInfo.description}
                   <br/>
                   <b>{t("address")}:</b> {popupInfo.address}<br/>
                   <b>{t("contact_name")}:</b> {popupInfo.contactName}<br/>
                   <b>{t("phone_number")}:</b> {popupInfo.phoneNumber}<br/>
                   <b>{t("opening_hours")}:</b> {popupInfo.openingHours}<br/>
                </div>
              </Popup>)}
            </MapComponent>
          </Box>
        </Main>
      </MapProvider>
    </Layout>
  );
}
