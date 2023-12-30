import type { Row } from '@tanstack/react-table';

import type { Instructor } from './schema';

export type ActionsColumnProps = {
  row: Row<Instructor>;
};
