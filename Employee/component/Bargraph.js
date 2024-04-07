import React from 'react';
import { View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import * as d3Scale from 'd3-scale';

const BarGraph = ({ data, width, height }) => {
  const xScale = d3Scale.scaleBand().domain(data.map((d, i) => i)).range([0, width]);
  const yScale = d3Scale.scaleLinear().domain([0, Math.max(...data)]).range([0, height]);

  return (
    <View>
      <Svg width={width} height={height}>
        {data.map((d, i) => (
          <Rect
            key={i}
            x={xScale(i)}
            y={height - yScale(d)}
            width={xScale.bandwidth()}
            height={yScale(d)}
            fill="steelblue"
          />
        ))}
      </Svg>
    </View>
  );
};

export default BarGraph;
