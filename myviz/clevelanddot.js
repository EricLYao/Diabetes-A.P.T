// Define the dimensions and margins for the dot plot
const dotPlotMargin = {
    top: 50,
    right: 100,
    bottom: 100,
    left: 150,
};
const dotPlotWidth = 800;
const dotPlotHeight = 550;

const dotPlotYear =  "2019"

// Append the SVG object to the designated element in the HTML
const dotPlotSvg = d3
    .select('#clevelanddot')
    .append('svg')
    .attr('width', dotPlotWidth + dotPlotMargin.left + dotPlotMargin.right)
    .attr('height', dotPlotHeight + dotPlotMargin.top + dotPlotMargin.bottom)
    .append('g')
    .attr('transform', `translate(${dotPlotMargin.left},${dotPlotMargin.top})`);

dotPlotSvg
    .append('text')
    .attr('x', stateLineWidth / 2)
    .attr('y', -stateLineMargin.top / 2)
    .attr('text-anchor', 'middle')
    .style('font-size', '30px')
    .text(dotPlotYear);

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
    const yAxis = dotPlotSvg
        .append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(yScale));
    
    yAxis.selectAll('text')
        .style('font-size', '13px');
    
    // Add x-axis label
    dotPlotSvg
        .append('text')
        .attr('class', 'x-axis-label')
        .attr('x', dotPlotWidth / 2)
        .attr('y', dotPlotHeight + 50)
        .style('text-anchor', 'middle')
        .text('Percentage Diagnosed');

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
        .attr('stroke-width', 2)
        .append("title")
        .text(
            (d) => 
            'State: ' + d.State +
            '\nYear: ' + dotPlotYear + 
            '\nTotal % of Diabetics: ' + d.TotalPercentage + '%' +
            '\nMale % of Diabetics: ' + d.MalePercentage + '%' +
            '\nFemale % of Diabetics: ' + d.FemalePercentage + '%',
        );


    dotPlotSvg
        .selectAll('.totaldot')
        .data(topStates)
        .enter()
        .append('circle')
        .attr('class', 'totaldot')
        .attr('cx', d => xScale(+d.TotalPercentage))
        .attr('cy', d => yScale(d.State) + yScale.bandwidth() / 2)
        .attr('r', 5)
        .attr('fill', '#66cc66')
        .append("title")
        .text(
            (d) => 
            'State: ' + d.State +
            '\nYear: ' + dotPlotYear + 
            '\nTotal % of Diabetics: ' + d.TotalPercentage + '%' +
            '\nMale % of Diabetics: ' + d.MalePercentage + '%' +
            '\nFemale % of Diabetics: ' + d.FemalePercentage + '%',
        );


    dotPlotSvg
        .selectAll('.maledot')
        .data(topStates)
        .enter()
        .append('circle')
        .attr('class', 'maledot')
        .attr('cx', d => xScale(+d.MalePercentage))
        .attr('cy', d => yScale(d.State) + yScale.bandwidth() / 2)
        .attr('r', 5)
        .attr('fill', '#6eb5ff')
        .append("title")
        .text(
            (d) => 
            'State: ' + d.State +
            '\nYear: ' + dotPlotYear + 
            '\nTotal % of Diabetics: ' + d.TotalPercentage + '%' +
            '\nMale % of Diabetics: ' + d.MalePercentage + '%' +
            '\nFemale % of Diabetics: ' + d.FemalePercentage + '%',
        );

    dotPlotSvg
        .selectAll('.femaledot')
        .data(topStates)
        .enter()
        .append('circle')
        .attr('class', 'femaledot')
        .attr('cx', d => xScale(+d.FemalePercentage))
        .attr('cy', d => yScale(d.State) + yScale.bandwidth() / 2)
        .attr('r', 5)
        .attr('fill', '#ff99cc')
        .append("title")
        .text(
            (d) => 
            'State: ' + d.State +
            '\nYear: ' + dotPlotYear + 
            '\nTotal % of Diabetics: ' + d.TotalPercentage + '%' +
            '\nMale % of Diabetics: ' + d.MalePercentage + '%' +
            '\nFemale % of Diabetics: ' + d.FemalePercentage + '%',
        );

    function handleHover(state) {
        // Select all elements related to the hovered state
        const relatedElements = dotPlotSvg.selectAll('.totaldot, .maledot, .femaledot, .line')
            .filter(d => d.State === state);

        relatedElements.attr('r', 7);
        relatedElements.attr('stroke-width', 3);
    }

    function handleMouseOut() {
        dotPlotSvg.selectAll('.totaldot, .maledot, .femaledot, .line')
        .attr('r', 5)
        .attr('stroke-width', 2);
    }

    dotPlotSvg.selectAll('.totaldot, .maledot, .femaledot, .line')
        .on('mouseover', (event, d) => handleHover(d.State))
        .on('mouseout', handleMouseOut);
});
