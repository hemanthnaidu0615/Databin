import React from 'react';
import './style.css';

interface FlowChartNode {
  id: string;
  label: string;
  children?: FlowChartNode[];
}

const FlowChart = ({ data }: { data: FlowChartNode[] }) => {
  const renderNode = (node: FlowChartNode) => (
    <div className="node-container" key={node.id} data-id={node.id}>
      <div className="node">{node.label}</div>
      {node.children && (
        <div className="children-container">
          {node.children.map(child => (
            <div className="child-container" key={child.id}>
              {renderNode(child)}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flowchart-container">
      {data.map(node => renderNode(node))}
    </div>
  );
};

export default FlowChart;
