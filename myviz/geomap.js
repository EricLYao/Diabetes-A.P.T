import eventEmitter from './eventEmitter.js';

const geomapMargin = {
    top: 100,
    right: 100,
    bottom: 0,
    left: 100,
};
const geomapWidth = 1200;
const geomapHeight = 700;

let currYear = '2021';

const geomapSvg = d3
    .select('#geomap')
    .append('svg')
    .attr('width', geomapWidth)
    .attr('height', geomapHeight + geomapMargin.bottom)
    .append('g');

geomapSvg
    .append('text')
    .attr('x', geomapWidth / 2)
    .attr('y', 50)
    .attr('text-anchor', 'middle')
    .style('font-size', '30px')
    .text('Year: ' + currYear)
    .attr('class', 'year-name');

// projector
const geomapProjection = d3
    .geoAlbersUsa()
    .translate([geomapWidth / 2, geomapHeight / 2])
    .scale(1200);

// path for projector
const geomapPath = d3.geoPath().projection(geomapProjection);

// color scale
const geomapColorScale = d3.scaleSequential(d3.interpolateBlues);

// load geojson for US states
d3.json('./finalprojdata/statesUS.json').then(function (geojson) {
    // load csv data
    d3.csv('./finalprojdata/geomapdata.csv').then(function (data) {
        let geomapCleanedData = [];
        let geomapFilteredData = [];

        // Function to filter data based on the year
        function filterData(year) {
            geomapFilteredData = geomapCleanedData.filter((d) => d.Year === year);
        }

        // Function to update map
        function updateMap() {
            filterData(currYear);

            // Redraw map based on filtered data...
            geomapSvg
                .selectAll('path')
                .data(geojson.features)
                .attr('fill', (d) => {
                    const stateData = geomapFilteredData.find((data) => data.State === d.properties.NAME);
                    if (stateData.Percentage !== 'No Data') {
                        return geomapColorScale(parseFloat(stateData.Percentage));
                    } else {
                        return 'grey';
                    }
                })
                .select('title')
                .text((d) => {
                    const stateData = geomapFilteredData.find((data) => data.State === d.properties.NAME);
                    if (stateData.Percentage !== 'No Data') {
                        return `${d.properties.NAME}: ${stateData.Percentage}% Diagnosed`;
                    } else {
                        return `${d.properties.NAME}: No Data`;
                    }
                });
        }

        geomapCleanedData = data.filter(
            (d) =>
                d.State !== 'Guam' &&
                d.State !== 'Virgin Islands of the U.S.' &&
                d.State !== 'District of Colombia',
        );

        // Initialize filtered data with initial year
        filterData(currYear);

        // Calculate color scale domain
        const geomapPercentageValues = geomapCleanedData.map((d) => parseFloat(d.Percentage));
        geomapColorScale.domain([d3.min(geomapPercentageValues), d3.max(geomapPercentageValues)]);

        // Draw map
        geomapSvg
            .selectAll('path')
            .data(geojson.features)
            .enter()
            .append('path')
            .attr('d', geomapPath)
            .attr('stroke', 'black')
            .attr('fill', (d) => {
                const stateData = geomapFilteredData.find((data) => data.State === d.properties.NAME);
                if (stateData.Percentage !== 'No Data') {
                    return geomapColorScale(parseFloat(stateData.Percentage));
                } else {
                    return 'grey';
                }
            })
            .on('mouseover', function (event, d) {
                d3.select(this).attr('opacity', 0.7);
            })
            .on('mouseout', function (event, d) {
                d3.select(this).attr('opacity', 1);
            })
            .append('title')
            .text((d) => {
                const stateData = geomapFilteredData.find((data) => data.State === d.properties.NAME);
                if (stateData.Percentage !== 'No Data') {
                    return `${d.properties.NAME}: ${stateData.Percentage}% Diagnosed`;
                } else {
                    return `${d.properties.NAME}: No Data`;
                }
            });

        function updateYearText(year) {
            geomapSvg.select('.year-name').text('Year: ' + year);
        }

        // Create the slider
        const slider = d3.sliderHorizontal()
            .min(2000)
            .max(2021)
            .step(1)
            .width(800)
            .displayValue(true)
            .default(2021)
            .ticks(22)
            .tickFormat(d3.format("d"))
            .on('onchange', val => {
                currYear = val.toString();
                eventEmitter.emit('yearChange', currYear);
                updateMap();
                updateYearText(currYear);
            });

        const geomapSlider = d3.select('#slider')
            .append('svg')
            .attr('width', 1000)
            .attr('height', 100)
            .append('g')
            .attr("transform", `translate(${geomapWidth / 2 - 475}, 30)`)
            .call(slider);

        // Draw legend
        const geomapLegend = geomapSvg.append("g")
            .attr("class", "geomapLegendSequential")
            .attr("transform", `translate(${geomapWidth / 2 - 200},${geomapHeight - 35})`);
        
        const geomapLegendSequential = d3.legendColor()
            .shapeWidth(60)
            .shapeHeight(15)
            .cells(6)
            .orient("horizontal")
            .scale(geomapColorScale);
        
        geomapLegend.call(geomapLegendSequential);

        geomapLegend.selectAll('text')
            .style('font-size', '18px')
            .text(function(d) { return d + "%"; });
    });
});
