import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";

interface Alert {
  id: number;
  category: string;
  timestamp: Date;
  title: string;
  message: string;
}

interface NotificationIconProps {
  ref?: React.Ref<OverlayPanel>;
}

const formatRelativeTime = (timestamp: Date) => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - new Date(timestamp).getTime()) / 60000); // Difference in minutes
  
  if (diff < 60) return `${diff}min ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}hr ago`;
  return `${Math.floor(diff / 1440)}day ago`;
};

const NotificationIcon = forwardRef<OverlayPanel, NotificationIconProps>((_, ref) => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      category: "Alert",
      timestamp: new Date(Date.now() - 28 * 60 * 1000),
      title: "Unauthorized Data Access Alert",
      message:
        "Unusual Activity Detected! User JohnDoe accessed sensitive data outside of normal business hours. Please review this activity immediately to ensure data integrity.",
    },
    {
      id: 2,
      category: "Warning",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      title: "Sudden Data Spike Alert",
      message:
        "Potential Anomaly! A significant spike in data entries by JaneSmith has been detected in the last 15 minutes. This sudden influx may indicate an issue or unauthorized data manipulation.",
    },
    {
      id: 3,
      category: "Critical Alert",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      title: "Data Deletion Alert",
      message:
        "Suspicious Deletion! User MikeJohnson deleted multiple records from the database. This action deviates from standard operation procedures. Immediate investigation is recommended.",
    },
  ]);

  const [expandedAlert, setExpandedAlert] = useState<number | null>(null);
  const [showMore, setShowMore] = useState<boolean>(false);
  const op = useRef<OverlayPanel>(null);

  useImperativeHandle(ref, () => op.current!);

  const handleShowMoreClick = (alertId: number) => {
    setExpandedAlert(expandedAlert === alertId ? null : alertId);
  };

  const handleRemoveAlert = (alertId: number) => {
    const updatedAlerts = alerts.filter((alert) => alert.id !== alertId);
    setAlerts(updatedAlerts);
    if (updatedAlerts.length === 0) {
      op.current?.hide();
    }
  };

  return (
    <OverlayPanel ref={op} dismissable>
      <div style={{ width: "350px", padding: "0", boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}>
        <div style={{ position: "relative" }}>
          {alerts.slice(0, showMore ? alerts.length : 3).map((alert) => (
            <div
              key={alert.id}
              style={{ padding: "10px", borderBottom: "1px solid #e0e0e0", position: "relative" }}
            >
              <div
                style={{ padding: "0.5rem", borderRadius: "0.25rem", transition: "background-color 0.3s ease" }}
              >
                <b style={{ color: "#333" }}>{alert.title}</b>
                <p
                  style={{ margin: "0.5rem 0 0", color: "#555", fontSize: "0.9rem", display: "block" }}
                >
                  {expandedAlert === alert.id
                    ? alert.message
                    : `${alert.message.slice(0, 25)}${alert.message.length > 25 ? "..." : ""}`}
                  <span
                    onClick={() => handleShowMoreClick(alert.id)}
                    style={{ color: "#007bff", cursor: "pointer", marginLeft: "0.5rem", fontSize: "0.9rem" }}
                  >
                    {expandedAlert === alert.id ? "Show Less" : "Show More"}
                  </span>
                </p>
                <div
                  style={{ fontSize: "0.8rem", color: "#777", marginTop: "0.5rem", display: "flex", justifyContent: "space-between" }}
                >
                  <div>{alert.category}</div>
                  <div>{formatRelativeTime(alert.timestamp)}</div>
                </div>
              </div>
              <i
                className="pi pi-times"
                style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer", color: "#999" }}
                onClick={() => handleRemoveAlert(alert.id)}
              ></i>
            </div>
          ))}
          {alerts.length > 3 && (
            <div
              className="m-0"
              style={{ textAlign: "center", cursor: "pointer", padding: "10px", borderTop: "1px solid #e0e0e0" }}
              onClick={() => setShowMore(!showMore)}
            >
              <b style={{ color: "#333" }}>
                {showMore ? "Show Less" : "Show More"}
              </b>
            </div>
          )}
        </div>
      </div>
    </OverlayPanel>
  );
});

export default NotificationIcon;
