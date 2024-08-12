import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './style.css'; // Import specific CSS for d3.js component

interface FlowChartNode {
  id: string;
  label: string;
  children?: FlowChartNode[];
  zoom?: number; 
}



const HorizontalComponent = ({ data }: { data: FlowChartNode[] }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const containerWidth = svgRef.current.parentElement?.clientWidth || 800;
    const containerHeight = svgRef.current.parentElement?.clientHeight || 600;
    const padding = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--padding'), 10) || 200;

    // Create the tree layout
    const root = d3.hierarchy(data[0], d => d.children);
    const treeLayout = d3.tree<d3.HierarchyNode<FlowChartNode>>()
      .size([containerHeight * 2, containerWidth - padding])
      .separation((a, b) => {
        if (a.parent === b.parent) {
          return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sibling-spacing')) || 1.5;
        } else {
          return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--level-spacing')) || 2;
        }
      });

    const nodes = treeLayout(root);

    // Calculate required width and height for centering
    const maxX = Math.max(...nodes.descendants().map(d => d.x + 120)); // Adjust for padding
    const maxY = Math.max(...nodes.descendants().map(d => d.y));

    // Set SVG dimensions based on the content size
    const svgWidth = Math.max(containerWidth, maxY + padding);
    const svgHeight = Math.max(containerHeight, maxX + padding);

    // Apply dimensions to SVG
    svg.attr("width", svgWidth)
       .attr("height", svgHeight);

    // Center the tree within the SVG
    const translateX = (svgWidth - maxY - padding) / 2;
    const translateY = (svgHeight - maxX - padding) / 2;

    // Draw links as straight branches
    svg.selectAll(".d3-link")
      .data(nodes.links())
      .enter().append("path")
      .attr("class", "d3-link")
      .attr("d", d => {
        const sourceX = d.source.y + padding / 2 + translateX;
        const sourceY = d.source.x + padding / 2 + translateY;
        const targetX = d.target.y + padding / 2 + translateX;
        const targetY = d.target.x + padding / 2 + translateY;
        
        if (d.source.children && d.source.children.length > 1) {
          // Draw horizontal line and vertical branches
          const midX = (d.source.y + d.target.y) / 2; // Midpoint for horizontal line

          return `M${sourceX},${sourceY} H${midX} V${targetY} H${targetX}`;
        } else {
          // Direct connection
          return `M${sourceX},${sourceY} H${targetX} V${targetY}`;
        }
      })
      .attr("fill", "none")
      .attr("stroke", "#999")
      .attr("stroke-width", 2);

    // Draw nodes
    svg.selectAll(".d3-node")
      .data(nodes.descendants())
      .enter().append("g")
      .attr("class", "d3-node")
      .attr("transform", d => `translate(${d.y + padding / 2 + translateX},${d.x + padding / 2 + translateY})`)
      .each(function(d) {
        const nodeWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--node-width')) || 180;
        const nodeHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--node-height')) || 60;
        
        d3.select(this).append("rect")
          .attr("class", "d3-node-rect")
          .attr("width", nodeWidth)
          .attr("height", nodeHeight)
          .attr("rx", getComputedStyle(document.documentElement).getPropertyValue('--node-border-radius') || '15px')
          .attr("x", -nodeWidth / 2)  // Center the rectangle horizontally
          .attr("y", -nodeHeight / 2); // Center the rectangle vertically

        d3.select(this).append("text")
          .attr("class", "d3-node-label")
          .attr("dy", "0.35em")
          .attr("x", 0)
          .style("text-anchor", "middle")
          .text(d.data.label);
      });

  }, [data]);

  return (
    <div className="d3-flowchart-container">
      <svg ref={svgRef} className="d3-flowchart-svg"></svg>
    </div>
  );
};

export default HorizontalComponent;
