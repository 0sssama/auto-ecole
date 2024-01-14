'use client';

import { Eye, MoreHorizontal, Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/components/atoms/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ActionsColumnComponentType } from '@/components/organisms/data-table/data-table.types';
import { DASH_LESSONS_PATH } from '@/base/data/paths';

import { lessonSchema, type Lesson } from './schema';

const ActionsColumn: ActionsColumnComponentType<Lesson> = ({ row }) => {
  const t = useTranslations('Dashboard.Files.Lessons.ListTable.Actions');

  const lesson = lessonSchema.parse(row.original);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">{t('open-menu')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[160px]">
        <DropdownMenuItem className="cursor-pointer text-sm font-medium text-muted-foreground/90">
          <Link className="flex h-full w-full items-center" href={`${DASH_LESSONS_PATH}?lessonId=${lesson.id}`}>
            <Eye className="mr-2 h-3.5 w-3.5" />
            {t('view')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-sm font-medium text-muted-foreground/90"
          onClick={() => console.log('editing', lesson.id)}
        >
          <Pencil className="mr-2 h-3.5 w-3.5" />
          {t('edit')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsColumn;
