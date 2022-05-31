import React, { FunctionComponent } from "react";
import { Route, Routes } from "react-router-dom";
import { RegisterDriverPage } from "../view/pages/Driver/RegisterDriverPage";
import { RegisterVehiclePage } from "../view/pages/Vehicle/RegisterVehiclePage";
import { RegisterCompanyPage } from "../view/pages/Company/RegisterCompanyPage";
import { RegisterItineraryPage } from "../view/pages/Itinerary/RegisterItineraryPage";
import { RegisterFTPage } from "../view/pages/FT/RegisterFTPage";
import { RegisterVinculoPage } from "../view/pages/Vinculo/RegisterVinculoPage";
import { DriverPage } from "../view/pages/Driver/DriverPage";
import { VehiclePage } from "../view/pages/Vehicle/VehiclePage";
import { CompanyPage } from "../view/pages/Company/CompanyPage";
import App from "../App";
import { ItineraryPage } from "../view/pages/Itinerary/ItineraryPage";
import { FTPage } from "../view/pages/FT/FTPage";
import { VinculoPage } from "../view/pages/Vinculo/VinculoPage";
import { SignUpPage } from "../view/pages/SignUp/SignUpPage";
import { HomePageRouter } from "./HomePageRouter";
import { AdminDashboard } from "../view/pages/AdminDashboard/AdminDashboard";

type Props = {};

export const AppRoutes: FunctionComponent<Props> = ({}) => {
  return (
    <Routes>
      <Route path="/driver/register" element={<RegisterDriverPage />} />
      <Route path="/driver" element={<DriverPage />} />
      <Route path="/vehicle/register" element={<RegisterVehiclePage />} />
      <Route path="/vehicle" element={<VehiclePage />} />
      <Route path="/company/register" element={<RegisterCompanyPage />} />
      <Route path="/company" element={<CompanyPage />} />
      <Route path="/itinerary/register" element={<RegisterItineraryPage />} />
      <Route path="/itinerary" element={<ItineraryPage />} />
      <Route path="/workscale" element={<FTPage />} />
      <Route path="/workscale/register" element={<RegisterFTPage />} />
      <Route path="/vinculo" element={<VinculoPage />} />
      <Route path="/vinculo/register" element={<RegisterVinculoPage />} />
      <Route path="/adicionarusuario" element={<SignUpPage />} />
      <Route path="/adminDashboard" element={<AdminDashboard />} />
      <Route path="*" element={<HomePageRouter />}></Route>
    </Routes>
  );
};
