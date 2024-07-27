import { OrganizationChart } from "primereact/organizationchart";
import { TreeNode } from "primereact/treenode";
import { useState } from "react";

interface OrgChartProps {
  value: TreeNode[];
  zoom: number;
  layout: string;
}

export default function OrgChart({ value, zoom, layout }: OrgChartProps) {
  const [selection, setSelection] = useState<TreeNode[]>([]);

  // Apply class based on layout
  const chartClass = layout === "vertical" ? "vertical-layout" : "horizontal-layout";

  return (
    <div
      className={`org-chart horizontal`}
      style={{
        transform: `scale(${zoom / 50})`,
        transformOrigin: "top left",
        display: "inline-block",
        overflow: "auto", // Ensure overflow handling
        maxHeight: "calc(100vh - 200px)" // Adjust based on your layout needs
      }}
    >
      <OrganizationChart
        value={value}
        selectionMode="multiple"
        selection={selection}
        onSelectionChange={(e) => setSelection(e.data as TreeNode[])}
        className="p-organizationchart"
      />
    </div>
  );
}
