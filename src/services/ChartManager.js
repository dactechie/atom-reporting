// services/ChartManager.js
import { defineAsyncComponent } from 'vue';
import { setUpChartsData } from '@/chart-helpers/data-formatter';
// Use Vite's glob import syntax

// const fieldConfigs = import.meta.glob('@/chart-helpers/field-display-config/*.js', { eager: true });
import * as sdsConfig from '@/chart-helpers/field-display-config/sds';
import * as  k5Config from  '@/chart-helpers/field-display-config/k5';
import * as k10Config from '@/chart-helpers/field-display-config/k10';
import * as mltConfig from '@/chart-helpers/field-display-config/mlt';
import * as pdcConfig from '@/chart-helpers/field-display-config/PDCDrugUse';
import* as qolConfig from '@/chart-helpers/field-display-config/phyMentQoL';

export class ChartManager {
  constructor() {
    // Extract configs from glob imports
    this.chartConfigs = [
      sdsConfig,
      k5Config, 
      k10Config,
      mltConfig,
      pdcConfig,
      qolConfig
    ].filter(config => config?.id && config?.fields);
    console.log('Processed chartConfigs:', this.chartConfigs);
  }

  getActiveCharts(userATOMs) {
    if (!this.chartConfigs.length) {
      console.warn('No chart configurations loaded');
      return [];
    }    
    const availableScales = this._detectAvailableScales(userATOMs);
    const formattedData = setUpChartsData(userATOMs);
    
    return availableScales.map(scale => ({
      id: scale.id,
      component: this._resolveChartComponent(scale.chartType),
      data: formattedData[scale.id],
      config: scale
    }));
  }

  _detectAvailableScales(userATOMs) {
    if (!this.chartConfigs || !this.chartConfigs.length) {
      console.warn('No chart configurations available');
      return [];
    } 
    console.log('this.chartConfigs', this.chartConfigs);
    return this.chartConfigs.filter(config => 
      userATOMs.some(atom => 
        config.fields.some(field => 
          atom[field] != null
        )
      )
    );
  }

  _resolveChartComponent(chartType) {
    const chartComponents = {
      'line': defineAsyncComponent(() => import('@/components/LineChart.vue')),
      'bar': defineAsyncComponent(() => import('@/components/BarChart.vue')),
      // other chart types...
    };
    return chartComponents[chartType];
  }
}