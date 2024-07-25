import { useEffect, useState } from "react";
import { abbrvalue } from "../../helpers/helpers";

export const DeliveriesCard = ({ deliveries }: any) => {
  const [deliveryDetails, setDeliveryDetails] = useState([]);

  const colors = ["bg-green-400", "bg-indigo-400", "bg-orange-400"];

  useEffect(() => {
    setDeliveryDetails(
      deliveries?.map((d: any, i: number) => {
        return {
          label: d?.status_group,
          value: abbrvalue(d?.total_orders),
          color: colors[i],
        };
      })
    );
  }, []);

  return (
    <div className="h-full bg-white flex flex-col justify-center">
      <div className="flex items-center p-2">
        <h3 className="font-bold ">Deliveries </h3>
        <span className="text-xs text-black font-light "> - Last 7 days</span>
      </div>

      <div className="flex-1 flex items-center">
        {deliveryDetails.map((item: any) => (
          <div
            key={item.label}
            className="flex-1 p-5 flex flex-col items-center justify-between"
          >
            <p className="mb-1 text-lg font-semibold">{item.label}</p>
            <div
              className={`w-full flex-1 text-3xl text-white flex justify-center items-center rounded-xl min-h-14 min-w-20 ${item.color}`}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
