import { TieredMenu } from "primereact/tieredmenu";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import { RootState } from '../../store/store';

export const SidebarComp = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("");
  const router = useLocation();
  const userEmail = useSelector((state: RootState) => state.user.useremail);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');

  useEffect(() => {
    setCurrentTab(router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    if (userEmail && !userRole) {  
      fetch(`http://localhost:3000/v2/tables/user-role?email=${userEmail}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.role) {
            const role = data.role.toLowerCase();
            setUserRole(role);
            localStorage.setItem('userRole', role); 
          }
        })
        .catch((error) => {
          console.error('Error fetching user role:', error);
        });
    }

  }, [userEmail, userRole]);


  const itemRenderer = (item: any) => {
    const isActive = currentTab === item.path;
    return (
      <a
        className={`sidebar-item flex items-center justify-center text-center px-2 py-6 m-1 text-purple-800  border-r-4 border-transparent ${
          isActive && "border-r-purple-800 text-white bg-purple-400"
        } hover:text-white hover:border-r-4 hover:border-r-purple-800 hover:bg-purple-400 cursor-pointer active:border-r-purple-800 `}
        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} 
      >
        <span className={`${item.icon} text-xl font-semibold`} />
        <span className="sidebar-item-label my-0.5 pt-1 delay-200" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.label}
        </span>
      </a>
    );
  };

  const itemRenderer2 = (item: any) => {
    const isActive = currentTab === item.path;
    return (
      <a
        className={`flex items-center justify-center p-5 m-1 text-slate-600 cursor-pointer ${
          isActive && "border-r-purple-800 text-white bg-purple-400"
        } hover:text-white hover:border-r-4 hover:border-r-purple-800 hover:bg-purple-400`}
        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} 
      >
        <span className="w-fit" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.label}
        </span>
      </a>
    );
  };

  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-th-large",
      command: () => {
        navigate("/home-dashboard");
      },
      path: "/home-dashboard",
      template: itemRenderer,
    },
    {
      label: "Sales",
      icon: "pi pi-chart-line",
      path: "/sales",
      template: itemRenderer,
      items: [
        {
          label: "Sales Dashboard",
          command: () => {
            navigate("/sales/dashboard");
          },
          path: "/sales/dashboard",
          template: itemRenderer2,
        },
        {
          label: "Sales By Region",
          command: () => {
            navigate("/sales/sales-by-region");
          },
          path: "/sales/sales-by-region",
          template: itemRenderer2,
        },
        {
          label: "Sales Flow",
          command: () => {
            navigate("/sales/flow");
          },
          path: "/sales/flow",
          template: itemRenderer2,
        },
        {
          label: "Sales Analysis",
          command: () => {
            navigate("/sales/analysis");
          },
          path: "/sales/analysis",
          template: itemRenderer2,
        },
      ],
    },
    {
      label: "Returns",
      icon: "pi pi-replay",
      command: () => {
        navigate("/returns");
      },
      path: "/returns",
      template: itemRenderer,
    },
    {
      label: "Timeseries",
      icon: "pi pi-history",
      command: () => {
        navigate("/timeseries");
      },
      path: "/timeseries",
      template: itemRenderer,
    },
    ...(userRole === 'admin' || userRole === 'manager'
      ? [
          {
            label: 'User Management',
            icon: 'pi pi-users',
            command: () => {
              navigate('/user-management');
            },
            path: '/user-management',
            template: itemRenderer,
          },
        ]
      : []),
  ];

  return (
    <div className="min-w-[5%] hover:min-w-[9%] transition-all duration-300 sidebar-container">
      <TieredMenu
        model={items}
        breakpoint="767px"
        className="w-full h-full text-xs"
      />
    </div>
  );
};
