import eventEmitter from './eventEmitter.js';

const geomapMargin = {
    top: 100,
    right: 100,
    bottom: 0,
    left: 100,
};
const geomapWidth = 1200;
const geomapHeight = 650;

let currYear = '2021';

const geomapSvg = d3
    .select('#geomap')
    .append('svg')
    .attr('width', geomapWidth)
    .attr('height', geomapHeight + geomapMargin.bottom)
    .append('g');


// projector
const geomapProjection = d3
    .geoAlbersUsa()
    .translate([geomapWidth / 2, geomapHeight / 2 - 50])
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

        // filter data based on the year
        function filterData(year) {
            geomapFilteredData = geomapCleanedData.filter((d) => d.Year === year);
        }

        function updateMap() {
            filterData(currYear);

            // redraw map based on filtered data
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

        filterData(currYear);

        // color scale
        const geomapPercentageValues = geomapCleanedData.map((d) => parseFloat(d.Percentage));
        geomapColorScale.domain([d3.min(geomapPercentageValues), d3.max(geomapPercentageValues)]);

        function handleStateClick(stateName) {
            const stateData = geomapFilteredData.find((data) => data.State === stateName);
            if (stateData && stateData.Percentage === 'No Data') {
                // If "No Data", do nothing
                return;
            }
        
            const desiredDiv = document.getElementById('fourth');
            const desiredDivPosition = desiredDiv.offsetTop;
        
            window.scrollTo({
                top: desiredDivPosition,
                behavior: 'smooth'
            });

            eventEmitter.emit('stateClicked', stateData);
        }

        // draw map
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
            .on('click', function (event, d) {
                handleStateClick(d.properties.NAME);
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

        // slider
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
            .attr("transform", `translate(${geomapWidth / 2 - 500}, 30)`)
            .call(slider);

        // legend
        const geomapLegend = geomapSvg.append("g")
            .attr("class", "geomapLegendSequential")
            .attr("transform", `translate(${geomapWidth / 2 - 200},${geomapHeight - 50})`);
        
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
