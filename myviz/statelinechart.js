import eventEmitter from './eventEmitter.js';

eventEmitter.on('stateClicked', (stateData) => {
    console.log(stateData)
    displayState = stateData.State;
    displayYear = stateData.Year;

    stateLineSvg.selectAll("*").remove();

    updateState();
});

const stateLineMargin = {
    top: 75,
    right: 100,
    bottom: 50,
    left: 175,
};
const stateLineWidth = 900;
const stateLineHeight = 500;

let displayState = "California"
let displayYear = "2021"

// Append the SVG object to the designated element in the HTML
const stateLineSvg = d3
    .select('#stateLine')
    .append('svg')
    .attr('width', stateLineWidth + stateLineMargin.left + stateLineMargin.right)
    .attr('height', stateLineHeight + stateLineMargin.top + stateLineMargin.bottom)
    .append('g')
    .attr('transform', `translate(${stateLineMargin.left},${stateLineMargin.top})`);

function updateState() {
    stateLineSvg.selectAll("*").remove();

    stateLineSvg
        .append('text')
        .attr('x', stateLineWidth / 2 - 20)
        .attr('y', -stateLineMargin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '32px')
        .text(displayState);

    d3.csv("./finalprojdata/geomapdata.csv").then((data) => {
        
        const stateData = data.filter(d => d.State === displayState && d.Percentage !== "No Data");

        // Parse Percentage as numeric
        stateData.forEach(d => {
            d.Percentage = +d.Percentage;
        });

        // Define scales
        const xScale = d3.scaleBand()
            .domain(stateData.map(d => d.Year))
            .range([0, stateLineWidth])
            .padding(0.5);

        var chartMin = d3.min(stateData, d => +d.LowerLimit);
        var chartMax = d3.max(stateData, d => +d.UpperLimit);
        
        const yScale = d3.scaleLinear()
            .domain([chartMin - 0.1, chartMax + 0.1])
            .range([stateLineHeight, 0]);

        // Draw x-axis
        stateLineSvg.append("g")
            .attr("transform", `translate(0,${stateLineHeight})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .style('text-anchor', 'middle') 
            .style('font-size', '16px')
            .filter((d, i) => i % 2 !== 0) 
            .remove();

        // Draw y-axis
        stateLineSvg.append("g")
            .call(d3.axisLeft(yScale).tickFormat(d => d + '%'))
            .selectAll('text')
            .style('font-size', '16px');

        stateLineSvg
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', -70)
            .attr('x', -multilineHeight / 2)
            .style('text-anchor', 'middle')
            .style('font-size', '24px')
            .text('Percentage Diagnosed');

        stateLineSvg.append("path")
        .datum(stateData)
        .attr("fill", "lightsteelblue")
        .attr("opacity", 0.5)
        .attr("d", d3.area()
            .x(d => xScale(d.Year) + xScale.bandwidth() / 2)
            .y0(d => yScale(d.UpperLimit))
            .y1(d => yScale(d.LowerLimit))
        )
        .append("title")
        .text("95% Confidence Interval");

        stateLineSvg.append("path")
            .datum(stateData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 4)
            .attr("d", d3.line()
                .x(d => xScale(d.Year) + xScale.bandwidth() / 2)
                .y(d => yScale(d.Percentage))
            );

        stateLineSvg.selectAll(".statelinedot")
            .data(stateData)
            .enter().append("circle")
            .attr("class", "statelinedot")
            .attr("cx", d => xScale(d.Year) + xScale.bandwidth() / 2)
            .attr("cy", d => yScale(d.Percentage))
            .attr("r", 4) 
            .attr("fill", d => d.Year === displayYear ? "red" : "steelblue")
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
                (d) => 'Year: ' + d.Year + '\n% of Diabetics: ' + d.Percentage + '%' + '\nLower Bound: ' + d.LowerLimit + '%' + '\nUpper Bound: ' + d.UpperLimit + '%' ,
            );
    });
}

updateState();