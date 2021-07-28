import { Database as SqliteDatabase } from 'better-sqlite3';
import SqliteTable from '@ulixee/commons/lib/SqliteTable';
import IViewport from '@ulixee/hero-interfaces/IViewport';

export default class TabsTable extends SqliteTable<ITabsRecord> {
  constructor(readonly db: SqliteDatabase) {
    super(db, 'Tabs', [
      ['id', 'INTEGER'],
      ['parentId', 'INTEGER'],
      ['detachedAtCommandId', 'INTEGER'],
      ['pageTargetId', 'TEXT'],
      ['devtoolsSessionId', 'TEXT'],
      ['viewportWidth', 'INTEGER'],
      ['viewportHeight', 'INTEGER'],
      ['browserPositionX', 'INTEGER'],
      ['browserPositionY', 'INTEGER'],
      ['createdTime', 'INTEGER'],
    ]);
  }

  public insert(
    tabId: number,
    pageId: string,
    devtoolsSessionId: string,
    viewPort: IViewport,
    parentTabId?: number,
    detachedAtCommandId?: number,
  ) {
    return this.queuePendingInsert([
      tabId,
      parentTabId,
      detachedAtCommandId,
      pageId,
      devtoolsSessionId,
      viewPort.width,
      viewPort.height,
      viewPort.positionX,
      viewPort.positionY,
      Date.now(),
    ]);
  }
}

export interface ITabsRecord {
  id: number;
  parentId: number | null;
  detachedAtCommandId: number | null;
  pageTargetId: string;
  devtoolsSessionId: string;
  viewportWidth: number;
  viewportHeight: number;
  browserPositionX: number;
  browserPositionY: number;
  createdTime: number;
}