import { useEffect, useState } from "react";
import { CardLinechart } from "../components/dashboard/CardLinechart";
import { DeliveriesCard } from "../components/dashboard/DeliveriesCard";
import { HalfpieCard } from "../components/dashboard/HalfpieCard";
import { MapCard } from "../components/dashboard/MapCard";
import authFetch from "../axios";
import { InventoryCard } from "../components/dashboard/InventoryCard";
import { ProgressSpinner } from "primereact/progressspinner";

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    authFetch.get("/sales/GetDashboardData").then((res) => {
      console.log(res.data);
      setDashboardData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col dashboard-container" >
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <ProgressSpinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col" style={{overflowY:'hidden'}}>
            <div className="flex flex-1">
              <div className="flex-1 m-2 flex flex-col shadow-lg shadow-slate-300 rounded-lg">
                <CardLinechart dashboardData={dashboardData} />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex-1 m-2 shadow-lg shadow-slate-300 rounded-lg">
                  <DeliveriesCard deliveries={dashboardData?.deliveries} />
                </div>
                <div className="flex-1 m-2 shadow-slate-300 shadow-lg rounded-lg">
                  <HalfpieCard trendYOY={dashboardData?.trendYOY} />
                </div>
              </div>
            </div>

            <div className="flex flex-1">
              <div className="flex-1 m-2 flex flex-col shadow-lg shadow-slate-300 rounded-lg">
                <MapCard />
              </div>
              <div className="flex-1 flex flex-col">
                <InventoryCard dashboardData={dashboardData} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
