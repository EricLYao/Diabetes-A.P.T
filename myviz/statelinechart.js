// Define the dimensions and margins for the dot plot
const stateLineMargin = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 150,
};
const stateLineWidth = 900;
const stateLineHeight = 500;

const displayState = "California"

// Append the SVG object to the designated element in the HTML
const stateLineSvg = d3
    .select('#stateLine')
    .append('svg')
    .attr('width', stateLineWidth + stateLineMargin.left + stateLineMargin.right)
    .attr('height', stateLineHeight + stateLineMargin.top + stateLineMargin.bottom)
    .append('g')
    .attr('transform', `translate(${stateLineMargin.left},${stateLineMargin.top})`);


stateLineSvg
    .append('text')
    .attr('x', stateLineWidth / 2)
    .attr('y', -stateLineMargin.top / 2)
    .attr('text-anchor', 'middle')
    .style('font-size', '30px')
    .text('State: ' + displayState);

d3.csv("./finalprojdata/dotplotdata.csv").then((data) => {
    
    const stateData = data.filter(d => d.State === displayState && d.TotalPercentage !== "No Data");

    // Parse TotalPercentage as numeric
    stateData.forEach(d => {
        d.TotalPercentage = +d.TotalPercentage;
    });

    // Define scales
    const xScale = d3.scaleBand()
        .domain(stateData.map(d => d.Year))
        .range([0, stateLineWidth])
        .padding(0.5);

    const yScale = d3.scaleLinear()
        .domain([d3.min(stateData, d=> d.TotalPercentage) - 0.5, d3.max(stateData, d => d.TotalPercentage) + 0.5])
        .range([stateLineHeight, 0]);

    // Draw x-axis
    stateLineSvg.append("g")
        .attr("transform", `translate(0,${stateLineHeight})`)
        .call(d3.axisBottom(xScale));

    // Draw y-axis
    stateLineSvg.append("g")
        .call(d3.axisLeft(yScale));

    stateLineSvg
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -multilineHeight / 2)
        .style('text-anchor', 'middle')
        .text('Percentage Diagnosed');

    // Draw line
    stateLineSvg.append("path")
        .datum(stateData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 4)
        .attr("d", d3.line()
            .x(d => xScale(d.Year) + xScale.bandwidth() / 2)
            .y(d => yScale(d.TotalPercentage))
        );

    stateLineSvg.selectAll(".statelinedot")
        .data(stateData)
        .enter().append("circle")
        .attr("class", "statelinedot")
        .attr("cx", d => xScale(d.Year) + xScale.bandwidth() / 2)
        .attr("cy", d => yScale(d.TotalPercentage))
        .attr("r", 4) 
        .attr("fill", "steelblue")
        .on("mouseover", function (event, d) { 
            d3.select(this)
                .attr("r", 6);
        })
        .on("mouseout", function (event, d) {
            d3.select(this)
                .attr("r", 4);
        })
        .append("title")
        .text(
            (d) => 'Year: ' + d.Year + '\n% of Diabetics: ' + d.TotalPercentage + '%',
        );

});

