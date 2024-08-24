import { useState, useRef, MouseEvent } from "react";
import { Badge } from "primereact/badge";
import { OverlayPanel } from "primereact/overlaypanel";
import { formatDistanceToNow } from "date-fns";

interface Alert {
  id: number;
  category: string;
  timestamp: Date;
  title: string;
  message: string;
}

function NotificationIcon() {
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

  const handleBellClick = (e: MouseEvent<HTMLElement>) => {
    op.current?.toggle(e);
  };

  return (
    <div className="relative flex items-center group">
      {alerts.length > 0 && (
        <Badge
          value={alerts.length}
          severity="danger"
          className="absolute -top-2 -right-2"
          style={{
            fontSize: "0.6rem",
            width: "1rem",
            height: "1rem",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 3px rgba(0,0,0,0.3)",
            zIndex: 10,
          }}
        />
      )}
      <i
        className="fas fa-bell text-2xl text-gray-700 hover:text-gray-900 transition-transform duration-300 transform hover:scale-110 cursor-pointer relative"
        onClick={handleBellClick}
      ></i>
      <OverlayPanel
        ref={op}
        dismissable
        style={{
          width: "350px",
          padding: "0",
          position: "absolute",
          left: "60px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ position: "relative" }}>
          {alerts.slice(0, showMore ? alerts.length : 3).map((alert) => (
            <div
              key={alert.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #e0e0e0",
                position: "relative",
              }}
            >
              <div
                style={{
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                  transition: "background-color 0.3s ease",
                }}
              >
                <b style={{ color: "#333" }}>{alert.title}</b>
                <p
                  style={{
                    margin: "0.5rem 0 0",
                    color: "#555",
                    fontSize: "0.9rem",
                    display: "block",
                  }}
                >
                  {expandedAlert === alert.id
                    ? alert.message
                    : `${alert.message.slice(0, 25)}${
                        alert.message.length > 20 ? "..." : ""
                      }`}
                  <span
                    onClick={() => handleShowMoreClick(alert.id)}
                    style={{
                      color: "#007bff",
                      cursor: "pointer",
                      marginLeft: "0.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    {expandedAlert === alert.id ? "Show Less" : "Show More"}
                  </span>
                </p>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#777",
                    marginTop: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>{alert.category}</div>
                  <div>
                    {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                  </div>
                </div>
              </div>
              <i
                className="fas fa-times"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                  color: "#999",
                }}
                onClick={() => handleRemoveAlert(alert.id)}
              ></i>
            </div>
          ))}
          {alerts.length > 3 && (
            <div
              className="m-0"
              style={{
                textAlign: "center",
                cursor: "pointer",
                padding: "10px",
                borderTop: "1px solid #e0e0e0",
              }}
              onClick={() => setShowMore(!showMore)}
            >
              <b style={{ color: "#333" }}>
                {showMore ? "Show Less" : "Show More"}
              </b>
            </div>
          )}
        </div>
      </OverlayPanel>
    </div>
  );
}

export default NotificationIcon;
