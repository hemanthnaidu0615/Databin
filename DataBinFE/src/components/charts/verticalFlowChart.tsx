import React, { useState } from "react";
import './style.css'; // Ensure to use a new CSS file for vertical flowchart styling

interface FlowChartNode {
  id: string;
  label: string;
  children?: FlowChartNode[];
}

const VerticalFlowChart = ({ data }: { data: FlowChartNode[] }) => {
  const [selectedNodes, setSelectedNodes] = useState<FlowChartNode[]>([]);

  const handleClick = (node: FlowChartNode) => {
    setSelectedNodes((prevNodes) => {
      const existingIndex = prevNodes.findIndex((n) => n.id === node.id);
      if (existingIndex !== -1) {
        return prevNodes.slice(0, existingIndex + 1); // Remove nodes to the right of the clicked node
      } else {
        return [...prevNodes, node]; // Add the clicked node
      }
    });
  };

  const renderNode = (node: FlowChartNode) => (
    <div className="node-container" key={node.id} onClick={() => handleClick(node)}>
      <div className="node">{node.label}</div>
    </div>
  );

  const renderChildren = (node: FlowChartNode) => (
    <div className="children-container">
      {node.children && (
        <>
          <div className="connector-line"></div>
          <div className="children">
            {node.children.map((child) => (
              <div className="child-container" key={child.id}>
                {renderNode(child)}
                {renderChildren(child)}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="flowchart-container">
      {data.map((node) => (
        <div key={node.id} className="node-group">
          {renderNode(node)}
          {renderChildren(node)}
        </div>
      ))}
    </div>
  );
};

export default VerticalFlowChart;
