import eventEmitter from './eventEmitter.js';

let dotplotCurrYear = "2021"; 

eventEmitter.on('yearChange', newYear => {
    // Update the dotPlotYear variable with the new year value
    dotplotCurrYear = newYear;

    // Clear existing chart before updating
    dotPlotSvg.selectAll("*").remove();

    dotPlotSlider.value(newYear);

    // Update chart with new year's data
    updateCleveland(dotplotCurrYear);
});

const dotPlotMargin = {
    top: 100,
    right: 100,
    bottom: 80,
    left: 150,
};
const dotPlotWidth = 800;
const dotPlotHeight = 550;

// Append the SVG object to the designated element in the HTML
const dotPlotSvg = d3
    .select('#clevelanddot')
    .append('svg')
    .attr('width', dotPlotWidth + dotPlotMargin.left + dotPlotMargin.right)
    .attr('height', dotPlotHeight + dotPlotMargin.top + dotPlotMargin.bottom)
    .append('g')
    .attr('transform', `translate(${dotPlotMargin.left},${dotPlotMargin.top})`);

const dotPlotSlider = d3.sliderHorizontal()
    .min(2000)
    .max(2021)
    .step(1)
    .width(800)
    .displayValue(true)
    .default(2021)
    .ticks(22)
    .tickFormat(d3.format("d"))
    .on('onchange', val => {
        eventEmitter.emit('yearChange', val.toString());
    });

// Append the slider to the div with id "#cslider"
const dotPlotSliderDiv = d3.select("#cslider")
    .append("div")
    .attr("class", "slider")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 100)
    .append("g")
    .attr("transform", "translate(100,50)")
    .call(dotPlotSlider);

function updateCleveland(dotPlotYear) {
    dotPlotSvg
        .append('text')
        .attr('x', dotPlotWidth / 2)
        .attr('y', -dotPlotMargin.top + 30)
        .attr('text-anchor', 'middle')
        .style('font-size', '32px')
        .text('Year: ' + dotPlotYear);

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

        // Filter the data for the specified year
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
            .call(d3.axisBottom(xScale).tickFormat(d => d + '%'))
            .selectAll('text')
            .style('text-anchor', 'middle')
            .style('font-size', '16px');
            

        // Add the y-axis
        const yAxis = dotPlotSvg
            .append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(yScale))
        
        yAxis.selectAll('text')
            .style('font-size', '16px');
        
        // Add x-axis label
        dotPlotSvg
            .append('text')
            .attr('class', 'x-axis-label')
            .attr('x', dotPlotWidth / 2)
            .attr('y', dotPlotHeight + 70)
            .style('text-anchor', 'middle')
            .style('font-size', '24px')
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

        // Define the ordinal scale and range for the legend
        const legendOrdinal = d3.scaleOrdinal()
        .domain(["Total", "Male", "Female"])
        .range(["#66cc66", "#6eb5ff", "#ff99cc"]);

        // Create a group element for the legend within the SVG
        const legendGroup = dotPlotSvg.append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", `translate(${dotPlotWidth / 2 - 110}, -40)`); // Adjust position as needed

        // Create the legend using d3.legendColor() with horizontal orientation
        const legend = d3.legendColor()
        .shape("path", d3.symbol().type(d3.symbolCircle).size(150)()) // You can change the shape and size as needed
        .shapePadding(100)
        .scale(legendOrdinal)
        .orient("horizontal"); // Set orientation to horizontal

        // Apply the legend to the group element
        legendGroup.call(legend);

        legendGroup.selectAll("text")
            .style("font-size", "18px");
    });
}



updateCleveland(dotplotCurrYear);