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
import { RootState } from '../../store/store';

export const Navbar = () => {
  const [datesT, setDatesT] = useState<Date[]>([
    new Date("2024-03-15"),
    new Date("2024-03-16"),
  ]);
  const [enterpriseKeys, setEnterpriseKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [userRole, setUserRole] = useState('');
  const userEmail = useSelector((state: RootState) => state.user.useremail);

  const hideCalendarRoutes = [
    "/home-dashboard",
    "/timeseries",
    "/sales/analysis",
    "/user-management"
  ];

  const hideDropdownRoutes = [
    "/home-dashboard",
    "/sales/flow",
    "/sales/analysis",
    "/returns",
    "/timeseries",
    "/user-management",
    "/sales/dashboard"
  ];

  const hideCalendar = hideCalendarRoutes.includes(location.pathname);
  const hideDropdown = hideDropdownRoutes.includes(location.pathname);
  const { username } = useSelector((store: any) => store.user);
  const enterpriseKey = useSelector((store: any) => store.enterprise.key);
  const cm = useRef<any>(null);
  const items = [
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem('userRole');
        setUserRole('');
        navigate("/");
      },
    },
  ];

  useEffect(() => {
    const fetchEnterpriseKeys = async () => {
      try {
        const response = await authFetch(
          "/tables/enterprise-keys"
        );
        console.log(response.data);
        setEnterpriseKeys(response.data);
      } catch (error) {
        console.error("Error fetching enterprise keys:", error);
      }
    };

    fetchEnterpriseKeys();
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetch(`/tables/user-role?email=${userEmail}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.role) {
            setUserRole(data.role.toLowerCase());
          }
        })
        .catch((error) => {
          console.error('Error fetching user role:', error);
        });
    }
  }, [userEmail]);

  function handleDateChange(newDates: any) {
    setDatesT(newDates);
    dispatch(setDates(newDates));
  }

  useEffect(() => {
    console.log("Selected enterprise key:", enterpriseKey);
  }, [enterpriseKeys, enterpriseKey]);

  function handleEnterpriseChange(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log("Selected enterprise key:", event.target.value);
    dispatch(setEnterpriseKey(event.target.value));
  }
  const getInitials = (name: string) => {
    if (!name) return ""; 
    const nameArray = name.split(" ").filter(Boolean);
    const initials = nameArray.map(n => n[0].toUpperCase()).join("");
    return initials;
  };
  

  const start = (
    <div className="flex align-items-center items-center gap-1 divide-x divide-gray-400">
      <div className="flex mr-1 items-center">
        <img alt="logo" src={logo} className="h-10 mr-2" />
        <h3 className="font-bold text-2xl">
          Data
          <span className="text-violet-800"> Bin</span>
        </h3>
      </div>
      <p className="pl-2">Hi, Welcome, {username}</p>
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
        {!hideDropdown && (
          <>
            
            <select
              id="enterpriseKey"
              value={enterpriseKey}
              onChange={handleEnterpriseChange}
              className="p-inputtext p-component ml-2 h-12 text-sm"
            >
              {enterpriseKeys.map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </>
        )}
      </div>
      {userRole === 'admin' || userRole === 'manager' ? (
        <Link to="/user-management">
          <Button
            icon="pi pi-cog"
            className="custom-icon-size"
            style={{
              color: "black",
              background: "none",
              border: "none",
            }}
            onClick={(e) => e.currentTarget.blur()}
          />
        </Link>
      ) : (
        ""
      )}
      <div>
        <ContextMenu model={items} ref={cm} breakpoint="767px" />
        <Avatar
          label={getInitials(username)}
          shape="circle"
          onContextMenu={(e) => cm.current!.show(e)}
          onClick={(e) => cm.current!.show(e)}
          className="custom-icon-size"
          style={{ backgroundColor: "#6A1B9A", color: "#FFFFFF" }}
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
