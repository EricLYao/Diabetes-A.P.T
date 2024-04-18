// set the dimensions and margins of the graph
const multilineMargin = {
    top: 0,
    right: 100,
    bottom: 75,
    left: 100,
};
const multilineWidth = 1000
const multilineHeight = 600
  
  // append the svg object to the body of the page
const multilineSvg = d3
    .select('#multiline')
    .append('svg')
    .attr('width', multilineWidth + multilineMargin.left + multilineMargin.right - 50)
    .attr('height', multilineHeight + multilineMargin.top + multilineMargin.bottom)
    .append('g')
    .attr('transform',`translate(${multilineMargin.left},${multilineMargin.top})`, );
  
  // Parse the Data
d3.csv("./finalprojdata/linechartdata.csv").then((data) => {
    // X axis
    const multilineX = d3
        .scaleBand()
        .range([0, multilineWidth])
        .domain(data.map((d) => d.Year))
        .padding(0.5);
    multilineSvg
        .append('g')
        .attr('transform', `translate(0,${multilineHeight})`)
        .call(d3.axisBottom(multilineX))
        .selectAll('text')
        .style('text-anchor', 'middle');
  
    // Y axis
    const multilineY = d3
        .scaleLinear()
        .domain([0, 23])
        .range([multilineHeight, 0]);
  
    multilineSvg.append('g').call(d3.axisLeft(multilineY));
  
    // y label
    multilineSvg
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -multilineHeight / 2)
        .style('text-anchor', 'middle')
        .text('Percentages Diagnosed');
  
    multilineSvg
        .selectAll('.multilinePoints18to44')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'multilinePoints18to44')
        .attr('cx', (d) => multilineX(d.Year) + multilineX.bandwidth() / 2,)
        .attr('cy', (d) => multilineY(d['18to44Percentage']))
        .attr('r', 2)
        .attr('fill', '#e41a1c');
  
    const multilineLine18to44 = d3
        .line()
        .x((d) =>multilineX(d.Year) + multilineX.bandwidth() / 2)
        .y((d) => multilineY(d['18to44Percentage']));
  
    multilineSvg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#e41a1c')
        .attr('stroke-width', 4)
        .attr('d', multilineLine18to44);
  
    multilineSvg
        .selectAll('.multilinePoints45to64')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'multilinePoints45to64')
        .attr('cx', (d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .attr('cy', (d) => multilineY(d['45to64Percentage']))
        .attr('r', 2)
        .attr('fill', '#377eb8');
  
    const multilineLine45to64 = d3
        .line()
        .x((d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .y((d) => multilineY(d['45to64Percentage']));
  
    multilineSvg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#377eb8')
        .attr('stroke-width', 4)
        .attr('d', multilineLine45to64);
  
    multilineSvg
        .selectAll('.multilinePoints65to74')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'multilinePoints65to74')
        .attr('cx', (d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .attr('cy', (d) => multilineY(d['65to74Percentage']))
        .attr('r', 2)
        .attr('fill', '#4daf4a');
  
    const multilineLine65to74 = d3
        .line()
        .x((d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .y((d) => multilineY(d['65to74Percentage']));
  
    multilineSvg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#4daf4a')
        .attr('stroke-width', 4)
        .attr('d', multilineLine65to74);
  
    multilineSvg
        .selectAll('.multilinePoints75')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'multilinePoints75')
        .attr('cx', (d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .attr('cy', (d) => multilineY(d['75Percentage']))
        .attr('r', 2)
        .attr('fill', '#984ea3');
  
    const multilineLine75 = d3
        .line()
        .x((d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .y((d) => multilineY(d['75Percentage']));
  
    multilineSvg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#984ea3')
        .attr('stroke-width', 4)
        .attr('d', multilineLine75);

    multilineSvg
        .selectAll('.multilinePointsTotal')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'multilinePointsTotal')
        .attr('cx', (d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .attr('cy', (d) => multilineY(d['TotalPercentageWorld']))
        .attr('r', 2)
        .attr('fill', '#ff7f00');
  
    const multilineLineTotal = d3
        .line()
        .x((d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .y((d) => multilineY(d['TotalPercentageWorld']));
  
    multilineSvg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#ff7f00')
        .attr('stroke-width', 4)
        .attr('d', multilineLineTotal);
});