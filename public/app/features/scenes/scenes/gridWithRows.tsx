import { getDefaultTimeRange } from '@grafana/data';

import { Scene } from '../components/Scene';
import { SceneTimePicker } from '../components/SceneTimePicker';
import { VizPanel } from '../components/VizPanel';
import { SceneFlexChild, SceneFlexLayout } from '../components/layout/SceneFlexLayout';
import { SceneGridCell, SceneGridLayout, SceneGridRow } from '../components/layout/SceneGridLayout';
import { SceneTimeRange } from '../core/SceneTimeRange';
import { SceneEditManager } from '../editor/SceneEditManager';
import { SceneQueryRunner } from '../querying/SceneQueryRunner';

export function getGridWithRowsTest(): Scene {
  const panel = new VizPanel({
    pluginId: 'timeseries',
    title: 'Fill height',
  });
  const row1 = new SceneGridRow({
    title: 'Collapsible/draggable row with flex layout',
    size: { x: 0, y: 0, height: 10 },
    children: [
      new SceneFlexLayout({
        direction: 'row',
        children: [
          new SceneFlexChild({
            children: [
              new VizPanel({
                pluginId: 'timeseries',
                title: 'Fill height',
              }),
            ],
          }),
          new SceneFlexChild({
            children: [
              new VizPanel({
                pluginId: 'timeseries',
                title: 'Fill height',
              }),
            ],
          }),
          new SceneFlexChild({
            children: [
              new VizPanel({
                pluginId: 'timeseries',
                title: 'Fill height',
              }),
            ],
          }),
        ],
      }),
    ],
  });

  const cell1 = new SceneGridCell({
    size: {
      x: 0,
      y: 10,
      width: 12,
      height: 20,
    },
    children: [panel],
  });

  const cell2 = new SceneGridCell({
    isResizable: false,
    isDraggable: false,
    size: { x: 12, y: 20, width: 12, height: 10 },
    children: [
      new VizPanel({
        pluginId: 'timeseries',
        title: 'No resize/no drag',
      }),
    ],
  });

  const row2 = new SceneGridRow({
    size: { x: 12, y: 10, height: 10, width: 12 },
    title: 'Row with a nested flex layout',
    children: [
      new SceneFlexLayout({
        children: [
          new SceneFlexChild({
            children: [
              new SceneFlexLayout({
                direction: 'column',
                children: [new SceneFlexChild({ children: [panel] }), new SceneFlexChild({ children: [panel] })],
              }),
            ],
          }),
          new SceneFlexChild({
            children: [
              new SceneFlexLayout({
                direction: 'column',
                children: [new SceneFlexChild({ children: [panel] }), new SceneFlexChild({ children: [panel] })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
  const scene = new Scene({
    title: 'Grid rows test',
    layout: new SceneGridLayout({
      children: [cell1, cell2, row1, row2],
    }),
    $editor: new SceneEditManager({}),
    $timeRange: new SceneTimeRange(getDefaultTimeRange()),
    $data: new SceneQueryRunner({
      queries: [
        {
          refId: 'A',
          datasource: {
            uid: 'gdev-testdata',
            type: 'testdata',
          },
          scenarioId: 'random_walk',
        },
      ],
    }),
    actions: [new SceneTimePicker({})],
  });

  return scene;
}
