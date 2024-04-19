const geomapMargin = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100,
};
const geomapWidth = 1200
const geomapHeight = 800

const geomapYear = '2021';

const geomapSvg = d3
    .select('#geomap')
    .append('svg')
    .attr('width', geomapWidth)
    .attr('height', geomapHeight)
    .append('g');

geomapSvg
    .append('text')
    .attr('x', geomapWidth / 2)
    .attr('y', geomapMargin.top)
    .attr('text-anchor', 'middle')
    .style('font-size', '30px')
    .text('Year: ' + geomapYear);

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
d3.json('./finalprojdata/statesUS.json',).then(function (geojson) {
    // load csv data
    d3.csv( './finalprojdata/geomapdata.csv').then(function (data) {
      const geomapCleanedData = data.filter(
        (d) =>
            d.State !== 'Guam' &&
            d.State !== 'Virgin Islands of the U.S.' &&
            d.State !== 'District of Colombia',
      );
      // filter data for the year
      const geomapFilteredData = geomapCleanedData.filter((d) => d.Year === geomapYear);
  
      // color scale based on full file
      const geomapPercentageValues = geomapCleanedData.map((d) => parseFloat(d.Percentage));

      geomapColorScale.domain([d3.min(geomapPercentageValues), d3.max(geomapPercentageValues)]);
  
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
            if (stateData.Percentage != 'No Data') {
                return geomapColorScale(parseFloat(stateData.Percentage));
            } else {
                return 'grey';
            }
        })
        .on('mouseover', function (event, d) {
            d3.select(this).attr('opacity', 0.7); // Decrease opacity on hover
        })
        .on('mouseout', function (event, d) {
            d3.select(this).attr('opacity', 1); // Restore opacity on mouseout
        })
        .append('title')
        .text((d) => {
            const stateData = geomapFilteredData.find((data) => data.State === d.properties.NAME);
            if (stateData.Percentage != 'No Data') {
                return `${d.properties.NAME}: ${stateData.Percentage}% Diagnosed`;
            } else {
                return `${d.properties.NAME}: No Data`;
            }
        })
    });
});
  