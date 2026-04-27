
(async function () {
  const msg = document.getElementById('msg');

  function setMsg(text, ok=false) {
    msg.textContent = text;
    msg.style.color = ok ? '#86efac' : '#fca5a5';
  }

  try {
    if (!window.VChart) {
      throw new Error('window.VChart not found. local vendor script failed to load');
    }

    const res = await fetch('./data.json', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to load data.json: ' + res.status);
    }
    const payload = await res.json();
    const flows = payload.flows || [];

    const sumTo = (target) => flows.filter(x => x.to === target).reduce((a,b) => a + Number(b.value || 0), 0);
    const exposure = flows.filter(x => x.from === 'Exposure').reduce((a,b) => a + Number(b.value || 0), 0);
    const click = sumTo('Click');
    const atc = sumTo('AddToCart');
    const checkout = sumTo('Checkout');
    const paid = sumTo('Paid');
    const cvr = exposure > 0 ? (paid / exposure * 100) : 0;

    document.getElementById('kpi-exposure').textContent = exposure.toLocaleString();
    document.getElementById('kpi-click').textContent = click.toLocaleString();
    document.getElementById('kpi-atc').textContent = atc.toLocaleString();
    document.getElementById('kpi-checkout').textContent = checkout.toLocaleString();
    document.getElementById('kpi-paid').textContent = paid.toLocaleString();
    document.getElementById('kpi-cvr').textContent = cvr.toFixed(2) + '%';

    const spec = {
      type: 'sankey',
      width: 'container',
      height: 700,
      data: [{ id: 'sankey_data', values: flows }],
      sourceField: 'from',
      targetField: 'to',
      valueField: 'value',
      node: { style: { stroke: '#0b1220', lineWidth: 1, fillOpacity: 0.95 } },
      link: { style: { fillOpacity: 0.36 } },
      label: { visible: true, style: { fill: '#e2e8f0', fontSize: 12 } },
      tooltip: { visible: true }
    };

    const VChartCtor = window.VChart.default || window.VChart;
    const chart = new VChartCtor(spec, { dom: 'chart' });
    chart.renderSync();

    setMsg('Rendered successfully. Updated at ' + (payload.updated_at || ''), true);
  } catch (err) {
    setMsg('Render failed: ' + (err && err.message ? err.message : String(err)), false);
  }
})();
