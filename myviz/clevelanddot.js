// Define the dimensions and margins for the dot plot
const dotPlotMargin = {
    top: 50,
    right: 100,
    bottom: 100,
    left: 150,
};
const dotPlotWidth = 800;
const dotPlotHeight = 600;

const dotPlotYear =  "2019"

// Append the SVG object to the designated element in the HTML
const dotPlotSvg = d3
    .select('#clevelanddot')
    .append('svg')
    .attr('width', dotPlotWidth + dotPlotMargin.left + dotPlotMargin.right)
    .attr('height', dotPlotHeight + dotPlotMargin.top + dotPlotMargin.bottom)
    .append('g')
    .attr('transform', `translate(${dotPlotMargin.left},${dotPlotMargin.top})`);

// Load the data from dotplotdata.csv
d3.csv("./finalprojdata/dotplotdata.csv").then((data) => {

    const dotplotCleanedData = data.filter(
        (d) =>
            d.State !== 'Guam' &&
            d.State !== 'Virgin Islands of the U.S.' &&
            d.State !== 'District of Colombia' &&
            d.State !== 'Puerto Rico' &&
            d.State !== 'Median of States' &&
            d.TotalPercentage !== "No Data" &&
            d.MalePercentage !== "No Data" && 
            d.FemalePercentage !== "No Data",
      );
    // Filter the data for the year 2020
    const dotplotfilteredData = dotplotCleanedData.filter(d => d.Year === dotPlotYear);

    // Sort the filtered data by TotalPercentage in descending order
    dotplotfilteredData.sort((a, b) => b.TotalPercentage - a.TotalPercentage);

    // Take only the top 10 states
    const topStates = dotplotfilteredData.slice(0, 10);

    // Define the scales for the axes
    const xScale = d3
        .scaleLinear()
        .domain([d3.min(topStates, d => +d.TotalPercentage) - 2, d3.max(topStates, d => +d.TotalPercentage) + 2])
        .range([0, dotPlotWidth]);

    const yScale = d3
        .scaleBand()
        .domain(topStates.map(d => d.State))
        .range([0, dotPlotHeight])
        .padding(0.1);

    // Add the x-axis
    dotPlotSvg
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${dotPlotHeight})`)
        .call(d3.axisBottom(xScale));

    // Add the y-axis
    dotPlotSvg
        .append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(yScale));
    
    // Add x-axis label
    dotPlotSvg
        .append('text')
        .attr('class', 'x-axis-label')
        .attr('x', dotPlotWidth / 2)
        .attr('y', dotPlotHeight + 50)
        .style('text-anchor', 'middle')
        .text('Percentage of Diabetics');

    dotPlotSvg
        .selectAll('.line')
        .data(topStates)
        .enter()
        .append('line')
        .attr('class', 'line')
        .attr('x1', d => xScale(+d.MalePercentage))
        .attr('y1', d => yScale(d.State) + yScale.bandwidth() / 2)
        .attr('x2', d => xScale(+d.FemalePercentage))
        .attr('y2', d => yScale(d.State) + yScale.bandwidth() / 2)
        .attr('stroke', 'grey')
        .attr('stroke-width', 2);

    dotPlotSvg
        .selectAll('.totaldot')
        .data(topStates)
        .enter()
        .append('circle')
        .attr('class', 'totaldot')
        .attr('cx', d => xScale(+d.TotalPercentage))
        .attr('cy', d => yScale(d.State) + yScale.bandwidth() / 2)
        .attr('r', 5)
        .attr('fill', '#66cc66');

    dotPlotSvg
        .selectAll('.maledot')
        .data(topStates)
        .enter()
        .append('circle')
        .attr('class', 'maledot')
        .attr('cx', d => xScale(+d.MalePercentage))
        .attr('cy', d => yScale(d.State) + yScale.bandwidth() / 2)
        .attr('r', 5)
        .attr('fill', '#6eb5ff');

    dotPlotSvg
        .selectAll('.femaledot')
        .data(topStates)
        .enter()
        .append('circle')
        .attr('class', 'femaledot')
        .attr('cx', d => xScale(+d.FemalePercentage))
        .attr('cy', d => yScale(d.State) + yScale.bandwidth() / 2)
        .attr('r', 5)
        .attr('fill', '#ff99cc');
});
