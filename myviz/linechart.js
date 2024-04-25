// set the dimensions and margins of the graph
const multilineMargin = {
    top: 75,
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
        .attr('d', multilineLine18to44)
        .classed('line18to44', true);
    

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
        .attr('d', multilineLine45to64)
        .classed('line45to64', true);

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
        .attr('d', multilineLine65to74)
        .classed('line65to74', true);

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
        .attr('d', multilineLine75)
        .classed('line75', true);

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
        .attr('d', multilineLineTotal)
        .classed('lineTotal', true);

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

    const legendLabels = [
        { label: 'Total National', color: '#ff7f00', pointsName: '.multilinePointsTotal', lineName: '.lineTotal' },
        { label: 'Ages: 18 to 44', color: '#e41a1c', pointsName: '.multilinePoints18to44', lineName: '.line18to44'  },
        { label: 'Ages: 45 to 64', color: '#377eb8', pointsName: '.multilinePoints45to64', lineName: '.line45to64'  },
        { label: 'Ages: 65 to 74', color: '#4daf4a', pointsName: '.multilinePoints65to74', lineName: '.line65to74'  },
        { label: 'Ages: 75+', color: '#984ea3', pointsName: '.multilinePoints75', lineName: '.line75'  },
    ];

    const legendWidth = 400;
    const legendHeight = 20;

    const legendGroup = multilineSvg
        .append('g')
        .attr('transform', `translate(${multilineWidth / 2 - legendWidth /  2}, -75)`);

    const legendRects = legendGroup
        .selectAll('.legend')
        .data(legendLabels)
        .enter()
        .append('rect')
        .attr('class', 'legend')
        .attr('x', (_, i) => i * (legendWidth / legendLabels.length + 5) - 10)
        .attr('y', legendHeight)
        .attr('width', legendWidth / legendLabels.length)
        .attr('height', legendHeight)
        .attr('fill', d => d.color)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .on("click", function(_, i) {
            const rect = d3.select(this);
            const currentOpacity = rect.style("opacity");
            
            if (currentOpacity === "1") {
                rect.style("stroke", "none")
                    .style("opacity", 0.5);
        
                multilineSvg.selectAll(i.lineName)
                    .attr("visibility", "hidden");
                multilineSvg.selectAll(i.pointsName)
                    .attr("visibility", "hidden");
            } else {
                rect.style("stroke", "black")
                    .style("opacity", 1);
        
                multilineSvg.selectAll(i.lineName)
                    .attr("visibility", "visible");
                multilineSvg.selectAll(i.pointsName)
                    .attr("visibility", "visible");
            }
        })
        .on("mouseover", function() {
            d3.select(this).attr("stroke-width", 2);
        })
        .on("mouseout", function() {
            d3.select(this).attr("stroke-width", 1);
        });

    legendGroup
        .selectAll('.legend-text')
        .data(legendLabels)
        .enter()
        .append('text')
        .attr('class', 'legend-text')
        .attr('x', (_, i) => i * (legendWidth / legendLabels.length + 5) + (legendWidth / legendLabels.length) / 2 - 10)
        .attr('y', legendHeight / 2)
        .text(d => d.label)
        .style('font-size', '14px')
        .attr('alignment-baseline', 'middle')
        .attr('text-anchor', 'middle');

});