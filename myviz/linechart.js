// set the dimensions and margins of the graph
const multilineMargin = {
    top: 0,
    right: 100,
    bottom: 75,
    left: 100,
};
const multilineWidth = 900
const multilineHeight = 550
  
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
        .text('Percentage Diagnosed');
        
    const multilineLine18to44 = d3
        .line()
        .x((d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .y((d) => multilineY(d.Percentage18to44));
  
    multilineSvg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#e41a1c')
        .attr('stroke-width', 3)
        .attr('d', multilineLine18to44);

    multilineSvg.selectAll('.multilinePoints18to44')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'multilinePoints18to44')
        .attr('cx', (d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .attr('cy', (d) => multilineY(d.Percentage18to44))
        .attr('r', 3)
        .attr('fill', '#e41a1c')
        .on("mouseover", function (event, d) { 
            d3.select(this)
                .attr("r", 5);
        })
        .on("mouseout", function (event, d) {
            d3.select(this)
                .attr("r", 3);
        })
        .append('title')
        .text(
            (d) => 'Age Group: 18 to 44' + '\nDiagnosed: ' + d.Percentage18to44 + '% ', 
        );
  
    const multilineLine45to64 = d3
        .line()
        .x((d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .y((d) => multilineY(d.Percentage45to64));
  
    multilineSvg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#377eb8')
        .attr('stroke-width', 3)
        .attr('d', multilineLine45to64);

    multilineSvg
        .selectAll('.multilinePoints45to64')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'multilinePoints45to64')
        .attr('cx', (d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .attr('cy', (d) => multilineY(d.Percentage45to64))
        .attr('r', 3)
        .attr('fill', '#377eb8')
        .on("mouseover", function (event, d) { 
            d3.select(this)
                .attr("r", 5);
        })
        .on("mouseout", function (event, d) {
            d3.select(this)
                .attr("r", 3);
        })
        .append('title')
        .text(
            (d) => 'Age Group: 45 to 64' + '\nDiagnosed: ' + d.Percentage45to64 + '% ', 
        );
  
    const multilineLine65to74 = d3
        .line()
        .x((d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .y((d) => multilineY(d.Percentage65to74));
  
    multilineSvg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#4daf4a')
        .attr('stroke-width', 3)
        .attr('d', multilineLine65to74);

    multilineSvg
        .selectAll('.multilinePoints65to74')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'multilinePoints65to74')
        .attr('cx', (d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .attr('cy', (d) => multilineY(d.Percentage65to74))
        .attr('r', 3)
        .attr('fill', '#4daf4a')
        .on("mouseover", function (event, d) { 
            d3.select(this)
                .attr("r", 5);
        })
        .on("mouseout", function (event, d) {
            d3.select(this)
                .attr("r", 3);
        })
        .append('title')
        .text(
            (d) => 'Age Group: 65 to 74' + '\nDiagnosed: ' + d.Percentage65to74 + '% ', 
        );
  
    const multilineLine75 = d3
        .line()
        .x((d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .y((d) => multilineY(d.Percentage75up));
  
    multilineSvg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#984ea3')
        .attr('stroke-width', 3)
        .attr('d', multilineLine75);

    multilineSvg
        .selectAll('.multilinePoints75')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'multilinePoints75')
        .attr('cx', (d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .attr('cy', (d) => multilineY(d.Percentage75up))
        .attr('r', 3)
        .attr('fill', '#984ea3')
        .on("mouseover", function (event, d) { 
            d3.select(this)
                .attr("r", 5);
        })
        .on("mouseout", function (event, d) {
            d3.select(this)
                .attr("r", 3);
        })
        .append('title')
        .text(
            (d) => 'Age Group: 75+' + '\nDiagnosed: ' + d.Percentage75up + '% ', 
        );
  
    const multilineLineTotal = d3
        .line()
        .x((d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .y((d) => multilineY(d.TotalPercentageWorld));
  
    multilineSvg
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#ff7f00')
        .attr('stroke-width', 3)
        .attr('d', multilineLineTotal);

    multilineSvg
        .selectAll('.multilinePointsTotal')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'multilinePointsTotal')
        .attr('cx', (d) => multilineX(d.Year) + multilineX.bandwidth() / 2)
        .attr('cy', (d) => multilineY(d.TotalPercentageWorld))
        .attr('r', 3)
        .attr('fill', '#ff7f00')
        .on("mouseover", function (event, d) { 
            d3.select(this)
                .attr("r", 5);
        })
        .on("mouseout", function (event, d) {
            d3.select(this)
                .attr("r", 3);
        })
        .append('title')
        .text(
            (d) => 'Total National Percentage' + '\nDiagnosed: ' + d.TotalPercentageWorld + '% ', 
        );
});