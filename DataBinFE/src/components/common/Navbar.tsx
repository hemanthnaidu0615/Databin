import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { ContextMenu } from "primereact/contextmenu";
import logo from "../../images/logo.png";
import "primeicons/primeicons.css";
import { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Calendar } from "primereact/calendar";
import { setDates } from "../../store/dateRangeSlice";
import { setEnterpriseKey } from "../../store/enterpriseSlice";
import authFetch from "../../axios";

export const Navbar = () => {
  const [datesT, setDatesT] = useState<Date[]>([
    new Date("2024-03-15"),
    new Date("2024-03-16"),
  ]);
  const [enterpriseKeys, setEnterpriseKeys] = useState<string[]>([]);
  const [jsonEnterpriseKeys, setJsonEnterpriseKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Define the routes for each dropdown
  const databaseDropdownRoutes = [
    "/home-dashboard",
    "/timeseries",
    "/sales/sales-by-region", // Add other routes as needed
  ];

  const jsonDropdownRoutes = [
    "/sales-dashboard",
  ];

  const hideCalendarRoutes = [
    "/sales/analysis",
    "/home-dashboard",
    "/timeseries",
    // Add additional routes where the calendar should be hidden
  ];

  const hideCalendar = hideCalendarRoutes.includes(location.pathname);
  const { username } = useSelector((store: any) => store.user);
  const enterpriseKey = useSelector((store: any) => store.enterprise.key);
  const cm = useRef<any>(null);
  const items = [
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        localStorage.removeItem("accessToken");
        navigate("/");
      },
    },
  ];

  useEffect(() => {
    const fetchEnterpriseKeys = async () => {
      try {
        const response = await authFetch('http://localhost:3000/v2/tables/enterprise-keys');
        console.log(response.data);
        setEnterpriseKeys(response.data);
      } catch (error) {
        console.error('Error fetching enterprise keys:', error);
      }
    };

    const fetchJsonEnterpriseKeys = async () => {
      try {
        const response = await fetch('/path/to/your/json/file.json'); // Update with actual path
        const data = await response.json();
        console.log(data);
        setJsonEnterpriseKeys(data);
      } catch (error) {
        console.error('Error fetching JSON enterprise keys:', error);
      }
    };

    if (jsonDropdownRoutes.includes(location.pathname)) {
      fetchJsonEnterpriseKeys();
    } else if (databaseDropdownRoutes.includes(location.pathname)) {
      fetchEnterpriseKeys();
    }
  }, [location.pathname]);

  function handleDateChange(newDates: any) {
    setDatesT(newDates);
    dispatch(setDates(newDates));
  }

  function handleEnterpriseChange(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log("Selected enterprise key:", event.target.value);
    dispatch(setEnterpriseKey(event.target.value));
  }

  const start = (
    <div className="flex align-items-center items-center gap-1 divide-x divide-gray-400">
      <div className="flex mr-1 items-center">
        <img alt="logo" src={logo} className="h-10 mr-2" />
        <h3 className="font-bold text-lg">
          Data
          <span className="text-violet-800"> Bin</span>
        </h3>
      </div>
      <p className="pl-2">Welcome, {username}</p>
    </div>
  );

  const end = (
    <div className="flex items-center gap-2">
      <div>
        {!hideCalendar && (
          <Calendar
            value={datesT}
            selectionMode="range"
            onChange={(e) => handleDateChange(e.value as any)}
            dateFormat="yy-mm-dd"
            className="h-6 m-0"
            inputStyle={{ fontSize: "12px" }}
            pt={{
              panel: { className: "h-[270px] w-[250px] p-0" },
              root: { className: "p-0" },
              day: { className: "text-xs w-10 p-0" },
              dayLabel: { className: "h-5 w-5 my-1" },
              weekDay: { className: "text-sm" },
              header: { className: "text-xs" },
              title: { className: "text-xs" },
            }}
            hideOnDateTimeSelect
            hideOnRangeSelection
            showIcon
          />
        )}
      </div>
      <div className="flex items-center gap-2">
        {jsonDropdownRoutes.includes(location.pathname) ? (
          <div className="flex items-center gap-2">
            <label htmlFor="jsonEnterpriseKey" className="mr-2">JSON Enterprise Key:</label>
            <select
              id="jsonEnterpriseKey"
              value={enterpriseKey}
              onChange={handleEnterpriseChange}
              className="p-inputtext p-component"
            >
              {jsonEnterpriseKeys.map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <label htmlFor="databaseEnterpriseKey" className="mr-2">Database Enterprise Key:</label>
            <select
              id="databaseEnterpriseKey"
              value={enterpriseKey}
              onChange={handleEnterpriseChange}
              className="p-inputtext p-component"
            >
              {enterpriseKeys.map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <Link to="/settings">
        <Button
          icon="pi pi-cog"
          className="custom-icon-size"
          style={{
            color: "black",
            background: "none",
            border: "none",
          }}
        />
      </Link>
      <div>
        <ContextMenu model={items} ref={cm} breakpoint="767px" />
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          shape="circle"
          onContextMenu={(e) => cm.current!.show(e)}
          onClick={(e) => cm.current!.show(e)}
          className="custom-icon-size"
        />
      </div>
    </div>
  );

  return (
    <div className="card w-full">
      <Menubar start={start} end={end} className="border-none p-2" />
    </div>
  );
};
