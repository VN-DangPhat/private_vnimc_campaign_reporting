import { VChart } from '@visactor/vchart';

const spec = {
  type: 'sankey',
  width: 'container',
  height: 700,
  data: [
    {
      id: 'sankey_data',
      values: [
        { from: 'Exposure', to: 'Click', value: 1200 },
        { from: 'Exposure', to: 'Skip', value: 520 },
        { from: 'Click', to: 'AddToCart', value: 760 },
        { from: 'Click', to: 'Bounce', value: 280 },
        { from: 'AddToCart', to: 'Checkout', value: 530 },
        { from: 'Checkout', to: 'Paid', value: 410 }
      ]
    }
  ],
  sourceField: 'from',
  targetField: 'to',
  valueField: 'value',
  node: { style: { stroke: '#0b1220', lineWidth: 1, fillOpacity: 0.95 } },
  link: { style: { fillOpacity: 0.35 } },
  label: { visible: true, style: { fill: '#e2e8f0', fontSize: 12 } },
  tooltip: { visible: true }
};

const chart = new VChart(spec, { dom: 'chart' });
chart.renderSync();
