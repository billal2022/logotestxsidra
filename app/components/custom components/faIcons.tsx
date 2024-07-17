// faIcons.ts
import * as IconsFa from '@fortawesome/free-solid-svg-icons';
import { IconType } from '../types';

export const faIcons: IconType[] = Object.keys(IconsFa)
  .filter(key => key !== 'fas' && key !== 'prefix')
  .map(key => ({
    icon: (IconsFa as any)[key],
    name: key.replace('fa', ''),
    library: 'FontAwesome',
  }));
